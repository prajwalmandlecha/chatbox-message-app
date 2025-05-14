import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { updateDoc, collection, doc } from "firebase/firestore";
import { FIREBASE_DB } from "../services/firebase";

const OutgoingCallScreen = ({ navigation, route }) => {
  const { user, uuid, type } = route.params;

  const declineCall = async () => {
    console.log("Decline Call");
    const callDoc = doc(collection(FIREBASE_DB, "calls"), uuid);
    await updateDoc(callDoc, { status: "rejected" });
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.status}>calling...</Text>

      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={{ ...styles.iconButtonContainer, backgroundColor: "red" }}
            onPress={declineCall}
          >
            <MaterialCommunityIcons
              name="phone-hangup"
              size={40}
              color="white"
            />
          </TouchableOpacity>
          <Text style={styles.iconText}>Decline</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#000000",
    alignItems: "center",
    padding: 10,
    paddingBottom: 50,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginTop: 50,
    marginBottom: 15,
  },
  status: {
    fontSize: 20,
    color: "#1e90ff",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "auto",
  },
  iconContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  iconText: {
    color: "white",
    marginTop: 10,
    fontSize: 20,
  },
  iconButtonContainer: {
    padding: 20,
    borderRadius: 50,
    margin: 10,
  },
});

export default OutgoingCallScreen;
