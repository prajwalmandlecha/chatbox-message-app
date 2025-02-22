import InCallManager from "react-native-incall-manager";

export const startIncomingCall = () => {
  InCallManager.start({ media: "audio" });
  InCallManager.startRingtone("_BUNDLE_");
  InCallManager.setKeepScreenOn(true);
  InCallManager.setForceSpeakerphoneOn(true);
};

export const startOutgoingCall = () => {
  InCallManager.start({ media: "audio", ringback: "_BUNDLE_", auto: true });
  InCallManager.setKeepScreenOn(true);
  InCallManager.setForceSpeakerphoneOn(true);
};

export const startVideoCall = () => {
  InCallManager.start({ media: "video" });
  InCallManager.setKeepScreenOn(true);
  InCallManager.setForceSpeakerphoneOn(true);
};

export const stopAudio = () => {
  InCallManager.stopRingtone();
  InCallManager.stopRingback();
  InCallManager.stop();
  InCallManager.setKeepScreenOn(false);
};

export const toggleSpeaker = (enabled) => {
  InCallManager.setForceSpeakerphoneOn(enabled);
};
