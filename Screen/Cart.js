import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  RefreshControl,
  Image,
  FlatList,
} from "react-native";
import loading from "../images/loading.gif";
import ProductInCart from "../components/Cart/ProductInCart";
import { AuthStatus } from "../Services/AuthContext";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
export default function Category({ navigation }) {
  return (
    <View style={style.container}>
      <ProductInCart />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A9CDEE",
  }
});
