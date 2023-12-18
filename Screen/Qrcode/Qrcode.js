import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated, Easing, Dimensions ,Image} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { PermissionsAndroid, Platform } from "react-native";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/FontAwesome";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const Qrcode = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [animation] = useState(new Animated.Value(0));
  const [scanned, setScanned] = useState(false);
  const handleBarCodeScanned = ({ type, data }) => {
    if (!scanned) {
      setScanned(true);
      alert(`Dữ liệu quét được ${data}`);
    }
  };
  const makeSlideOutTranslation = (translationType, fromValue) => {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * -0.18,
      },
      to: {
        [translationType]: fromValue,
      },
    };
  };

  const requestCameraPermission = async () => {
    try {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Camera permission granted");
          setHasPermission(true);
          startAnimation();
        } else {
          console.log("Camera permission denied");
          setHasPermission(false);
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const animatedStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 200], // Adjust this value based on your animation needs
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      {hasPermission === null ? (
        <Text>Requesting Camera Permission...</Text>
      ) : hasPermission === false ? (
        <Text>No access to camera</Text>
      ) : (
        <>
          <BarCodeScanner
            onBarCodeScanned={
              handleBarCodeScanned
            }
            focusable={true}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            cameraProps={{ autoFocus: "on" }}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.centerBox}>
            <View style={styles.rectangleContainer}>
              <View style={styles.topAndBottomOverlay} />
              <View style={styles.middleContainer}>
                <View style={styles.leftAndRightOverlay} />
                <View style={styles.rectangle}>
                  <Animatable.View
                    style={styles.scanBar}
                    direction="alternate-reverse"
                    iterationCount="infinite"
                    duration={1700}
                    easing="linear"
                    animation={makeSlideOutTranslation(
                      "translateY",
                      SCREEN_WIDTH * -0.54
                    )}
                  />
                </View>
                <View style={styles.leftAndRightOverlay} />
              </View>
              <View style={styles.topAndBottomOverlay} />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const overlayColor = "rgba(0,0,0,0.5)";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rectangleContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "transparent",
  },
  rectangle: {
    height: SCREEN_WIDTH * 0.5,
    width: SCREEN_WIDTH * 0.5,
    borderWidth: SCREEN_WIDTH * 0.005,
    borderColor: "rgba(35, 35, 35, 0.8)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    position: "relative",
    
    
  },
  topAndBottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
  },
  leftAndRightOverlay: {
    flex: 1,
    width: SCREEN_WIDTH * 0.25,
    backgroundColor: overlayColor,
  },
  middleContainer: {
    flexDirection: "row",
    flex: 3,
  },
  scanBar: {
    width: SCREEN_WIDTH * 0.46,
    height: SCREEN_WIDTH * 0.005,
    backgroundColor: "#22ff00",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: SCREEN_WIDTH * 0.6,
    shadowColor: "rgba(0, 157, 255, 1)",
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 30,
  
  },
  centerBox: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  horizontalBar: {
    position: "absolute",
    width: "100%",
    height: 2,
    top: 0,
  },
});

export default Qrcode;
