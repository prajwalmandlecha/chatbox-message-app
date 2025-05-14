import { FIREBASE_AUTH, FIREBASE_DB } from "../services/firebase";
import {
  mediaDevices,
  MediaStream,
  RTCIceCandidate,
  RTCSessionDescription,
} from "react-native-webrtc";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore"; // Import Firestore functions
import InCallManager from "react-native-incall-manager";

export const CALL_STATUS = {
  PENDING: "pending",
  OFFER: "offer",
  ANSWER: "answer",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  MISSED: "missed",
  FINISHED: "finished",
};

const iceServers = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
  { urls: "stun:stun2.l.google.com:19302" },
];

export const setupMediaSources = async (pc, setLocalStream) => {
  try {
    const stream = await mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: { min: 640, ideal: 1280, max: 1920 },
        height: { min: 360, ideal: 720, max: 1080 },
        frameRate: { min: 15, ideal: 30 },
      },
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });

    stream.getTracks().forEach((track) => {
      pc.current.addTrack(track, stream);
    });
    setLocalStream(stream);
  } catch (error) {
    console.error("Error accessing media devices.", error);
  }
};

export const countMediaSources = async () => {
  let cameraCount = 0;

  try {
    const devices = await mediaDevices.enumerateDevices();

    devices.map((device) => {
      if (device.kind != "videoinput") {
        return;
      }

      cameraCount = cameraCount + 1;
    });
    console.log("Camera count", cameraCount);
    return cameraCount;
  } catch (err) {
    console.log("Error accessing media devices.", err);
  }
};

export const switchCamera = async (localStream) => {
  try {
    // Taken from above, we don't want to flip if we don't have another camera.
    // if (cameraCount < 2) {
    //   return;
    // }
    console.log("Switching camera.");
    localStream.getVideoTracks().forEach((track) => {
      console.log("sc", track);
      track._switchCamera();
    });

    console.log("Camera switched.");
  } catch (err) {
    console.log("Error switching camera.", err);
  }
};

export const toggleCamera = async (localStream) => {
  try {
    console.log("Toggling camera.");
    localStream.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    console.log("Camera toggled.");
  } catch (err) {
    console.log("Error switching camera.", err);
  }
};

export const toggleAudio = async (localStream) => {
  try {
    console.log("Toggling audio.");
    localStream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    console.log("Audio toggled.");
  } catch (err) {
    console.log("Error switching camera.", err);
  }
};

export const listenForCalls = async (navigation) => {
  const activeCallsRef = collection(FIREBASE_DB, "calls");

  const q = query(
    activeCallsRef,
    where("callee", "==", FIREBASE_AUTH.currentUser.uid),
    where("status", "==", CALL_STATUS.OFFER)
  );

  const unsubscribe = onSnapshot(q, async (snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
      if (change.type === "added") {
        const callData = change.doc.data();

        const user = (
          await getDoc(doc(FIREBASE_DB, "users", callData.caller))
        ).data();
        navigation.navigate("IncomingCall", {
          user: user,
          type: "callee",
          uuid: change.doc.id,
        });
      }
    });
  });

  return unsubscribe;
};

export const handleIncomingCall = async (uuid, pc, navigation) => {
  try {
    const callDoc = doc(FIREBASE_DB, "calls", uuid);
    const answerCandidates = collection(callDoc, "answerCandidates");
    const offerCandidates = collection(callDoc, "offerCandidates");
    pc.current.onicecandidate = (event) => {
      if (event.candidate) {
        addDoc(answerCandidates, event.candidate.toJSON()).catch((error) => {
          console.error("Error adding answer candidate:", error);
        });
      }
    };
    const callData = (await getDoc(callDoc)).data();
    await pc.current.setRemoteDescription(
      new RTCSessionDescription(callData.offer)
    );
    const answerDescription = await pc.current.createAnswer();
    await pc.current.setLocalDescription(answerDescription);
    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await updateDoc(callDoc, { answer, status: "answer" });
    onSnapshot(offerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.current.addIceCandidate(candidate).catch((error) => {
            console.error("Error adding ICE candidate:", error);
          });
        }
      });
    });
  } catch (error) {
    console.error("Error handling incoming call:", error);
  }
};

export const createCall = async (uuid, pc, currentUser, user, navigation) => {
  // Create a sample document in a separate collection for testing
  console.log("Creating call with UUID:", uuid);
  await setDoc(doc(FIREBASE_DB, "testCalls", uuid), {
    callId: uuid,
    status: CALL_STATUS.ACCEPTED,
    createdAt: Date.now(),
  });
  console.log("Call document created in testCalls collection.");
  const callDoc = doc(collection(FIREBASE_DB, "calls"), uuid);
  const offerCandidates = collection(callDoc, "offerCandidates");
  const answerCandidates = collection(callDoc, "answerCandidates");
  console.log("Call document created in calls collection.");
  await setDoc(callDoc, {
    caller: currentUser.uid,
    callee: user.uid,
    callerName: currentUser.displayName || "Error lmao",
    status: "pending",
    timestamp: Date.now(),
  });

  const callTimeout = setTimeout(async () => {
    const callSnapshot = await getDoc(callDoc);
    if (
      callSnapshot.data()?.status === CALL_STATUS.PENDING ||
      callSnapshot.data()?.status === CALL_STATUS.OFFER
    ) {
      await updateDoc(callDoc, { status: CALL_STATUS.MISSED });
      alert("Call missed.");
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }
  }, 30000); // Increased timeout duration to 30 seconds

  pc.current.onicecandidate = (event) => {
    if (event.candidate) {
      addDoc(offerCandidates, event.candidate.toJSON()).catch((error) => {
        console.error("Error adding offer candidate:", error);
      });
    }
  };

  const offerDescription = await pc.current.createOffer();
  await pc.current.setLocalDescription(offerDescription);

  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
  };

  await updateDoc(callDoc, { offer, status: "offer" });

  onSnapshot(callDoc, (snapshot) => {
    const data = snapshot.data();
    if (data?.status === CALL_STATUS.ANSWER) {
      if (!pc.current.currentRemoteDescription && data.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.current.setRemoteDescription(answerDescription);
      }
    } else if (data?.status === CALL_STATUS.REJECTED) {
      clearTimeout(callTimeout);
      alert("Call rejected.");
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } else if (data?.status === CALL_STATUS.MISSED) {
      clearTimeout(callTimeout);
      alert("Call missed.");
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } else if (
      data.status === CALL_STATUS.ACCEPTED ||
      data.status === CALL_STATUS.ANSWER
    ) {
    } else if (data.status === CALL_STATUS.FINISHED) {
      alert("Call finished.");
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }
  });

  onSnapshot(answerCandidates, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const candidate = new RTCIceCandidate(change.doc.data());
        pc.current.addIceCandidate(candidate).catch((error) => {
          console.error("Error adding ICE candidate:", error);
        });
      }
    });
  });

  return callDoc.id;
};

export const hangUp = async (
  pc,
  localStream,
  remoteStream,
  setLocalStream,
  setRemoteStream,
  callId,
  navigation
) => {
  const callDoc = doc(collection(FIREBASE_DB, "calls"), callId);
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
  }
  if (remoteStream) {
    remoteStream.getTracks().forEach((track) => track.stop());
  }
  if (pc.current) {
    pc.current.close();
  }
  await updateDoc(callDoc, { status: CALL_STATUS.FINISHED });
  setLocalStream(null);
  setRemoteStream(null);
  // navigation.popToTop();
  navigation.reset({
    index: 0,
    routes: [{ name: "Home" }],
  });
};
