import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LikeProducts = ({ navigation }) => {
  const [likedProducts, setLikedProducts] = useState([]);
  //handldeChuyenMan
  const handldeOnPressProductDetail = () => {};

  useEffect(() => {
    getLikeProducts();
  }, []);

  // Lấy danh sách sản phẩm đã được thích từ AsyncStorage
  const getLikeProducts = async () => {
    try {
      const likedProductsJSON = await AsyncStorage.getItem("likedProducts");

      if (likedProductsJSON) {
        // Chuyển chuỗi JSON thành một mảng hoặc đối tượng JavaScript
        const likedProductsArray = JSON.parse(likedProductsJSON);
        setLikedProducts(likedProductsArray);
      } else {
        console.log("Chưa có sản phẩm nào được thích.");
      }
    } catch (error) {
      console.log("Lỗi không lấy được danh sách sản phẩm đã thích: " + error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.txtTitle}>Danh sách sản phẩm yêu thích</Text>
      <View style={styles.columnContainer}>
        {likedProducts && likedProducts.length > 0 ? (
          likedProducts.map((product, index) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Bạn đã ấn vào id_item số:  ',product.product_id)
              }}
              key={index}
              style={styles.item}
            >
              <Image style={styles.img} source={{ uri: product.thumbnail }} />
              <Text style={styles.productName}>{product.product_name}</Text>
              <Text style={styles.productName}>{product.product_price}</Text>
              <Text style={styles.productName}>
                {product.product_description}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>Chưa có sản phẩm nào được thích.</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default LikeProducts;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#A9CDEE",
    flex: 1,
  },
  txtTitle: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 35,
  },
  columnContainer: {
    flexDirection: "row",
    flexWrap: "wrap", 
    justifyContent: "space-between", 
  },
  item: {
    width: "48%", 
    margin: "1%", 
    backgroundColor: "white",
    alignItems: "center",
    height:250
  },
  img: {
    width: "100%",
    height: 150,
    borderRadius:5,

  },
  productName: {
    textAlign: "center",
    width: "100%",
  },
});
