import { FIREBASE_AUTH, FIREBASE_DB } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export const SignUpUtil = async ({ name, email, password, setLoading }) => {
  if (!name) {
    alert("Name is required");
    return;
  }
  console.log(name, email, password);
  setLoading(true);
  try {
    const response = await createUserWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );
    const user = response.user;
    await updateProfile(user, {
      displayName: name,
    });
    try {
      console.log("Adding user to Firestore");
      await setDoc(doc(FIREBASE_DB, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: name,
      });
      console.log("User added to Firestore");
    } catch (error) {
      console.error("Error adding user to Firestore:", error);
    }
    console.log("User added to Firestore");
    console.log("Account created with:", response.user.email);
  } catch (e) {
    console.log(e);
    alert("Sign in failed " + e.message);
  } finally {
    setLoading(false);
  }
};

export const SignInUtil = async ({ email, password, setLoading }) => {
  setLoading(true);
  try {
    const response = await signInWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );
    console.log("Logged in with:", response.user.email);
  } catch (e) {
    console.log(e);
    alert("Sign in failed " + e.message);
  } finally {
    setLoading(false);
  }
};
