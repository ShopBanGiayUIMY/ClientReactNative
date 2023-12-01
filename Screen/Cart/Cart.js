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
          />
        ))}
      <View style={styles.bottomContainer}>
        <View style={[styles.totalTextContainer, { flex: 1 }]}>
          <Text style={styles.totalText}>
            Tổng thanh toán: <Text style={styles.tongtien}>22000</Text>
            <Text style={styles.kihieutongtien}>đ</Text>
          </Text>
          <Text style={styles.totalText}>
            Số lượng sản phẩm: <Text style={styles.tongtien}>0</Text>
           
          </Text>
        </View>
        <View style={{ justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => navigation.push("ConfirmationOrder")}
            style={styles.paymentButton}
          >
            <Text style={styles.paymentButtonText}>Thanh toán</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(234, 235, 236, 0.72)",
    marginHorizontal: 10,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 55,
    backgroundColor: "#FFE45D",
    borderRadius: 5,
    marginBottom: "20%",
  },
  paymentButton: {
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  paymentButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  totalTextContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
});
