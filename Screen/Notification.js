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
        const productDetail = cartItem.ProductDetail;
        const product = productDetail.Product;

        console.log("Product Name:", product.product_name);
        console.log("Product Description:", product.product_description);
        console.log("Product Price:", product.product_price);
        // Add any other product details you want to retrieve
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
