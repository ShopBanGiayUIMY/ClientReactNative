import React, { useEffect } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import SplashScreen from "react-native-splash-screen";

const SplashStore = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("BottomTabNavigation");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://www.internship.edu.vn/wp-content/uploads/363e98fedca7891c88adf55e8e90f992.jpg",
        }}
        style={styles.Icon}
      />
      <Text style={styles.Text1}>
        Sneaker <Text style={styles.Text2}>Store</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
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
