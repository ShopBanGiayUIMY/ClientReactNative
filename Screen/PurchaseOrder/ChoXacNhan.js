import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from "react-native";
import useAuth from "../../Services/auth.services";
import { useNavigation } from "@react-navigation/native";

const ChoXacNhan = () => {
  const { CheckStatusOrder, CancelOrder } = useAuth();
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();

  const fetchOrders = async () => {
    const res = await CheckStatusOrder("PENDING");
    setOrders(res); // Assuming 'res' is the array of orders
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  const HuydonHang = async (order_id) => {
    try {
      // If the cancellation is successful, show an alert for payment method selection
      Alert.alert("Trạng thái", "Bạn có muốn huỷ đơn hàng này không?", [
        {
          text: "Không",
          onPress: () => {},
        },
        {
          text: "Có",
          onPress: async () => {
            const res = await CancelOrder(order_id);
            if (res) {
              console.log("res", res);
              fetchOrders();
              ToastAndroid.show("Xác nhận thành công", ToastAndroid.SHORT);
            } else {
              ToastAndroid.show("Xác nhận thất bại", ToastAndroid.SHORT);
            }
          },
        },
      ]);
    } catch (error) {
      console.error("Cancellation failed:", error);
    }
  };
  const ThanhToanDonVnpay = async (order_id, totalAmount) => {
    try {
      // If the cancellation is successful, show an alert for payment method selection
      Alert.alert("Trạng thái", "Bạn có muốn thanh toán đơn hàng này không?", [
        {
          text: "Không",
          onPress: () => {},
        },
        {
          text: "Có",
          onPress: async () => {
            navigation.navigate("ThanhToanLaiVnpay", {
              order_id: order_id,
              totalPrice: totalAmount,
            });
          },
        },
      ]);
    } catch (error) {
      console.error("Cancellation failed:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      {item.OrderDetails.map((detail, index) => (
        <View key={index} style={styles.productContainer}>
          <Image
            source={{ uri: detail.ProductDetail.Product.thumbnail }}
            style={styles.productImage}
          />
          <View style={styles.productDetails}>
            <Text style={styles.productTitle}>
              {detail.ProductDetail.Product.product_name}
            </Text>
            <Text style={styles.productPriceSale}>
              ₫{parseFloat(detail.price).toLocaleString("vi-VN")}
            </Text>
            <Text style={styles.productQuantity}>x{detail.quantity}</Text>
          </View>
        </View>
      ))}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Tổng thanh toán: ₫
          {parseFloat(item.totalAmount).toLocaleString("vi-VN")}
        </Text>
        <View>
          <Text style={styles.totalText}>
            Phương thức thanh toán:{" "}
            <Text style={styles.phuongthucthanhtoan}>
              {item.payment_method_id === 1
                ? "COD"
                : item.payment_method_id === 2
                  ? "VNPAY"
                  : ""}
            </Text>
          </Text>
          <Text style={styles.totalText}>
            Trạng thái thanh toán:{" "}
            <Text style={styles.trangthaithanhtoan}>
              {item.paymentStatus === "UNPAID" ? (
                <Text style={{ color: "red" }}>Chưa thanh toán</Text>
              ) : (
                <Text color="rgba(0, 255, 61, 0.8)">Đã thanh toán</Text>
              )}
            </Text>
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.processingButton}>
          <Text style={styles.processingButtonText}>
            {item.OrderStatus.name}
          </Text>
        </View>

        {item.payment_method_id === 2 &&
          (item.paymentStatus === "UNPAID" ? (
            <View style={styles.processingButton}>
              <TouchableOpacity
                style={styles.processingButtonpaymentStatus}
                onPress={() =>
                  ThanhToanDonVnpay(item.order_id, item.totalAmount)
                }
              >
                <Text style={{ color: "red" }}>Thanh Toán</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.processingButton}>
              <Text style={styles.processingButtonpaymentStatus}>
                <Text style={{ color: "rgba(4, 229, 58, 0.8)" }}>
                  Đã thanh toán
                </Text>
              </Text>
            </View>
          ))}

        <View style={styles.processingButtonHuy}>
          <TouchableOpacity
            style={styles.processingButtonText}
            onPress={() => HuydonHang(item.order_id)}
          >
            <Text style={styles.processingButtonText}>Hủy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={orders}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    width: "100%",
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontWeight: "bold",
  },
  productPriceSale: {
    color: "red",
  },
  productQuantity: {
    marginTop: 5,
  },
  totalContainer: {
    paddingVertical: 10,
  },
  totalText: {
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",

    width: "100%",
  },
  processingButton: {
    borderRadius: 4,

    alignSelf: "flex-end",
    paddingHorizontal: 10,
    backgroundColor: "rgba(219, 220, 221, 0.8)",
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    height: 40,
  },
  processingButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  phuongthucthanhtoan: {
    fontWeight: "bold",
    color: "red",
  },
  processingButtonpaymentStatus: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  processingButtonHuy: {
    borderRadius: 4,
    alignSelf: "flex-end",
    paddingHorizontal: 10,
    backgroundColor: "rgba(255, 24, 0, 0.8)",
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    height: 40,
  },
});

export default ChoXacNhan;
