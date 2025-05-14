import { TouchableOpacity, Text, StyleSheet } from "react-native";

const ActionButton = ({handleAction,title}) => (
  <TouchableOpacity style={styles.button} onPress={handleAction}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default ActionButton;

const styles = StyleSheet.create({
    button: {
        height: 70,
        backgroundColor: "#0098FF",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
      },
      buttonText: {
        color: "white",
        fontSize: 25,
      }
})