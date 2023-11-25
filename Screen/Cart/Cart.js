import React, { useEffect, useState, useLayoutEffect,useCallback } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import ProductInCart from "../../components/Cart/ProductInCart";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import useAuth from "../../Services/auth.services";
import Swipelist from "react-native-swipeable-list-view";
import { useIsFocused } from "@react-navigation/native";
import { AuthStatus } from "../../Services/AuthContext";

export default function Cart({ navigation, props }) {
  const [data, setData] = useState([]);
  const { GetCart } = useAuth();
  const { state } = AuthStatus();
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Giỏ hàng của tôi",
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

  const fetchData = useCallback(async () => {
    try {
      const result = await GetCart();
      setData(result);
    } catch (error) {
      console.log("Error cart:", error);
    }
  }, [GetCart]);

  const handlePressDetailProduct = (item) => {
    fetchData();
  };

  useEffect(() => {
    let time;

    // Kiểm tra nếu màn hình đang được focus và đã đăng nhập thì mới fetch dữ liệu
    if (isFocused && state.isLoggedIn) {
      time = setTimeout(() => {
        fetchData();
      }, 1500);
    } else if (!state.isLoggedIn) {
      navigation.replace("Login");
    }
    return () => {
      clearTimeout(time);
    };
  }, [navigation, isFocused]);

  return (
    <View style={styles.container}>
      {data &&
        data.length > 0 &&
        data.map((item, index) => (
          <ProductInCart
            key={index}
            dataCart={item.CartItems}
            Cart_id={item.cart_id}
            navigation={navigation}
            handlePress={handlePressDetailProduct}
          />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(234, 235, 236, 0.72)",
  },
});
