import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCunrR90FmP8ubPgWdyv1WKIuv_Qn93PYY",
  authDomain: "futsa-e5f8a.firebaseapp.com",
  projectId: "futsa-e5f8a",
  storageBucket: "futsa-e5f8a.appspot.com",
  messagingSenderId: "524861201101",
  appId: "1:524861201101:web:6a9736f9634a53c402a784",
  measurementId: "G-S8HSFPK5QB",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const firebaseFunctions = firebase.functions();

export { auth, db, firebaseFunctions, firebaseConfig };
