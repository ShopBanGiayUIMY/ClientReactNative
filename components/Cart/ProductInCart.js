import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
//   TouchableWithoutFeedback,
//   Dimensions,
//   TouchableOpacity,
  Pressable,
  TextInput,
} from "react-native";
// import Checkbox from "expo-checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ProductInCart = (props) => {
  const { dataProd, handlePress } = props;
  const fun_handlePress = () => {
    handlePress ? handlePress(dataProd) : null;
  };
//   const [isChecked, setChecked] = useState(false);
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
  
  };

  const hanldeRemoveProduct = () => {
    alert("Xóa sản phẩm");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: dataProd.thumbnail }}
          style={styles.productImage}
        />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{dataProd.product_name}</Text>
        <Text style={styles.productPrice}>{totalPrice} $</Text>
        <Text style={styles.productDescription}>
          {dataProd.product_description}
        </Text>
        <View style={styles.quantityContainer}>
          <Pressable onPress={handleDecrease}>
            <Text style={styles.quantityBtn}>-</Text>
          </Pressable>
          <TextInput
            style={styles.quantityText}
            value={count.toString()}
            onChangeText={handleQuantityChange}
            keyboardType="numeric"
          />
          <Pressable onPress={handleIncrease}>
            <Text style={styles.quantityBtn}>+</Text>
          </Pressable>
        </View>
      </View>
      <Pressable style={styles.removeIcon} onPress={hanldeRemoveProduct}>
        <FontAwesomeIcon icon={faTrash} size={20} color="red" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  imageContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
  },
  productImage: {
    width: 80,
    height: 88,
    resizeMode: "contain",
  },
  productInfo: {
    flex: 1,
    paddingHorizontal: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "#ee4d2d",
  },
  productDescription: {
    fontSize: 12,
    color: "#555",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  quantityBtn: {
    fontSize: 20,
    color: "#ee4d2d",
    paddingHorizontal: 10,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 5,
    width: 40,
    textAlign: "center",
  },
  removeIcon: {
    position: "absolute",
    right: 10,
    top: 20,
  },
});

export default ProductInCart;
