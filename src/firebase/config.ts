import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "mooc-e2152.firebaseapp.com",
  databaseURL: "https://mooc-e2152.firebaseio.com",
  projectId: "mooc-e2152",
  storageBucket: "mooc-e2152.appspot.com",
  messagingSenderId: "706412749107",
  appId: "1:706412749107:web:904b28a354574e909c1e46",
  measurementId: "G-GVF6P5M13F",
};
!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

const db = firebase.firestore();
const auth = firebase.auth();
export { db, auth };
