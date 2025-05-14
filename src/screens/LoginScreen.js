import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import ActionButton from "../components/ActionButton";
import { SignInUtil } from "../utils/auth";
import LoginSignupNavigationButton from "../components/LoginSignupNavigationButton ";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    await SignInUtil({ email, password, setLoading });
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.icon}>
          <Entypo name="emoji-happy" size={100} color="white" />
        </View>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor={"white"}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry
          placeholderTextColor={"white"}
        />
        {loading ? (
          <ActivityIndicator size="large" color={"red"} />
        ) : (
          <ActionButton title="Login" handleAction={signIn} />
        )}
        <LoginSignupNavigationButton
          text="Don't have an account? Sign up"
          onPressAction={() => navigation.navigate("Signup")}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000000",
    width: "100%",
    padding: 20,
  },
  icon: {
    alignItems: "center",
    marginBottom: "20",
  },
  title: {
    fontSize: 45,
    textAlign: "center",
    color: "white",
    marginBottom: 30,
  },
  input: {
    height: 60,
    borderColor: "#ddd",
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderRadius: 8,
    color: "white",
  },
});

export default Login;
