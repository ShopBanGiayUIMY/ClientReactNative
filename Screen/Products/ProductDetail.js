import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import Header from "../../components/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
  faHeart,
  faShare,
  faComment,
  faStar,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ProductDetail = ({ route, navigation }) => {
  const { product } = route.params;
  const [isLiked, setIsLiked] = useState(false);

  const insets = useSafeAreaInsets();

  // Kiểm tra trạng thái "thích" khi màn hình được tải
  useEffect(() => {
    checkLikeStatus();
  }, []);

  const checkLikeStatus = async () => {
    try {
      // Lấy trạng thái "thích" từ AsyncStorage
      const likedStatus = await AsyncStorage.getItem(
        "likedProducts" + product.product_id
      );
      if (likedStatus !== null) {
        setIsLiked(JSON.parse(likedStatus));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLikeProduct = async () => {
    try {
      // Lấy danh sách sản phẩm đã thích từ AsyncStorage (nếu có)
      const likedProducts = await AsyncStorage.getItem("likedProducts");
      let updatedLikedProducts = [];

      if (likedProducts) {
        // Nếu đã có dữ liệu trong AsyncStorage, chuyển nó thành mảng
        updatedLikedProducts = JSON.parse(likedProducts);
      }

      // Kiểm tra nếu sản phẩm đã tồn tại trong danh sách, thì loại bỏ nó
      const existingProductIndex = updatedLikedProducts.findIndex(
        (item) => item.product_id === product.product_id
      );
      if (existingProductIndex !== -1) {
        updatedLikedProducts.splice(existingProductIndex, 1);
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm nó vào danh sách
        updatedLikedProducts.push(product);
      }

      // Lưu danh sách sản phẩm đã thích vào AsyncStorage
      await AsyncStorage.setItem(
        "likedProducts",
        JSON.stringify(updatedLikedProducts)
      );

      // Cập nhật trạng thái thích
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Lỗi khi lưu trạng thái thích sản phẩm: ", error);
    }
  };
  const handleAddProductToCart = async () => {
    // Destructure the product object to get the required fields
    const {
      product_id,
      product_price,
      product_description,
      product_name,
      thumbnail,
      category_id,
    } = product;
  
    // Create the payload with the required fields
    const payload = {
      product_id,
      product_price,
      product_description,
      product_name,
      thumbnail,
      category_id,
    };
  
    // Send the request to add the product to the cart
    try {
      const response = await fetch(
        "https://654cec0077200d6ba859b242.mockapi.io/api/v1/addtocart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
  
      if (response.ok) {
        // Handle success if needed
      } else {
        console.error(
          "Error adding the product to the cart:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error adding the product to the cart:", error);
    }
  };
  

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollVieww}>
      <Header navigation={navigation} style={styles.header} />
          <Image
            source={{ uri: product.thumbnail }}
            style={styles.productImage}
          />
          <TouchableOpacity
            style={styles.iconn}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} size={25} color="#ADD8E6" />
          </TouchableOpacity>
          <View style={styles.nameAndHeart}>
            <Text style={styles.txtNameProduct}>{product.product_name}</Text>
            <View style={styles.moreFuntion}>
              <TouchableOpacity style={{ marginRight: 30 }}>
                <FontAwesomeIcon icon={faShare} size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginRight: 30 }}
                onPress={handleLikeProduct}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  size={20}
                  color={isLiked ? "red" : "white"}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginRight: 0 }}>
                <FontAwesomeIcon icon={faComment} size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginStart: 10,
              marginEnd: 10,
              marginTop: 10,
            }}
          >
            <FontAwesomeIcon icon={faStar} size={15} color="yellow" />
            <FontAwesomeIcon icon={faStar} size={15} color="yellow" />
            <FontAwesomeIcon icon={faStar} size={15} color="yellow" />
            <FontAwesomeIcon icon={faStar} size={15} color="yellow" />
            <FontAwesomeIcon icon={faStar} size={15} color="yellow" />
            <Text style={{ marginLeft: 10, marginTop: -2, fontWeight: "bold" }}>
              5.0
            </Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.top}>
            <Text style={styles.txtMoTa}>{product.product_description}</Text>
          </View>
          <View>
            <Text style={styles.txtPrice}>{product.product_price} $</Text>
          </View>
      </ScrollView>
      <Pressable
        style={[styles.viewPayment, { bottom: Math.max(insets.bottom, 16) }]}
        onPress={() => {
          handleAddProductToCart();
        }}
      >
        <FontAwesomeIcon
          icon={faCartShopping}
          color="#fff"
          size={20}
          style={{ position: "absolute", top: 14, left: 120 }}
        />
        <Text
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
            color: "white",
            marginTop: 12,
          }}
        >
          Add to cart
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    height: "100%",
   
    
  },
  scrollVieww: {
    width: "100%",
    height: "100%",
    position:'relative',
    


    marginBottom: 20,
    position: "relative",
    top: -60,
  },
  iconn: {
    position: "absolute",
    top: 90,
    left: 10,
    zIndex: 1,
  },
  productImage: {
    position: "relative",
    width: "100%",
    height: 350,
    resizeMode: "cover",
  },
  nameAndHeart: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginStart: 10,
    marginEnd: 10,
  },
  moreFuntion: {
    flexDirection: "row",
    marginTop: 15,
  },
  txtNameProduct: {
    marginTop: "3%",
    fontSize: 20,
    fontWeight: "700",
  },
  line: {
    width: "100%",
    borderWidth: 0.5,
    color: "gray",
    marginTop: 20,
  },
  top: {
    marginTop: 20,
  },
  txtMoTa: {
    fontSize: 13,
    marginStart: 10,
    marginEnd: 10,
  },
  txtPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "red",
    margin: 10,
  },
  viewPayment: {
    width: "100%",
    height: 50,
    backgroundColor: "black",
    borderRadius: 10,
  },
});

export default ProductDetail;
