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
  Image,
} from "react-native";
import ProductInCart from "../../components/Cart/ProductInCart";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import useAuth from "../../Services/auth.services";
import Swipelist from "react-native-swipeable-list-view";
import { AuthStatus } from "../../Services/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { soluonggiohang } from "../../Services/Redux/action/Actions";
export default function Cart({ navigation }) {
  const [data, setData] = useState([]);
  const { GetCart, getTotalCart } = useAuth();
  const { state } = AuthStatus();
  const dispatchRedux = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Giỏ hàng của bạn",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ }}
        >
         
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const fetchData = useCallback(async () => {
    try {
      const result = await GetCart();
      console.log("Result:", result);

      // Kiểm tra xem có cartItem không
      if (
        result &&
        result.length > 0 &&
        result[0].CartItems &&
        result[0].CartItems.length > 0
      ) {
        // Có cartItem
        setData(result);
      } else {
        // Không có cartItem
        console.log("Không có cartItem trong dữ liệu.");
        setData([]);
        dispatchRedux(soluonggiohang(-1));
      }
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
      console.error("Error fetching data3:", error);
    }
  };
  const handlePressOrder = (item) => {
    console.log("item", item);
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
      {data && data.length > 0 ? (
        data.map((item, index) => (
          <ProductInCart
            key={index}
            dataCart={item.CartItems}
            Cart_id={item.cart_id}
            navigation={navigation}
            handlePress={handlePressDetailProduct}
            handleOrder={handlePressOrder}
          />
        ))
      ) : (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            source={{
              uri: "https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/9bdd8040b334d31946f49e36beaf32db.png",
            }}
            style={{ width: 100, height: 100, marginTop: 100 }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 20,
              color: "rgba(128, 217, 255, 0.8)",
            }}
          >
            Giỏ hàng của bạn đang trống
          </Text>
        </View>
      )}
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
