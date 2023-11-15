import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Checkbox from "expo-checkbox";

const ProductInCart = (props) => {
  const [checkBox, setCheckBox] = useState(false);
  const { dataProd, handlePress } = props;
  const fun_handlePress = () => {
    handlePress ? handlePress(dataProd) : null;
  };

  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(dataProd.product_price);

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleQuantityChange = () => {
    // You can add logic here if needed
  };

  const hanldeRemoveProduct = () => {
    alert("Xóa sản phẩm");
    // You can add logic to remove the product from the cart
  };
  //


  return (
    <View style={styles.container}>
      <View style={styles.productContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: dataProd.thumbnail }}
            style={styles.productImage}
          />
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{dataProd.product_name}</Text>
          <Text style={styles.productDescription}>
            {dataProd.product_description}
          </Text>
          <Text style={styles.productPrice}>{dataProd.product_price} $</Text>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        <Pressable style={styles.quantityBtn} onPress={handleDecrease}>
          <Text>-</Text>
        </Pressable>
        <TextInput
          style={styles.quantityText}
          value={count.toString()}
          onChangeText={handleQuantityChange}
          keyboardType="numeric"
        />
        <Pressable style={styles.quantityBtn} onPress={handleIncrease}>
          <Text>+</Text>
        </Pressable>
      </View>
      <Pressable style={styles.removeIcon} onPress={hanldeRemoveProduct}>
        <FontAwesomeIcon icon={faTrash} size={20} color="red" />
      </Pressable>
      <View>
        <Checkbox
          style={styles.checkbox}
          value={checkBox}
          onValueChange={() => setCheckBox(!checkBox)}
          color={checkBox ? "#4630EB" : undefined}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  productContainer: {
    flexDirection: "row",
    flex: 1,
  },
  imageContainer: {
    marginRight: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productDescription: {
    color: "#888",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityBtn: {
    backgroundColor: "#eee",
    padding: 5,
    borderRadius: 5,
  },
  quantityText: {
    paddingHorizontal: 10,
  },
  removeIcon: {
    marginLeft: 10,
  },
});

export default ProductInCart;
