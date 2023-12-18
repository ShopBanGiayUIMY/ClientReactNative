import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import ListProduct from "../Products/ListProduct";
import Notification from "../Notification/Notification";

export default function Home({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);

  // Giả lập thời gian "loading" bằng cách sử dụng setTimeout
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Sau khoảng thời gian "loading", tắt trạng thái isLoading
    }, 1500); // Giả lập "loading" trong 2 giây, bạn có thể điều chỉnh thời gian tùy ý
  }, []);

  return (
    <View style={styles.container}>
      <Notification />
      <StatusBar backgroundColor="#00BCD4" barStyle="light-content" />
      {isLoading ? (
        // Hiển thị phần tử "loading" khi isLoading là true
        <ActivityIndicator size="large" color="#00BCD4" />
      ) : (
        // Hiển thị danh sách sản phẩm khi isLoading là false
        <ListProduct navigation={navigation} />
      )}
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
