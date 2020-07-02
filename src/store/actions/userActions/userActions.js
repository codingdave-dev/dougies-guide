import firebase from "../../../config/firebase";
import { fetchListing } from "../listingActions/listingActions";
import {
  FETCH_USER_CHECKINS,
  FETCH_USER_FAVOURITES, FETCH_USER_LISTINGS,
} from "../../constants/userConstants/userConstants";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../asyncActions/asyncActions";
import { closeDialog, openDialog } from "../dialogActions/dialogActions";
import { SubmissionError } from "redux-form";
import cuid from "cuid";

// TOGGLE USER FAVOURITE
export const toggleUserFavourtie = (userId, listingId, value, favouriteId) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const query = firestore.collection("user_favourites");

    try {
      if (value) {
        await query.add({
          userUid: userId,
          listingId: listingId,
          isFavourite: true,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        dispatch(fetchListing(listingId, userId, true));
      }

      if (!value) {
        await query.doc(`${favouriteId}`).delete();
        dispatch(fetchListing(listingId, userId, true));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// GET USER LISTINGS
export const fetchUserListings = (userId) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const listingsQuery = firestore
      .collection("listings")
      .where("addedByUid", "==", `${userId}`);

    try {
      dispatch(asyncActionStart());
      let query = await listingsQuery.get();

      let userListings = [];

      for (let i = 0; i < query.docs.length; i++) {
        let listing = {
          id: query.docs[i].id,
          ...query.docs[i].data(),
        };
        userListings.push(listing);
      }

      dispatch({type: FETCH_USER_LISTINGS, payload: {userListings}})
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError());
      console.log(error);
    }
  };
};

// GET USER FAVOURITES
export const fetchUserFavourites = (userId) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const favouritesQuery = firestore
      .collection("user_favourites")
      .where("userUid", "==", `${userId}`);

    try {
      let query = await favouritesQuery.get();

      let userFavourites = [];

      for (let i = 0; i < query.docs.length; i++) {
        let favourite = {
          id: query.docs[i].id,
          ...query.docs[i].data(),
        };
        userFavourites.push(favourite);
      }

      dispatch({ type: FETCH_USER_FAVOURITES, payload: { userFavourites } });
    } catch (error) {
      console.log(error);
    }
  };
};

// GET USER FAVOURITES
export const fetchUserCheckins = (userId) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const checkinQuery = firestore
      .collection("user_checkins")
      .where("userUid", "==", `${userId}`);

    try {
      let query = await checkinQuery.get();

      let userCheckins = [];

      for (let i = 0; i < query.docs.length; i++) {
        let checkin = {
          id: query.docs[i].id,
          ...query.docs[i].data(),
        };
        userCheckins.push(checkin);
      }

      dispatch({ type: FETCH_USER_CHECKINS, payload: { userCheckins } });
    } catch (error) {
      console.log(error);
    }
  };
};

// ADD USER CHECKIN
export const addUserCheckin = (userId, listingId) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const checkinQuery = firestore.collection("user_checkins");

    try {
      await checkinQuery.add({
        userUid: userId,
        listingId: listingId,
        isCheckin: true,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      dispatch(fetchUserCheckins(userId));
      dispatch(fetchListing(listingId, userId, true));
    } catch (error) {
      console.log(error);
    }
  };
};

// DELETE USER CHECKIN
export const deleteUserCheckin = (userId, listingId, checkinId) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const deleteCheckinQuery = firestore.collection("user_checkins");

    try {
      await deleteCheckinQuery.doc(`${checkinId}`).delete();

      dispatch(fetchUserCheckins(userId));
      dispatch(fetchListing(listingId, userId, true));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateUserProfile = (values) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    const firstName = values.firstName;
    const lastName = values.lastName;
    const fullName = firstName + " " + lastName;
    const email = values.email;

    let firebaseQuery = firebase.auth().currentUser;
    let firestoreQuery = firestore.collection("users");

    try {
      dispatch(asyncActionStart());

      let user = firestoreQuery.doc(`${firebaseQuery.uid}`);
      let currentEmail = await firestoreQuery.doc(`${firebaseQuery.uid}`).get();
      let currentUserEmail = currentEmail.data().email;

      if (email !== currentUserEmail) {
        await firebaseQuery.updateEmail(`${email}`);
        await user.update({ email: `${email}` });
      }

      await firebaseQuery.updateProfile({ displayName: fullName });
      await user.update({
        firstName: firstName,
        lastName: lastName,
        fullName: fullName,
      });

      dispatch(closeDialog());
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError());
      let errorMessage = "";

      if (
        error.message ===
        "This operation is sensitive and requires recent authentication. Log in again before retrying this request."
      ) {
        dispatch(closeDialog());
        dispatch(
          openDialog("LoginDialog", {
            alert: "You must login to update your profile.",
          })
        );
      }

      if (error.message === "The email address is badly formatted.") {
        errorMessage = "Please enter a valid email address.";
        throw new SubmissionError({
          _error: errorMessage,
        });
      }

      console.log(error);
    }
  };
};

// CHANGE USER PASSWORD
export const changeUserPassword = (values) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    let firebaseQuery = firebase.auth().currentUser;

    const email = firebaseQuery.email;
    const currentPassword = values.currentPassword;
    const newPassword = values.password1;

    let credential = firebase.auth.EmailAuthProvider.credential(
      email,
      currentPassword
    );

    try {
      dispatch(asyncActionStart());
      await firebaseQuery.reauthenticateWithCredential(credential);

      await firebaseQuery.updatePassword(`${newPassword}`);

      dispatch(closeDialog());
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError());
      let errorMessage;
      if (
        error.message ===
        "The password is invalid or the user does not have a password."
      ) {
        errorMessage = "Current password is invalid";
        throw new SubmissionError({
          _error: errorMessage,
        });
      }

      console.log(error);
    }
  };
};

// ADD USER PROFILE PHOTO
export const addUserProfilePhoto = (file) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    let firebaseQuery = firebase.auth().currentUser;
    let firestoreQuery = firestore.collection("users");

    const imageName = cuid() + ".jpg";
    const path = `user_profile_photos/${firebaseQuery.uid}`;
    const options = {
      name: imageName,
    };

    try {
      dispatch(closeDialog());
      dispatch(asyncActionStart());
      // upload to firebase storage

      let uploadedFile = await firebase.uploadFile(path, file, null, options);

      // get download URL
      let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();

      // add image url to firebase auth
      await firebaseQuery.updateProfile({ photoURL: downloadURL });

      // add image name and URL to firestore
      await firestoreQuery
        .doc(`${firebaseQuery.uid}`)
        .update({ photoURL: downloadURL, photoName: imageName });

      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError());
      console.log(error);
    }
  };
};

// UPDATE USER PROFILE PHOTO
export const updateUserProfilePhoto = (file, photoName) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    let firebaseQuery = firebase.auth().currentUser;
    let firestoreQuery = firestore.collection("users");

    const imageName = cuid() + ".jpg";
    const path = `user_profile_photos/${firebaseQuery.uid}`;
    const options = {
      name: imageName,
    };

    try {
      dispatch(closeDialog());
      dispatch(asyncActionStart());
      // DELETE CURRENT IMAGE
      dispatch(deleteUserProfilePhoto(photoName));

      // upload NEW to firebase storage

      let uploadedFile = await firebase.uploadFile(path, file, null, options);

      // get download URL
      let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();

      // add image url to firebase auth
      await firebaseQuery.updateProfile({ photoURL: downloadURL });

      // add image name and URL to firestore
      await firestoreQuery
        .doc(`${firebaseQuery.uid}`)
        .update({ photoURL: downloadURL, photoName: imageName });

      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError());
      console.log(error);
    }
  };
};

// DELETE USER PROFILE PHOTO
export const deleteUserProfilePhoto = (photoName) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    let firebaseQuery = firebase.auth().currentUser;
    let firestoreQuery = firestore.collection("users");

    try {
      dispatch(closeDialog());
      dispatch(asyncActionStart());
      await firebase.deleteFile(
        `user_profile_photos/${firebaseQuery.uid}/${photoName}`
      );

      await firebaseQuery.updateProfile({
        photoURL: "/assets/avatar/user.png",
      });
      await firestoreQuery
        .doc(`${firebaseQuery.uid}`)
        .update({ photoName: "", photoURL: "/assets/avatar/user.png" });

      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError());
      console.log(error);
    }
  };
};
