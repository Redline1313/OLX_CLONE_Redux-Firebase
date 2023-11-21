import { initializeApp } from "@firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  PhoneAuthProvider,
  getAuth,
} from "@firebase/auth";
import { getStorage } from "firebase/storage";

import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChxHRY-QysU-EYmkT9zHA44e_1_Kfxhmc",
  authDomain: "olx-cb403.firebaseapp.com",
  databaseURL: "https://olx-cb403-default-rtdb.firebaseio.com",
  projectId: "olx-cb403",
  storageBucket: "olx-cb403.appspot.com",
  messagingSenderId: "1018986593874",
  appId: "1:1018986593874:web:fe08f81c324a049287298b",
  measurementId: "G-PBFDVE7HZB",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

const emailAuthProvider = new EmailAuthProvider();
const phoneAuthProvider = new PhoneAuthProvider();

export {
  app,
  db,
  storage,
  auth,
  provider,
  emailAuthProvider,
  phoneAuthProvider,
  analytics,
};
