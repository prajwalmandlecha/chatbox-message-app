import { View, ImageBackground } from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../services/firebase";
import { GiftedChat } from "react-native-gifted-chat";
import { signOutHeader } from "../hooks/signOutHeader";
import SendIcon from "../components/SendIcon";
import chatNavigationHeader from "../hooks/chatNavigationHeader";
import CustomInputToolbar from "../components/CustomInputToolbar";
import subscribeToMessages from "../hooks/subscribeToMessages";
import { createOnSend } from "../utils/messageUtils";

const ChatScreen = ({ navigation, route }) => {
  const { user } = route.params;
  const [messages, setMessages] = useState([]);
  const currentUser = FIREBASE_AUTH.currentUser;
  const conversationId = [currentUser.uid, user.uid].sort().join("_");

  signOutHeader({ navigation });

  chatNavigationHeader({ navigation, user });

  subscribeToMessages({ conversationId, setMessages });

  const handleSend = createOnSend(
    currentUser,
    user,
    conversationId,
    setMessages
  );

  const renderSend = (props) => {
    return <SendIcon {...props} />;
  };

  const renderInputToolbar = (props) => {
    return <CustomInputToolbar {...props} />;
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../background.jpg")}
        style={{ flex: 1 }}
      >
        <GiftedChat
          messages={messages}
          onSend={(messages) => handleSend(messages)}
          showAvatarForEveryMessage={false}
          user={{
            _id: currentUser.uid,
            name: currentUser.displayName || currentUser.email,
          }}
          messagesContainerStyle={{
            backgroundColor: "transparent",
          }}
          textInputStyle={{
            backgroundColor: "#131b28",
          }}
          renderInputToolbar={renderInputToolbar}
          renderSend={renderSend}
          renderUsernameOnMessage={false}
        />
      </ImageBackground>
    </View>
  );
};

export default ChatScreen;
