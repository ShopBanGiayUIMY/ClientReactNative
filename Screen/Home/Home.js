import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ListProduct from "../Products/ListProduct";
export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <ListProduct navigation={navigation} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(234, 235, 236, 0.72)",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
