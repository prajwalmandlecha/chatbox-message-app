import React from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import Avatar, { genConfig } from "@zamplyy/react-native-nice-avatar";
import Ionicons from "@expo/vector-icons/Ionicons";

const config1 = {
  size: 64,
  shape: "circle",
  sex: "man",
  faceColor: "#F9C9B6",
  earSize: "big",
  hairColor: "#000",
  hairStyle: "normal",
  hatColor: "#D2EFF3",
  hatStyle: "none",
  eyeStyle: "circle",
  glassesStyle: "none",
  noseStyle: "short",
  mouthStyle: "smile",
  shirtStyle: "hoody",
  shirtColor: "#F4D150",
  bgColor: "#FFEDEF",
  isGradient: false,
};

const UserItem = ({ user, onPress, onCallPress }) => {
  const config = genConfig();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPress(user)} style={styles.userItem}>
        <Avatar size={54} {...config} style={styles.profilephoto} />
        <View style={styles.nameText}>
          <Text style={styles.name}>{user.username || user.name}</Text>
          <Text style={styles.subtext}>{user.name}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onCallPress(user)}
        style={styles.callButton}
      >
        <Ionicons name="call" size={24} color="white" style={styles.callIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    // ...existing styles...
  },
  userItem: {
    flex: 1,
    height: 70,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 3,
  },
  nameText: {
    flex: 1,
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: "#18222e",
    justifyContent: "center",
    flexDirection: "column",
  },
  callButton: {
    padding: 10,
  },
  name: {
    fontSize: 20,
    color: "#ffffff",
  },
  subtext: {
    color: "white",
    fontSize: 16,
  },
  profilephoto: {
    width: 54,
    height: 54,
    marginRight: 15,
    borderRadius: 24,
    justifyContent: "center",
  },
});

export default UserItem;
