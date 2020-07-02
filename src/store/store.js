import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers/rootReducer/rootReducer";

import { getFirestore, reduxFirestore } from "redux-firestore";
import { getFirebase, reactReduxFirebase } from "react-redux-firebase";

import firebase from "../config/firebase";

const reactReduxFirestoreConfig = {
  userProfile: "users",
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
  updateProfileOnLogin: false,
};

let store;

function initStore(initialState) {
  const middlewares = [
    thunkMiddleware.withExtraArgument({ getFirebase, getFirestore }),
  ];

  const composedEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares),
    reactReduxFirebase(firebase, reactReduxFirestoreConfig),
    reduxFirestore(firebase)
  );

  return createStore(rootReducer, initialState, composedEnhancer);
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
