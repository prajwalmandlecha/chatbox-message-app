import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
4;
import { updateDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { FIREBASE_DB } from "../services/firebase";
import { CALL_STATUS } from "../services/CallService";
import { startIncomingCall, stopAudio } from "../services/inCallManagerService";

const IncomingCallScreen = ({ navigation, route }) => {
  const { user, uuid, type } = route.params;
  console.log("userrr", user);
  useEffect(() => {
    startIncomingCall();

    const callDocRef = doc(FIREBASE_DB, "calls", uuid);
    const unsubscribe = onSnapshot(callDocRef, (snapshot) => {
      const data = snapshot.data();
      if (
        data?.status === CALL_STATUS.FINISHED ||
        data?.status === CALL_STATUS.MISSED ||
        data?.status === CALL_STATUS.REJECTED
      ) {
        stopAudio();

        navigation.popToTop();
      }
    });

    return () => {
      unsubscribe();
      stopAudio();
    };
  }, [uuid]);

  const acceptCall = async () => {
    console.log("Accept Call");
    const callDoc = doc(collection(FIREBASE_DB, "calls"), uuid);
    await updateDoc(callDoc, { status: "accepted" });
    navigation.navigate("CallScreenMain", { user: user.id, uuid, type });
  };

  const declineCall = async () => {
    console.log("Decline Call");
    const callDoc = doc(collection(FIREBASE_DB, "calls"), uuid);
    await updateDoc(callDoc, { status: CALL_STATUS.REJECTED });
    navigation.popToTop();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.status}>Video Call</Text>

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
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={{
              ...styles.iconButtonContainer,
              backgroundColor: "#0098FF",
            }}
            onPress={acceptCall}
          >
            <Ionicons name="call" size={40} color="white" />
          </TouchableOpacity>
          <Text style={styles.iconText}>Accept</Text>
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

export default IncomingCallScreen;
