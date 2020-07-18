import {
  FETCH_ALL_LISTINGS,
  FETCH_APPROVED_LISTINGS,
  FETCH_UNAPPROVED_LISTINGS,
} from "../../constants/adminConstants/adminConstants";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../asyncActions/asyncActions";

// FETCH ALL LISTINGS
export const fetchAllListings = () => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const listingsQuery = firestore.collection("listings");

    try {
      dispatch(asyncActionStart());
      let query = await listingsQuery.get();

      let allListings = [];

      for (let i = 0; i < query.docs.length; i++) {
        let listing = {
          ...query.docs[i].data(),
          id: query.docs[i].id,
        };
        allListings.push(listing);
      }

      dispatch({ type: FETCH_ALL_LISTINGS, payload: { allListings } });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError());
      console.log(error);
    }
  };
};

// FETCH APPROVED LISTINGS
export const fetchApprovedListings = () => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const listingsQuery = firestore
      .collection("listings")
      .where("approved", "==", true);

    try {
      dispatch(asyncActionStart());
      let query = await listingsQuery.get();

      let approvedListings = [];

      for (let i = 0; i < query.docs.length; i++) {
        let listing = {
          ...query.docs[i].data(),
          id: query.docs[i].id,
        };
        approvedListings.push(listing);
      }

      dispatch({
        type: FETCH_APPROVED_LISTINGS,
        payload: { approvedListings },
      });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError());
      console.log(error);
    }
  };
};

// FETCH UNAPPROVED LISTINGS
export const fetchUnapprovedListings = () => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const listingsQuery = firestore
      .collection("listings")
      .where("approved", "==", false);

    try {
      dispatch(asyncActionStart());
      let query = await listingsQuery.get();

      let unapprovedListings = [];

      for (let i = 0; i < query.docs.length; i++) {
        let listing = {
          ...query.docs[i].data(),
          id: query.docs[i].id,
        };
        unapprovedListings.push(listing);
      }

      dispatch({
        type: FETCH_UNAPPROVED_LISTINGS,
        payload: { unapprovedListings },
      });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError());
      console.log(error);
    }
  };
};

// TOGGLE LISTING APPROVED
export const toggleListingApproved = (id, approved) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    let query = firestore.collection("listings").doc(`${id}`);

    try {
      dispatch(asyncActionStart());

      await query.update({ approved: !approved });

      dispatch(fetchAllListings());
      dispatch(fetchApprovedListings());
      dispatch(fetchUnapprovedListings());
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError());
      console.log(error);
    }
  };
};

// DELETE LISTING
export const deleteListing = (id, photoName, photoURL) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    let query = firestore.collection("listings").doc(`${id}`);

    try {
      dispatch(asyncActionStart());

      await dispatch(deleteListingPhotos(id, photoName, photoURL));

      await query.delete();

      dispatch(fetchAllListings());
      dispatch(fetchApprovedListings());
      dispatch(fetchUnapprovedListings());
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};

// DELETE LISTING PHOTOS
export const deleteListingPhotos = (id, photoName, photoURL) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    // SUB PHOTO QUERY
    const photosQuery = firestore
      .collection("listings")
      .doc(`${id}`)
      .collection("photos");

    try {
      // DELETE SUB PHOTOS
      let query = await photosQuery.get();
      let allSubPhotos = [];
      for (let i = 0; i < query.docs.length; i++) {
        let photo = {
          ...query.docs[i].data(),
          id: query.docs[i].id,
        };
        allSubPhotos.push(photo);
      }

      if (allSubPhotos.length > 0) {
        allSubPhotos.map((photo) => {
          firebase.deleteFile(`${id}/sub_photos/${photo.photoName}`);
          photosQuery.doc(`${photo.id}`).delete();
        });
      }

      // MAIN PHOTO DELETE
      if (photoURL !== "/assets/avatar/building.png") {
        firebase.deleteFile(`${id}/main_photo/${photoName}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
