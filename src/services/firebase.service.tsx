
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCm5BHElFUcWuUKyhVc745Eviqr97YQTGU",
  authDomain: "null-valley-493d4.firebaseapp.com",
  projectId: "null-valley-493d4",
  storageBucket: "null-valley-493d4.appspot.com",
  messagingSenderId: "1065736250106",
  appId: "1:1065736250106:web:dd8b9162a48264ceb99f43",
  measurementId: "G-SVH7E6SC2Q"
};


// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export const auth = getAuth(appFirebase);
export const db = getFirestore(appFirebase);
export const storage = getStorage(appFirebase, "gs://null-valley-493d4.appspot.com");
export default appFirebase;
