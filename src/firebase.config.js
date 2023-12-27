import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAHBpZEAt78nygzBgYo3lb3qBsDbss_UVY",
  authDomain: "food-delivery-app-8e476.firebaseapp.com",
  databaseURL: "https://food-delivery-app-8e476-default-rtdb.firebaseio.com",
  projectId: "food-delivery-app-8e476",
  storageBucket: "food-delivery-app-8e476.appspot.com",
  messagingSenderId: "20047974690",
  appId: "1:20047974690:web:9841e12391172d297f957b",
  measurementId: "G-HDBGT84FLB",
};

const app = getApps.Length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
