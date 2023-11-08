import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import Header from "../../components/Header/Header";
import Payment from "../../components/AddtoCard";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
  faHeart,
  faShare,
  faComment,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

const ProductDetail = ({ route, navigation }) => {
  const { product } = route.params;
  const [expanded, setExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

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
      await AsyncStorage.setItem("likedProducts", JSON.stringify(updatedLikedProducts));

      // Cập nhật trạng thái thích
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Lỗi khi lưu trạng thái thích sản phẩm: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <ScrollView style={styles.scrollVieww}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
      </ScrollView>
      <View style={styles.viewPayment}>
        <Payment />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A9CDEE",
  },
  scrollVieww: {
    marginBottom: 20,
    position:'relative',
    top:-60
  },
  iconn: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  productImage: {
    width: "100%",
    height: 350,
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
    width: "90%",
    height: 50,
    backgroundColor: "#f0f",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: -20,
    borderRadius: 5,
  },
});

export default ProductDetail;
