// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVDXDNSOmS0_qdHQVDIu4Q-i70XHY1J-s",
  authDomain: "barangaysystem-699c2.firebaseapp.com",
  projectId: "barangaysystem-699c2",
  storageBucket: "barangaysystem-699c2.appspot.com",
  messagingSenderId: "767477025051",
  appId: "1:767477025051:web:d6f5a98c967ca20a8eebbe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

