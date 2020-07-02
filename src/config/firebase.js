import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBeMkvQu7mMKBg-oosXzTReAu86jnACq70",
  authDomain: "dougiesguide-dadc1.firebaseapp.com",
  databaseURL: "https://dougiesguide-dadc1.firebaseio.com",
  projectId: "dougiesguide-dadc1",
  storageBucket: "dougiesguide-dadc1.appspot.com",
  messagingSenderId: "68363249339",
  appId: "1:68363249339:web:e375e3835c2a2cf4122b9e",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.storage()
}

// firebase.initializeApp(firebaseConfig);
// firebase.firestore();

export default firebase;
