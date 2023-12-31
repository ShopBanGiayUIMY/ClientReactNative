import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import useAuth from "../../Services/auth.services";

const DaHuy = () => {
  const { CheckStatusOrder } = useAuth();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await CheckStatusOrder("CANCELED");
    setOrders(res); 
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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
      <View style={styles.processingButton}>
        <Text style={styles.processingButtonText}>
          {item.OrderStatus.name}
        </Text>
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
    backgroundColor: "rgba(219, 220, 221, 0.8)",
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

export default DaHuy;
