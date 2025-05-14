// import axios from "axios";
// import { Platform } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { FIREBASE_AUTH, FIREBASE_DB } from "../services/firebase";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import * as Notifications from "expo-notifications";
// import * as Device from "expo-device";
// import Constants from "expo-constants";

// export const configureNotifications = async () => {
//   Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//       shouldShowAlert: true,
//       shouldPlaySound: true,
//       shouldSetBadge: false,
//       priority: Notifications.AndroidNotificationPriority.MAX,
//     }),
//   });
// };

// export const registerForPushNotificationsAsync = async () => {
//   let token;

//   if (!Device.isDevice) {
//     console.log("Push notifications require a physical device");
//     return null;
//   }

//   try {
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;

//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }

//     if (finalStatus !== "granted") {
//       console.log("Permission not granted for notifications");
//       return null;
//     }

//     token = (
//       await Notifications.getExpoPushTokenAsync({
//         projectId: Constants.expoConfig.extra?.eas?.projectId,
//       })
//     ).data;
//     console.log("Expo Push Token:", token);

//     await AsyncStorage.setItem("expoPushToken", token);

//     if (FIREBASE_AUTH.currentUser) {
//       const userRef = doc(FIREBASE_DB, "users", FIREBASE_AUTH.currentUser.uid);
//       await updateDoc(userRef, {
//         expoPushToken: token,
//         platform: Platform.OS,
//         lastTokenUpdate: new Date().toISOString(),
//       });
//     }

//     if (Platform.OS === "android") {
//       await Notifications.setNotificationChannelAsync("incoming_calls", {
//         name: "Incoming Calls",
//         importance: Notifications.AndroidImportance.MAX,
//         vibrationPattern: [0, 250, 250, 250],
//         lightColor: "#FF231F7C",
//         sound: "default",
//         enableVibrate: true,
//         showBadge: true,
//       });
//     }

//     return token;
//   } catch (error) {
//     console.error("Error getting a push token", error);
//   }
// };
