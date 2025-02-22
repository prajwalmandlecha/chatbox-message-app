import { View, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import { getOtherUsers } from "../hooks/getOtherUsers";
import UserItem from "./UserItem";
import { v4 as uuidv4 } from "uuid";
import { doc, collection, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../services/firebase";
import { startOutgoingCall } from "../services/inCallManagerService";

const UsersList = ({ navigation }) => {
  const [loading, users] = getOtherUsers();

  const handleUserPress = (user) => {
    navigation.navigate("Conversation", { user });
  };

  const onCallPress = async (user) => {
    const uuid = uuidv4();
    navigation.navigate("CallScreenMain", { user, type: "caller", uuid: uuid });
    // const callDoc = doc(collection(FIREBASE_DB, "calls"), uuid);
    // await updateDoc(callDoc, { status: "calling" });
    // navigation.navigate("OutgoingCallScreen", {
    //   user,
    //   type: "caller",
    //   uuid: uuid,
    // });
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <UserItem
            user={item}
            onPress={handleUserPress}
            onCallPress={onCallPress}
          />
        )}
      />
    </View>
  );
};

export default UsersList;
