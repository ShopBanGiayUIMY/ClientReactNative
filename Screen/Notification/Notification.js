import { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";
import useAuth from "../../Services/auth.services";
import { AuthStatus } from "../../Services/AuthContext";


const playSound = async () => {
  try {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/Notification.mp3"),
      { shouldPlay: true }
    );

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        sound.unloadAsync();
      }
    });

    return sound;
  } catch (e) {
    console.log(`cannot play the sound file`, e);
  }
};
const startSound = async () => {
  soundObject = await playSound();
};
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken, title, body, data) {
  const message = {
    to: expoPushToken,
    sound: Platform.OS === "android" ? null : "default",
    title: title,
    body: body,
    data: data || {},
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
      sound: "default",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });

  
      console.log(token);
    
  
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token.data;
}

export default function Notification(props) {
  const { title, body, data } = props;
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const navigation = useNavigation();
  const {UpdateNotifyToken}=useAuth();
  const {state}=AuthStatus();
  if (state.isLoggedIn){
      UpdateNotifyToken(expoPushToken).then((res)=>{
    console.log(res);
  })
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        startSound();
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("response");
        const { data } = response.notification.request.content;
        if (data.type === "ORDERSTATUS") {
          switch (data.status) {
            case "PROCESSING":
              navigation.navigate("MainTabPurchase", { initialTabIndex: 0 });
              break;
            case "PENDING":
              navigation.navigate("MainTabPurchase", { initialTabIndex: 1 });

              break;
            case "SHIPPING":
              navigation.navigate("MainTabPurchase", { initialTabIndex: 2 });
              break;
            case "SHIPPED":
              navigation.navigate("MainTabPurchase", { initialTabIndex: 3 });

              break;
            case "DELIVERED":
              navigation.navigate("MainTabPurchase", { initialTabIndex: 4 });
              break;
            case "CANCELED":
              navigation.navigate("MainTabPurchase", { initialTabIndex: 5 });
              break;
            // ... handle other statuses ...
            default:
              // Default case if status is unknown
              break;
          }
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  useEffect(() => {
    if (expoPushToken && title) {
      sendPushNotification(expoPushToken, title, body, data);
    }
  }, [expoPushToken, title, body, data]);
  return null;
}
