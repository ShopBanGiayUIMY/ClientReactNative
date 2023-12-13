import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { PulseIndicator } from "react-native-indicators";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const VerifyVnPayPayMent = ({ props }) => {
  const navigation = useNavigation();
  const [showIndicator, setShowIndicator] = useState(true);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: true, 
      headerStyle: {
        backgroundColor: "transparent", 
      },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 5, marginRight: 10 }}
        >
          <FontAwesome
            name="arrow-left"
            size={24}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  //   useEffect(() => {
  //     // Set a timer for 2 seconds
  //     const timer = setTimeout(() => {
  //       setShowIndicator(false);
  //     }, 5000);

  //     // Cleanup the timer when the component is unmounted
  //     return () => clearTimeout(timer);
  //   }, []);

  return (
    <View style={{ alignItems: "center" }}>
      {showIndicator && <PulseIndicator color="blue" size={50} />}
    </View>
  );
};
const styles = StyleSheet.create({
  icon: {
    marginLeft: 5,
  },
});

export default VerifyVnPayPayMent;
