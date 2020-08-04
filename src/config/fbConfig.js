import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const fbConfig = {
  apiKey: "AIzaSyBdEEMDRk9Md_O3jPFgdgZAOtK2bxV1J50",
  authDomain: "fir-app-8c3cd.firebaseapp.com",
  databaseURL: "https://fir-app-8c3cd.firebaseio.com",
  projectId: "fir-app-8c3cd",
  storageBucket: "fir-app-8c3cd.appspot.com",
  messagingSenderId: "6428592880",
  appId: "1:6428592880:web:7a8b915ada4b7c17389035",
  measurementId: "G-X3X2CW6STP"
}

firebase.initializeApp(fbConfig);
export const auth = firebase.auth();
export const database = firebase.database();