import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import CallToolbar from "../components/CallToolbar";
import { RTCPeerConnection, MediaStream, RTCView } from "react-native-webrtc";
import { FIREBASE_AUTH } from "../services/firebase";
import {
  setupMediaSources,
  createCall,
  hangUp,
  handleIncomingCall,
  switchCamera,
  toggleCamera,
  toggleAudio,
} from "../services/CallService";
import { startVideoCall, stopAudio } from "../services/inCallManagerService";

const CallScreenMain = ({ navigation, route }) => {
  const { user, type, uuid } = route.params;
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(new MediaStream());
  const [callId, setCallId] = useState(null);
  const [callDuration, setCallDuration] = useState(0);
  const [cameraCount, setCameraCount] = useState(0);
  const [isFrontCam, setIsFrontCam] = useState(true);

  const timerRef = useRef(null);

  console.log("Call ID", uuid);
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
      startVideoCall();
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

      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);

      // const count = await countMediaSources();
      // setCameraCount(count);
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
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      stopAudio();
    };
  }, [type, currentUser, user, uuid]);

  async function IncomingCallHandler() {
    if (uuid) {
      await handleIncomingCall(uuid, pc, navigation);
    } else {
      console.error("Incoming call ID or offer is missing");
    }
  }

  const formatCallDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.callDuration}>
        {formatCallDuration(callDuration)}
      </Text>
      {remoteStream && remoteStream.getTracks().length > 0 ? (
        <RTCView
          streamURL={remoteStream.toURL()}
          style={styles.remoteStream}
          objectFit={"cover"}
          zOrder={0}
        />
      ) : (
        <Text>No remote stream available</Text>
      )}
      {localStream && (
        <RTCView
          streamURL={localStream.toURL()}
          style={styles.cameraPreview}
          objectFit="cover"
          zOrder={1}
          mirror={true}
        />
      )}

      <CallToolbar
        switchCamera={() => switchCamera(localStream)}
        toggleCamera={() => toggleCamera(localStream)}
        toggleAudio={() => toggleAudio(localStream)}
        hangUp={() =>
          hangUp(
            pc,
            localStream,
            remoteStream,
            setLocalStream,
            setRemoteStream,
            callId,
            navigation
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  callDuration: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  remoteStream: {
    flex: 1,
  },
  cameraPreview: {
    position: "absolute",
    width: 100,
    height: 140,
    top: 50,
    right: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    overflow: "hidden",
  },
});

export default CallScreenMain;
