import { Send } from "react-native-gifted-chat";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SendIcon = (props) => {
  return (
    <Send {...props}>
      <View style={styles.container}>
        <Ionicons name="send" size={24} color="#68b5eb" />
      </View>
    </Send>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});

export default SendIcon;
