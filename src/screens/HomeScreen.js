import { StyleSheet, View, ActivityIndicator, Button } from "react-native";
import React, { useState, useEffect } from "react";
import UsersList from "../components/UsersList";
import { signOutHeader } from "../hooks/signOutHeader";
import getUserData from "../hooks/getUserData";
import { listenForCalls } from "../services/CallService";

const Home = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // let x = 1;
  // if (x) {
  //   navigation.navigate("OutgoingCallScreen");
  // }

  useEffect(() => {
    let unsubscribe;

    const setupListener = async () => {
      unsubscribe = await listenForCalls(navigation);
    };

    setupListener();

    return () => unsubscribe();
  }, [navigation]);

  signOutHeader({ navigation });

  getUserData({ setUserData, setLoading });

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator style={styles.loading} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <UsersList navigation={navigation} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d2733",
  },
  title: {
    fontSize: 32,
    marginBottom: 32,
    color: "#FFFFFF",
  },
});
