import { useLayoutEffect } from "react";
import { TouchableOpacity } from "react-native";
import {Ionicons} from "@expo/vector-icons";

const chatNavigationHeader = ({navigation, user}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: user.name || user.email,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginHorizontal: 10, marginTop: 2 }}
        >
          <Ionicons name="arrow-back" size={25} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, user]);
};

export default chatNavigationHeader;
