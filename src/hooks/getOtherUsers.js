import { useState, useEffect } from "react";
import { getDocs, query, where } from "firebase/firestore";
import {FIREBASE_AUTH,usersRef} from "../services/firebase"

export const getOtherUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const q = query(
          usersRef,
          where("uid", "!=", FIREBASE_AUTH.currentUser.uid)
        );

        const querySnapshot = await getDocs(q);
        const usersList = querySnapshot.docs.map((doc) => doc.data());
        console.log("usersList", usersList);
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  return [loading,users];
};
