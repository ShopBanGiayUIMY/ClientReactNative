import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  ImageBackground,
  Alert,
} from "react-native";
import SplashScreen from "react-native-splash-screen";
import { Audio } from "expo-av";
import { BackHandler } from "react-native";

const SplashStore = ({ navigation }) => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Ôi !!!", "Bạn có muốn thoát khỏi ứng dụng không !", [
        {
          text: "Không",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Có", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/audio/JingleBells.mp3"),
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

  useEffect(() => {
    let soundObject;

    const startSound = async () => {
      soundObject = await playSound();
    };

    // startSound();

    const timer = setTimeout(() => {
      navigation.replace("BottomTabNavigation");
    }, 4000);

    return () => {
      clearTimeout(timer);
      soundObject?.unloadAsync();
    };
  }, []);

  return (
    <ImageBackground
      style={styles.container}
      source={{ uri: "https://iili.io/JuzSn2f.png" }}
    >
      <Image
        source={{
          uri: "https://iili.io/JuzZvLv.gif",
        }}
        style={styles.Icon}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  Icon: {
    width: "100%",
    height: "100%",
  },
  Text1: {
    position: "absolute",
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    alignItems: "center",
    top: "57%",
  },
  Text2: {
    position: "absolute",
    fontSize: 30,
    fontWeight: "bold",
    color: "rgba(4, 3, 26, 0.8)",
    alignItems: "center",
    top: "57%",
  },
});

export default SplashStore;
