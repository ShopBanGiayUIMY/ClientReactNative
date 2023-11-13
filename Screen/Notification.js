import React from "react";
import { View, Text, StyleSheet } from "react-native";

import useAuth from "../Services/auth.services";
export default function Notification() {
  const { GetCart } = useAuth();
  const fetchCartData = async () => {
    const cart = await GetCart();
    const parsedData = JSON.parse(cart); 
    parsedData.forEach((item) => {
      console.log("Cart ID:", item.cart_id);
      console.log("User ID:", item.user_id);
      item.CartItems.forEach((cartItem) => {
        console.log("Item ID:", cartItem.item_id);
        console.log("Quantity:", cartItem.quantity);
      });
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
