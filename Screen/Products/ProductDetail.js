import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/Header";

const ProductDetail = ({ route }) => {
  const { product } = route.params;
  const [expanded, setExpanded] = useState(false); // Trạng thái cho việc mở rộng văn bản

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.nameproduct}</Text>
          <Text style={styles.productPrice}>{product.price} đ</Text>
          <Text style={styles.productDescription}>
            {expanded ? product.describe : product.describe.slice(0, 40)}
          </Text>
          {product.describe.length > 40 && (
            <TouchableOpacity onPress={toggleExpand}>
              <Text style={styles.toggleButton}>
                {expanded ? "Thu gọn" : "Xem thêm"}
              </Text>
            </TouchableOpacity>
          )}
          <View style={styles.productRow}>
            <Text style={styles.productRating}>Rating: {product.rating}</Text>
            <Text style={styles.productSales}>Sales: {product.sales}</Text>
          </View>
          <View style={styles.productRow}>
            <Text style={styles.productColor}>Color: {product.color}</Text>
            <Text style={styles.productDiscount}>
              Discount: {product.discount}%
            </Text>
          </View>
          <Text style={styles.productQuantity}>
            Quantity: {product.quantity}
          </Text>
          <Text style={styles.productSellNumber}>
            Sell Number: {product.sellNumber}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  productImage: {
    width: "100%",
    height: 350, // Increase image height for a more prominent product image
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 24, // Increase font size for the price
    color: "red",
    marginBottom: 16, // Increase marginBottom for spacing
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 20, // Increase marginBottom for spacing
    color: "gray", // Use a lighter color for description text
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10, // Increase marginBottom for spacing
  },
  productRating: {
    fontSize: 18, // Increase font size for rating
    color: "orange", // Use an accent color for rating
  },
  productSales: {
    fontSize: 18, // Increase font size for sales
    color: "green", // Use an accent color for sales
  },
  productColor: {
    fontSize: 18, // Increase font size for color
  },
  productDiscount: {
    fontSize: 18, // Increase font size for discount
    color: "red", // Use a different color for discount
  },
  productQuantity: {
    fontSize: 18, // Increase font size for quantity
    marginBottom: 10, // Increase marginBottom for spacing
  },
  productSellNumber: {
    fontSize: 18, // Increase font size for sell number
  },
});

export default ProductDetail;
