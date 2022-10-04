import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCvwTlp5Mrv0_r7Zyx2hAYRdqkMbNR-rAQ",
  authDomain: "vetrify-1bca9.firebaseapp.com",
  projectId: "vetrify-1bca9",
  storageBucket: "vetrify-1bca9.appspot.com",
  messagingSenderId: "1007809710621",
  appId: "1:1007809710621:web:8f76aa6590a7a8cbae94f4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
// export const bookingsCollection = collection(db, "bookings");
export default app;

/*
REACT_APP_FIREBASE_API_KEY="AIzaSyDhvzrnVIVO7Cw76EnAuboMytMsmxxp8tc"
REACT_APP_FIREBASE_AUTH_DOMAIN="m-health-v2.firebaseapp.com"
REACT_APP_FIREBASE_PROJECT_ID="m-health-v2"
REACT_APP_FIREBASE_STORAGE_BUCKET="m-health-v2.appspot.com"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=735249998972
REACT_APP_FIREBASE_MESSAGING_APP_ID="1:735249998972:web:3aca95344aaf800f0195f9"
*/
