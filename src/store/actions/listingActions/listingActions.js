import firebase from "../../../config/firebase";
import cuid from "cuid";

import {
  FETCH_ALL_APPROVED_LISTING,
  FETCH_ALL_LISTING,
  FETCH_LISTING,
} from "../../constants/listingConstants/listingConstants";
import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../asyncActions/asyncActions";
import {
  fetchUserCheckins,
  fetchUserFavourites,
} from "../userActions/userActions";
import { createNewListingHelper } from "../../../common/util/helpers";

// FETCH ALL LISITNGS
export const fetchAllListings = () => {
  return async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore()

    const listingsQuery = firestore.collection('listings')

    try {

      let query = await listingsQuery.get()

      let allListings = []

      for (let i = 0; i < query.docs.length; i++) {
        let listing = {
          ...query.docs[i].data(),
          id: query.docs[i].id,
        };
        allListings.push(listing);
      }

      dispatch({type: FETCH_ALL_LISTING, payload: {allListings}})

    } catch (error) {
      console.log(error)
    }
  }
}

// FETCH ALL LISTINGS FOR DASHBOARD - APPROVED
export const fetchAllApprovedListings = () => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const approvedListingsQuery = firestore
      .collection("listings")
      .where("approved", "==", true);

    try {
      dispatch(asyncActionStart());
      let query = await approvedListingsQuery.get();

      let allApprovedListings = [];

      for (let i = 0; i < query.docs.length; i++) {
        let listing = {
          ...query.docs[i].data(),
          id: query.docs[i].id,
        };
        allApprovedListings.push(listing);
      }

      dispatch({ type: FETCH_ALL_APPROVED_LISTING, payload: { allApprovedListings } });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError());
      console.log("error");
    }
  };
};

// FETCH DETAILED LISTING
export const fetchListing = (id, userId, noLoader) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const listingQuery = firestore.collection("listings").doc(`${id}`);
    const photosQuery = firestore
      .collection("listings")
      .doc(`${id}`)
      .collection("photos")
      .orderBy("createdAt", "desc");

    const reviewsQuery = firestore
      .collection("user_reviews")
      .where("listingId", "==", `${id}`)
      .orderBy("createdAt", "desc");

    const usersQuery = firestore.collection("users");

    try {
      {
        !noLoader && dispatch(asyncActionStart());
      }

      let query = await listingQuery.get();
      let photoQuery = await photosQuery.get();
      let reviewQuery = await reviewsQuery.get();

      let listing = [];
      let photos = [];
      let reviews = [];

      // PHOTOS
      if (!photoQuery.empty) {
        for (let i = 0; i < photoQuery.docs.length; i++) {
          let photo = {
            id: photoQuery.docs[i].id,
            ...photoQuery.docs[i].data(),
          };
          photos.push(photo);
        }
      }

      // REVIEWS
      if (!reviewQuery.empty) {
        for (let i = 0; i < reviewQuery.docs.length; i++) {
          const userId = reviewQuery.docs[i].data().addedByUid;
          let userQuery = await usersQuery.doc(`${userId}`).get();

          let review = {
            id: reviewQuery.docs[i].id,
            ...reviewQuery.docs[i].data(),
            addedBy: userQuery.data().fullName,
            photoURL: userQuery.data().photoURL,
          };
          reviews.push(review);
        }
      }

      if (query.exists) {
        let list = {
          id: query.id,
          ...query.data(),
          photos: photos,
          reviews: reviews,
        };
        listing.push(list);
      }

      if (!query.exists) {
        return;
      }

      dispatch({ type: FETCH_LISTING, payload: { listing } });
      dispatch(fetchUserFavourites(userId));
      dispatch(fetchUserCheckins(userId));
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError());
      console.log(error);
    }
  };
};

// ADD LISTING REVIEW
export const addListingReview = (profile, listing, review, ratingValue) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const listingId = listing.id;
    const userId = profile.uid;

    const reviewQuery = firestore.collection("user_reviews");

    const listingQuery = firestore.collection("listings").doc(`${listingId}`);

    try {
      await reviewQuery.add({
        addedBy: profile.fullName,
        addedByUid: profile.uid,
        photoURL: profile.photoURL,
        listingId: listing.id,
        description: review.description,
        rating: ratingValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      // UPDATE NUMBER OF REVIEWS IN LISTING
      const query = await listingQuery.get();
      let currentNumberOfReviews = query.data().numberOfReviews;
      let currentRatingTotal = query.data().ratingTotal;
      let updatedNumberOfReviews = currentNumberOfReviews + 1;
      let updatedTotalRating = currentRatingTotal + ratingValue;

      // UPDATE RATING IN LISTING
      let sumOfTotalReviews = updatedNumberOfReviews * 5;
      let sumOfTotalRating = updatedTotalRating;
      let rating = (sumOfTotalRating * 5) / sumOfTotalReviews;

      await listingQuery.update({
        numberOfReviews: updatedNumberOfReviews,
        ratingTotal: updatedTotalRating,
        rating: rating,
      });

      dispatch(fetchListing(listingId, userId, true));
    } catch (error) {
      console.log(error);
    }
  };
};

// ADD LISTING MAIN PHOTO
export const addListingMainPhoto = (file, listingId) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();

    const imageName = cuid() + ".jpg";
    const path = `${listingId}/main_photo`;
    const options = {
      name: imageName,
    };

    try {
      dispatch(asyncActionStart());

      // upload to firebase storage

      let uploadedFile = await firebase.uploadFile(path, file, null, options);

      // get download URL
      let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();

      // add image name and URL to firestore
      await firestore
        .collection("listings")
        .doc(listingId)
        .update({ photoURL: downloadURL, photoName: imageName });

      dispatch(fetchListing(listingId, firebase.auth().currentUser.uid, true));
    } catch (error) {
      console.log(error);
    }
  };
};

// DELETE LISTING MAIN PHOTO
export const deleteListingMainPhoto = (photoName, listingId) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {
      dispatch(asyncActionStart());
      await firebase.deleteFile(`${listingId}/main_photo/${photoName}`);

      await firestore
        .collection("listings")
        .doc(listingId)
        .update({ photoName: "", photoURL: "/assets/avatar/building.png" });
      dispatch(fetchListing(listingId, firebase.auth().currentUser.uid, true));
    } catch (error) {
      console.log(error);
    }
  };
};

// ADD SUB LISTING PHOTO
export const addListingSubPhoto = (file, listingId) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();

    const imageName = cuid() + ".jpg";
    const path = `${listingId}/sub_photos`;
    const options = {
      name: imageName,
    };

    try {
      dispatch(asyncActionStart());

      // upload to firebase storage

      let uploadedFile = await firebase.uploadFile(path, file, null, options);

      // get download URL
      let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();

      // add image name and URL to firestore
      await firestore
        .collection("listings")
        .doc(listingId)
        .collection("photos")
        .add({
          photoURL: downloadURL,
          photoName: imageName,
          addedBy: firebase.auth().currentUser.displayName,
          addedByUid: firebase.auth().currentUser.uid,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

      dispatch(fetchListing(listingId, firebase.auth().currentUser.id, true));
    } catch (error) {
      console.log(error);
    }
  };
};

// CREATE NEW LISITNG
export const createNewListing = (values) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    const user = firebase.auth().currentUser;
    const createdAt = firebase.firestore.FieldValue.serverTimestamp()
    const photoURL = "/assets/avatar/building.png";

    const newListing = createNewListingHelper(user, createdAt, photoURL, values);
    try {
      let createListing = await firestore.add("listings", newListing);
      return createListing;
    } catch (error) {
      console.log(error);
    }
  };
};
