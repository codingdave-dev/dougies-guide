import { closeDialog } from "../dialogActions/dialogActions";
import { SubmissionError } from "redux-form";

export const registerUser = (creds) => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase()
    const firestore = getFirestore()
    try {
      // FIREBASE CREATE USER
      let createdUser = await firebase.auth().createUserWithEmailAndPassword(creds.email, creds.password1)

      await createdUser.user.updateProfile({displayName: creds.firstName + ' ' + creds.lastName})

      // FIRESTORE ADD NEW USER DETAILS
      let newUser = {
        uid: createdUser.user.uid,
        firstName: creds.firstName,
        lastName: creds.lastName,
        fullName: creds.firstName + ' ' + creds.lastName,
        admin: false,
        disabled: false,
        createdAt: firestore.FieldValue.serverTimestamp()
      }

      await firestore.set(`users/${createdUser.user.uid}`, {...newUser})

      dispatch(closeDialog());
    } catch (error) {
      let errorMessage = "";
      if (error.message === "The email address is badly formatted.") {
        errorMessage = "Please enter a valid email address.";
      }

      if (error.message === "The email address is already in use by another account.") {
        errorMessage = "Email already exists.";
      }
      throw new SubmissionError({
        _error: errorMessage,
      });
    }
  }
}

export const login = (creds) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);

      dispatch(closeDialog());
    } catch (error) {
      let errorMessage = "";

      if (
        error.message ===
        'signInWithEmailAndPassword failed: First argument "email" must be a valid string.'
      ) {
        errorMessage = "Please enter a email address.";
      }

      if (
        error.message ===
        'signInWithEmailAndPassword failed: Second argument "password" must be a valid string.'
      ) {
        errorMessage = "Please enter a password.";
      }

      if (error.message === "The email address is badly formatted.") {
        errorMessage = "Please enter a valid email address.";
      }

      if (
        error.message ===
        "There is no user record corresponding to this identifier. The user may have been deleted."
      ) {
        errorMessage = "Email or Password not found.";
      }

      if (
        error.message ===
        "The password is invalid or the user does not have a password."
      ) {
        errorMessage = "Email or Password not found.";
      }

      throw new SubmissionError({
        _error: errorMessage,
      });
    }
  };
};

export const logout = () => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    try {
      await firebase.auth().signOut();
    } catch (error) {}
  };
};
