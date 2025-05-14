import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { FIREBASE_AUTH } from "../services/firebase";
import { RTCPeerConnection, MediaStream, RTCView } from "react-native-webrtc";
import React, { useState, useEffect, useRef } from "react";
import {
  setupMediaSources,
  createCall,
  hangUp,
  handleIncomingCall,
} from "../services/CallService";

const CallScreen = ({ navigation, route }) => {
  const { user, type, uuid } = route.params;
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(new MediaStream());
  const [callId, setCallId] = useState(null);
  console.log("Call ID", callId);

  const currentUser = FIREBASE_AUTH.currentUser;

  console.log("Remote Stream", remoteStream);

  const pc = useRef(
    new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    })
  );

  useEffect(() => {
    const setupCall = async () => {
      await setupMediaSources(pc, setLocalStream);

      pc.current.ontrack = (event) => {
        const newRemoteStream = new MediaStream();
        event.streams[0].getTracks().forEach((track) => {
          newRemoteStream.addTrack(track);
        });
        setRemoteStream(newRemoteStream);
      };

      if (type === "callee") {
        IncomingCallHandler();
        setCallId(uuid);
      }

      if (type === "caller") {
        const callDocId = await createCall(
          uuid,
          pc,
          currentUser,
          user,
          navigation
        );
        setCallId(callDocId);
      }
    };

    setupCall();

    return () => {
      if (pc.current) {
        pc.current.close();
      }
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      if (remoteStream) {
        remoteStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [type, currentUser, user, uuid]);

  async function IncomingCallHandler() {
    if (uuid) {
      await handleIncomingCall(uuid, pc);
    } else {
      console.error("Incoming call ID or offer is missing");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        {localStream && (
          <RTCView
            streamURL={localStream.toURL()}
            style={styles.video}
            mirror={true}
            objectFit={"cover"}
          />
        )}
      </View>
      <View style={{ flex: 1 }}>
        {remoteStream && remoteStream.getTracks().length > 0 ? (
          <RTCView
            streamURL={remoteStream.toURL()}
            style={styles.video}
            objectFit={"contain"}
          />
        ) : (
          <Text>No remote stream available</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          hangUp(
            pc,
            localStream,
            remoteStream,
            setLocalStream,
            setRemoteStream,
            callId
          )
        }
      >
        <Text style={styles.buttonText}>Hang Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  video: {
    flex: 1,
  },
  button: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default CallScreen;
