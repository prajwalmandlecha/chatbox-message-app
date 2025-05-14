import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useState } from "react";
import ActionButton from "../components/ActionButton";
import { SignUpUtil } from "../utils/auth";
import LoginSignupNavigationButton from "../components/LoginSignupNavigationButton ";

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const signUp = async () => {
    await SignUpUtil({ name, email, password, setLoading });
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={setName}
          value={name}
          placeholderTextColor={"white"}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          placeholderTextColor={"white"}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry={true}
          placeholderTextColor={"white"}
        />
        {loading ? (
          <ActivityIndicator size="large" color={"red"} />
        ) : (
          <ActionButton title="Sign Up" handleAction={signUp} />
        )}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.switch}
        >
          <Text style={styles.switchText}>Already have an account? Login</Text>
        </TouchableOpacity>
        <LoginSignupNavigationButton
          text="Already have an account? Login"
          onPressAction={() => navigation.goBack()}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 32,
    backgroundColor: "black",
  },
  title: {
    fontSize: 45,
    textAlign: "center",
    color: "white",
    marginBottom: "30",
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
  },
});

export default SignUp;
