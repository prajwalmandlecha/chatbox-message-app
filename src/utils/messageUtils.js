import { useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { doc, setDoc, collection, addDoc } from 'firebase/firestore';
import { FIREBASE_DB } from "../services/firebase";

export const createOnSend = (currentUser, user, conversationId, setMessages) => {
  return useCallback(
    (messages = []) => {
      const message = messages[0];
      const messageData = {
        _id: message._id,
        text: message.text,
        createdAt: message.createdAt,
        user: {
          _id: currentUser.uid,
          name: currentUser.displayName || currentUser.email,
        },
      };
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [messageData])
      );

      const conversationRef = doc(FIREBASE_DB, 'conversations', conversationId);

      setDoc(
        conversationRef,
        { participants: [currentUser.uid, user.uid] },
        { merge: true }
      );

      const messagesRef = collection(conversationRef, 'messages');
      addDoc(messagesRef, messageData);
    },
    [currentUser.uid, currentUser.displayName, user.uid, conversationId]
  );
};