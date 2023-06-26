import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
//Kamran Sir Firebase Configuration

const firebaseConfig = {
  apiKey: "AIzaSyCuON05O-8LmwpA3zTsFZTw-x0hc9rFRDQ",
  authDomain: "letsmeet-c75f1.firebaseapp.com",
  projectId: "letsmeet-c75f1",
  storageBucket: "letsmeet-c75f1.appspot.com",
  messagingSenderId: "786577268756",
  appId: "1:786577268756:web:d08bab119eb19849894701",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// Firebase storage reference
const storage = getStorage(app);

const db = getFirestore(app);
const auth = getAuth();
export { db, auth, storage };
