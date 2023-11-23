import React, { useEffect, useState, useLayoutEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import ProductInCart from "../../components/Cart/ProductInCart";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import useAuth from "../../Services/auth.services";
import Swipelist from "react-native-swipeable-list-view";


export default function Cart({ navigation, props }) {
  const [data, setData] = useState([]);
  const { GetCart } = useAuth();
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
  }, []);
  const fetchData = async () => {
    try {
      GetCart().then((result) => {
        setData(result);
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const handlePresDetailProduct = (item) => {
    fetchData();
    alert("Đã thêm vào giỏ hàng");
  };
  useEffect(() => {
    fetchData();
    // state.isLoggedIn ? fetchData() : navigation.navigate("Login");
  }, [navigation]);

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <ProductInCart
          key={index}
          dataCart={item.CartItems}
          Cart_id={item.cart_id}
          navigation={navigation}
          handlePress={handlePresDetailProduct}
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
