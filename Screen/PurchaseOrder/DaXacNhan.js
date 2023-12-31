import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import useAuth from "../../Services/auth.services";
import { useNavigation } from "@react-navigation/native";

const DaXacNhan = () => {
  const { CheckStatusOrder } = useAuth();
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();

  const fetchOrders = async () => {
    const res = await CheckStatusOrder("DELIVERED");
    setOrders(res);
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  const DanhGiaDonHang = async (item) => {
    console.log("order_id", item);
    navigation.navigate("DanhGiaProduct", { data: item });
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
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.processingButton}
          onPress={() => DanhGiaDonHang(item)}
        >
          <Text style={styles.processingButtonText}>Đánh giá ngay</Text>
        </TouchableOpacity>
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
  processingButton: {
    borderRadius: 4,
    marginLeft: 10,
    marginTop: 5,
    alignSelf: "flex-end",
    paddingHorizontal: 10,
    backgroundColor: "#ee4d2d",
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  processingButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default DaXacNhan;
