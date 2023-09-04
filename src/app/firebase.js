// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFM8g91eWDc9lVPXvQ_AHDGS5ID6S4P_0",
  authDomain: "nextjspractice-945d7.firebaseapp.com",
  projectId: "nextjspractice-945d7",
  storageBucket: "nextjspractice-945d7.appspot.com",
  messagingSenderId: "156823929644",
  appId: "1:156823929644:web:d58c9ffa2b2afb6c012289"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);