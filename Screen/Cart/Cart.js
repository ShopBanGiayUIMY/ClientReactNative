import React, {
  useEffect,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ProductInCart from "../../components/Cart/ProductInCart";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import useAuth from "../../Services/auth.services";
import Swipelist from "react-native-swipeable-list-view";
import { AuthStatus } from "../../Services/AuthContext";
import { useDispatch, useSelector } from "react-redux";
export default function Cart({ navigation }) {
  const [data, setData] = useState([]);
  const { GetCart } = useAuth();
  const { state } = AuthStatus();
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
  const fetchDataWithDelay = async () => {
    try {
      // Assuming fetchData is an asynchronous function
      await fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handlePressOrder = (item) => {
   console.log("item",item);
  };

  useEffect(() => {
    if (state.isLoggedIn) {
      const focusListener = navigation.addListener("focus", () => {
        const timeoutId = setTimeout(fetchDataWithDelay, 500);

        // Clear the timeout on component unmount
        return () => clearTimeout(timeoutId);
      });
    } else if (!state.isLoggedIn) {
      navigation.replace("Login");
    }
  }, [navigation]);

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
            handleOrder={handlePressOrder}
          />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(234, 235, 236, 0.72)",
    marginHorizontal: 10,
  },
});
