import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "TUO_API_KEY",
  authDomain: "TUO_PROGETTO.firebaseapp.com",
  projectId: "TUO_PROJECT_ID",
//   storageBucket: "TUO_PROGETTO.appspot.com",
//   messagingSenderId: "ID_MESSAGGI",
//   appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
