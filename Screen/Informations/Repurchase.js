import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import React from "react";

const Repurchase = () => {
  return (
    <View  style={styles.container}>
        <View style={styles.itemcontainer}
        >
          <Image
        style={{ width: 30, height: 30, marginRight: 23 }}
        source={{ uri: "https://iili.io/JdjjLmv.png" }}
      />
      <Text style={{ fontSize: 25 }}>Mua lại</Text>
        </View>
      <View>
        <Text style={{ fontSize: 20, color: "red", marginLeft: 10 }}>
           bn làm ảnh ở đây và nhớ tạo rồi import vào nhé!
        </Text>
      </View>
    </View>
  );
};

export default Repurchase;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEE8E8",
    paddingVertical: 10,
    width: "100%",
    height: 100,
    backgroundColor: "#fff",
    evation: 5,
    marginTop: 5,
  },
  itemcontainer:{
    flexDirection: "row",
    paddingHorizontal: 5,
    borderBottomWidth: 0.1,
  }
})
