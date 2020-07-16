import axios from "axios";
import {
  FETCH_ALL_ADMINS_USERS,
  FETCH_ALL_ADMINS,
  FETCH_ALL_USERS,
  FETCH_APPROVED_USERS,
  FETCH_UNAPPROVED_USERS,
  FETCH_USER_PROFILE,
} from "../../constants/adminConstants/adminConstants";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../asyncActions/asyncActions";

// FETCH ALL ADMINS/USERS
export const fetchAllAdminsAndUsers = () => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const usersQuery = firestore.collection("users").orderBy("fullName", "asc");

    try {
      dispatch(asyncActionStart());
      let query = await usersQuery.get();

      let allAdminsAndUsers = [];

      for (let i = 0; i < query.docs.length; i++) {
        let user = {
          ...query.docs[i].data(),
          id: query.docs[i].id,
        };
        allAdminsAndUsers.push(user);
      }

      dispatch({
        type: FETCH_ALL_ADMINS_USERS,
        payload: { allAdminsAndUsers },
      });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError());
      console.log(error);
    }
  };
};

// FETCH ALL ADMINS
export const fetchAllAdmins = () => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const usersQuery = firestore
      .collection("users")
      .where("admin", "==", true)
      .orderBy("createdAt", "asc");

    try {
      dispatch(asyncActionStart());
      let query = await usersQuery.get();

      let allAdmins = [];

      for (let i = 0; i < query.docs.length; i++) {
        let user = {
          ...query.docs[i].data(),
          id: query.docs[i].id,
        };
        allAdmins.push(user);
      }

      dispatch({ type: FETCH_ALL_ADMINS, payload: { allAdmins } });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError());
      console.log(error);
    }
  };
};

// FETCH ALL USERS
export const fetchAllUsers = () => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const usersQuery = firestore
      .collection("users")
      .where("admin", "==", false)
      .orderBy("createdAt", "asc");

    try {
      dispatch(asyncActionStart());
      let query = await usersQuery.get();

      let allUsers = [];

      for (let i = 0; i < query.docs.length; i++) {
        let user = {
          ...query.docs[i].data(),
          id: query.docs[i].id,
        };
        allUsers.push(user);
      }

      dispatch({ type: FETCH_ALL_USERS, payload: { allUsers } });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError());
      console.log(error);
    }
  };
};

// FETCH ALL APPROVED USERS
export const fetchApprovedUsers = () => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const usersQuery = firestore
      .collection("users")
      .where("disabled", "==", false)
      .orderBy("admin", "desc")
      .orderBy("createdAt", "asc");

    try {
      dispatch(asyncActionStart());
      let query = await usersQuery.get();

      let approvedUsers = [];

      for (let i = 0; i < query.docs.length; i++) {
        let user = {
          ...query.docs[i].data(),
          id: query.docs[i].id,
        };
        approvedUsers.push(user);
      }

      dispatch({ type: FETCH_APPROVED_USERS, payload: { approvedUsers } });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError());
      console.log(error);
    }
  };
};

// FETCH ALL UNAPPROVED USERS
export const fetchUnapprovedUsers = () => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const usersQuery = firestore
      .collection("users")
      .where("disabled", "==", true)
      .orderBy("admin", "desc");

    try {
      dispatch(asyncActionStart());
      let query = await usersQuery.get();

      let unapprovedUsers = [];

      for (let i = 0; i < query.docs.length; i++) {
        let user = {
          ...query.docs[i].data(),
          id: query.docs[i].id,
        };
        unapprovedUsers.push(user);
      }

      dispatch({ type: FETCH_UNAPPROVED_USERS, payload: { unapprovedUsers } });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError());
      console.log(error);
    }
  };
};

// FETCH USER PROFILE
export const fetchUserProfile = (userId) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const userQuery = firestore.collection("users").doc(`${userId}`);

    console.log(userId)
    try {
      dispatch(asyncActionStart());
      let query = await userQuery.get();

      let userProfile = [];

      let user = {
        id: query.id,
        ...query.data(),
      };

      userProfile.push(user);

      dispatch({ type: FETCH_USER_PROFILE, payload: { userProfile } });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError());
      console.log(error);
    }
  };
};

// TOGGLE USER/ADMIN
export const toggleUserType = (id, userType) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    let query = firestore.collection("users");

    try {
      dispatch(asyncActionStart());

      await query.doc(`${id}`).update({ admin: !userType });

      dispatch(fetchAllAdmins());
      dispatch(fetchAllUsers());
      dispatch(fetchApprovedUsers());
      dispatch(fetchUnapprovedUsers());
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
    }
  };
};

// TOGGLE USER DISABLED
export const toggleUserDisable = (id, userDisabled) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    let query = firestore.collection("users");

    try {
      dispatch(asyncActionStart());

      await query.doc(`${id}`).update({ disabled: !userDisabled });

      dispatch(fetchAllAdmins());
      dispatch(fetchAllUsers());
      dispatch(fetchApprovedUsers());
      dispatch(fetchUnapprovedUsers());
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
    }
  };
};

// DELETE USER
export const deleteUser = (id, photoName, photoURL, admin, provider) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    const query = firestore.collection("users");

    if (admin) {
      try {
        dispatch(asyncActionStart());
        axios
          .get(
            "https://us-central1-dougiesguide-dadc1.cloudfunctions.net/deleteUser",
            {
              params: {
                id: id,
              },
            }
          )
          .then((response) => {
            if (response.data === "Deleted User") {
              // DELETE USER FIRESTORE DATA
              query.doc(`${id}`).delete();

              if (photoURL === "/assets/avatar/user.png" || provider === 'facebook' || provider === 'google') {
                dispatch(fetchAllAdmins());
                dispatch(fetchAllUsers());
                dispatch(fetchApprovedUsers());
                dispatch(fetchUnapprovedUsers());
                dispatch(asyncActionFinish());
              } else {
                firebase.deleteFile(`user_profile_photos/${id}/${photoName}`);
                dispatch(fetchAllAdmins());
                dispatch(fetchAllUsers());
                dispatch(fetchApprovedUsers());
                dispatch(fetchUnapprovedUsers());
                dispatch(asyncActionFinish());
              }
            }
          })
          .catch((error) => {
            // console.log(error.message)
            if (error) {
              return;
            }
          });
      } catch (error) {
        dispatch(asyncActionError());
        console.log(error);
      }
    } else {
      return;
    }
  };
};
