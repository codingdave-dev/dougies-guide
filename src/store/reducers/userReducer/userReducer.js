import { createReducer } from "../../../common/util/reducerUtil";
import {
  FETCH_USER_CHECKINS,
  FETCH_USER_FAVOURITES,
  FETCH_USER_LISTINGS,
} from "../../constants/userConstants/userConstants";

const initialState = {
  userListings: [],
  userFavourites: [],
  userCheckins: [],
};

const fetchUserListings = (state, payload) => {
  return {
    ...state,
    userListings: payload.userListings,
  };
};

const fetchUserFavourites = (state, payload) => {
  return {
    ...state,
    userFavourites: payload.userFavourites,
  };
};

const fetchUserCheckins = (state, payload) => {
  return {
    ...state,
    userCheckins: payload.userCheckins,
  };
};

export default createReducer(initialState, {
  [FETCH_USER_LISTINGS]: fetchUserListings,
  [FETCH_USER_FAVOURITES]: fetchUserFavourites,
  [FETCH_USER_CHECKINS]: fetchUserCheckins,
});
