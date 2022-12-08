import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBkQShvwPtIStI5wUSqz22n92zlA_zSw1Y",
  authDomain: "hermeswebapp.firebaseapp.com",
  projectId: "hermeswebapp",
  storageBucket: "hermeswebapp.appspot.com",
  messagingSenderId: "127662202068",
  appId: "1:127662202068:web:93782907e52c8e4d282f41",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export const auth = getAuth(app);
export default app;
export { db, storage };
