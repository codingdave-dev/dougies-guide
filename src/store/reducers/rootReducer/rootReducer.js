import { combineReducers } from "redux";
import {reducer as formReducer} from "redux-form";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

import asyncReducer from '../asyncReducers/asyncReducers'

import dialogReducer from '../dialogReducer/dialogReducer'
import boardMemberReducer from "../boardMembersReducer/boardMemberReducer";
import listingReducer from "../listingReducers/listingReducer";

import userReducer from "../userReducer/userReducer";
import adminReducer from '../adminReducers/adminReducers'

const rootReducer = combineReducers({
  // ASYNC
  loading: asyncReducer,

  // FIREBASE/FIRESTORE
  firebase: firebaseReducer,
  firestore: firestoreReducer,

  // REDUX FORM REDUCER
  form: formReducer,

  // DIALOG REDUCER
  dialog: dialogReducer,

  // BOARD MEMBER REDUCER
  boardMembers: boardMemberReducer,

  // LISTINGS REDUCERS
  listings: listingReducer,

  // USER REDUCERS
  user: userReducer,

  // ADMIN REDUCERS
  admin: adminReducer
});

export default rootReducer;
