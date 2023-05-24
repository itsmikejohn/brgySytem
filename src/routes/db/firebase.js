
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVDXDNSOmS0_qdHQVDIu4Q-i70XHY1J-s",
  authDomain: "barangaysystem-699c2.firebaseapp.com",
  projectId: "barangaysystem-699c2",
  storageBucket: "barangaysystem-699c2.appspot.com",
  messagingSenderId: "767477025051",
  appId: "1:767477025051:web:d6f5a98c967ca20a8eebbe"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);