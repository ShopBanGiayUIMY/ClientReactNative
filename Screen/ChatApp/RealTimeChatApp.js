import { StyleSheet, Text, View } from "react-native";
import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { GiftedChat } from "react-native-gifted-chat";
import useAuth from "../../Services/auth.services";
import { AuthStatus } from "../../Services/AuthContext";
import { Avatar } from "react-native-elements";

const RealTimeChatApp = ({ navigation }) => {
  const { InfoAuth } = useAuth();
  const { dispatch, state } = AuthStatus();
  const [userImage, setUserImage] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const data = await InfoAuth();
      if (data) {
        dispatch({ type: "USERINFO", payload: data });
        setUserImage(data.image);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [InfoAuth, dispatch]);

  useLayoutEffect(() => {
    try {
      navigation.setOptions({
        headerLeft: () => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {userImage ? (
              <Avatar rounded source={{ uri: userImage }} />
            ) : (
              <Avatar
                rounded
                source={{
                  uri: "https://img4.thuthuatphanmem.vn/uploads/2020/08/27/anh-avatar-zalo-cho-cap-doi-nam_052907578.jpg",
                }}
              />
            )}
            <View style={{ marginLeft: 10 }}>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "black" }}
              >
                {state.userInfo.username}
              </Text>
              <Text style={{ fontSize: 14, color: "gray" }}>
                {state.userInfo.gender}
              </Text>
            </View>
          </View>
        )
      });
    } catch (error) {
      console.error("Error setting navigation options:", error);
    }
  }, [navigation, userImage, state.userInfo]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // GiftedChat setup
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default RealTimeChatApp;

const styles = StyleSheet.create({});
