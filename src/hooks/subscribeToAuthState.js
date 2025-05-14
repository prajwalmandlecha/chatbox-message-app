import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function subscribeToAuthState() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
      console.log("user", authUser);
      setUser(authUser);
    });
    return () => unsubscribe();
  }, []);
  return user;
}
