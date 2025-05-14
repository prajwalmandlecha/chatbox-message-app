import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { toggleSpeaker } from "../services/inCallManagerService";
const CallToolbar = ({ switchCamera, toggleCamera, toggleAudio, hangUp }) => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);

  const onReverseCamera = async () => {
    await switchCamera();
  };

  const togglespeaker = () => {
    const newSpeakerState = !isSpeakerOn;
    toggleSpeaker(newSpeakerState);
    setIsSpeakerOn(newSpeakerState);
  };

  const onToggleCamera = async () => {
    console.log("Toggle Camera");
    setIsCameraOn((currentValue) => !currentValue);
    await toggleCamera();
  };

  const onToggleMicrophone = async () => {
    console.log("Toggle Microphone");
    setIsMicOn((currentValue) => !currentValue);
    await toggleAudio();
  };

  const onHangUp = () => {
    console.log("Hang Up");
    hangUp();
  };

  return (
    <View style={styles.toolbar}>
      <TouchableOpacity onPress={onReverseCamera} style={styles.iconButton}>
        <Ionicons name="camera-reverse" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={onToggleCamera}>
        <MaterialCommunityIcons
          name={isCameraOn ? "camera-off" : "camera"}
          size={30}
          color={"white"}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={onToggleMicrophone}>
        <MaterialCommunityIcons
          name={isMicOn ? "microphone-off" : "microphone"}
          size={30}
          color="white"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={togglespeaker}>
        <Ionicons
          name={isSpeakerOn ? "volume-high" : "volume-off"}
          size={30}
          color="white"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.iconButton, backgroundColor: "red" }}
        onPress={onHangUp}
      >
        <MaterialCommunityIcons name="phone-hangup" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: "#333333",
    padding: 20,
    paddingBottom: 30,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  iconButton: {
    backgroundColor: "#4a4a4a",
    padding: 15,
    borderRadius: 50,
  },
});

export default CallToolbar;
