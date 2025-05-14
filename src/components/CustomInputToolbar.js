import { InputToolbar } from "react-native-gifted-chat";
import { StyleSheet } from "react-native";

const CustomInputToolbar = (props) => {
  return (<InputToolbar
    {...props}
    textInputStyle={styles.textInput}
    containerStyle={styles.container}
    primaryStyle={styles.primary}
  />);
};

const styles = StyleSheet.create({
  textInput: {
    color: "white",
  },
  container: {
    backgroundColor: "#212d3b",
    borderTopColor: "#212d3b",
  },
  primary: { alignItems: "center" },
});

export default CustomInputToolbar;
