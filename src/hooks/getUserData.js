import { useEffect } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function getUserData({ setUserData, setLoading }) {
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = FIREBASE_AUTH.currentUser;
        if (user) {
          const userDocRef = doc(FIREBASE_DB, "users", user.uid);
          const userDoc = await getDoc(userDocRef);
          //console.log("userDoc", userDoc.data());
          if (userDoc.exists()) {
            //console.log("userDoc", userDoc.data());
            setUserData(userDoc.data());
          } else {
            console.log("No such document!");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);
}
