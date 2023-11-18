import React from "react";
import { View, Text, StyleSheet } from "react-native";

import useAuth from "../Services/auth.services";
export default function Notification() {
  const { GetCart } = useAuth();
  const fetchCartData =() => {
   GetCart()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  fetchCartData();
  return (
    <View style={style.container}>
      <Text>This is screen Notification</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
