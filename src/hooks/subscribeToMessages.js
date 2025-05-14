import { FIREBASE_DB, messagesRef } from "../services/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";

const subscribeToMessages = ({ conversationId, setMessages }) =>
  useEffect(() => {
    const messagesRef = collection(
      FIREBASE_DB,
      "conversations",
      conversationId,
      "messages"
    );

    const q = query(messagesRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesFirestore = snapshot.docs.map((doc) => {
        const firebaseData = doc.data();
        const data = {
          _id: doc.id,
          text: firebaseData.text,
          createdAt: firebaseData.createdAt.toDate(),
          user: firebaseData.user,
        };
        return data;
      });
      setMessages(messagesFirestore);
    });

    return () => unsubscribe();
  }, [conversationId]);

export default subscribeToMessages;
