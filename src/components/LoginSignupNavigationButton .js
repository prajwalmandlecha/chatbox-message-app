import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const LoginSignupNavigationButton = ({ text, onPressAction}) => (
  <TouchableOpacity onPress={onPressAction} style={styles.switch}>
    <Text style={styles.switchText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  switch: {
    marginTop: 16,
    alignItems: "center",
  },
  switchText: {
    color: "#1e90ff",
    fontSize: 16,
  },
});

export default LoginSignupNavigationButton;
