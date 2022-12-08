import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { addDoc, collection } from "firebase/firestore";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  async function signUp(email, password, data) {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    console.log(user);

    try {
      await addDoc(collection(db, "user"), {
        uid: user.uid,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        username: data.username,
      });
    } catch (error) {
      console.log("Error in creating user", error);
    }

    return res;
  }
  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider value={{ user, logIn, signUp, logOut }}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
