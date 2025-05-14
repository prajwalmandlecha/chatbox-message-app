import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./src/screens/HomeScreen";
import SignUp from "./src/screens/SignUpScreen";
import Login from "./src/screens/LoginScreen";
import ChatScreen from "./src/screens/ChatScreen";
import subscribeToAuthState from "./src/hooks/subscribeToAuthState.js";
import CallScreen from "./src/screens/CallScreen";
import IncomingCallScreen from "./src/screens/IncomingCallScreen.js";
import OutgoingCallScreen from "./src/screens/OutgoingCallScreen.js";
import CallScreenMain from "./src/screens/CallScreenMain.js";

const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="Signup" component={SignUp} />
  </AuthStack.Navigator>
);

const AppNavigator = () => (
  <AppStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "#252d3a" },
      headerTitleStyle: {
        color: "white",
      },
    }}
  >
    <AppStack.Screen name="Home" component={Home} />
    <AppStack.Screen name="Conversation" component={ChatScreen} />
    <AppStack.Group screenOptions={{ headerShown: false }}>
      {/* <AppStack.Screen name="CallScreen" component={CallScreen} /> */}
      <AppStack.Screen name="IncomingCall" component={IncomingCallScreen} />
      {/* <AppStack.Screen
        name="OutgoingCallScreen"
        component={OutgoingCallScreen}
      /> */}
      <AppStack.Screen name="CallScreenMain" component={CallScreenMain} />
    </AppStack.Group>
  </AppStack.Navigator>
);

export default function App() {
  const user = subscribeToAuthState();
  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
