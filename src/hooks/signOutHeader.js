import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { FIREBASE_AUTH } from "../services/firebase";

export const signOutHeader = ({ navigation }) => {
  const onSignOut = () => {
    FIREBASE_AUTH.signOut().catch((error) => {
      console.error("error", error);
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={onSignOut} style={{ marginRight: 10 }}>
          <Text style={{ color: "white" }}>Sign Out</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
};
