import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEllipsis, faCartPlus, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const LikeProducts = ({ navigation }) => {
  //LikeProduct
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
      }
    } catch (error) {
      console.log("Lỗi không lấy được danh sách sản phẩm đã thích: " + error);
    }
  };
  //
  const handleMoreOption = () => {
    Alert.alert(
      "Cảnh báo !",
      "Bạn có chắc chắn muốn bỏ thích sản phẩm này chứ?",
      [
        {
          text: "Hủy bỏ",
          style: "cancel", // or 'destructive' for a destructive button
          onPress: () => console.log("Cancel Pressed"),
        },
        {
          text: "Bỏ thích",
          onPress: async () => {
            console.log('====================================');
            console.log('Bỏ thích đang cập nhật');
            console.log('====================================');("Chức năng đang cập nhật");
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{flexDirection:'row'}}>
        <Pressable onPress={()=>{navigation.goBack()}}>
        <FontAwesomeIcon icon={faArrowLeft} size={25} color="orange" style={{marginTop:40, marginStart:10}}/>
        </Pressable>
        <Text style={styles.txtTitle}>Danh sách sản phẩm yêu thích</Text>
      </View>
      <View style={styles.columnContainer}>
        {likedProducts && likedProducts.length > 0 ? (
          likedProducts.map((product, index) => (
            <TouchableOpacity
              onPress={() => {
                alert("Bạn đã ấn vào id_item số:  " + product.product_id);
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
              <View style={styles.viewRow}>
                <TouchableOpacity
                  style={styles.touchMoreOption}
                  onPress={() => {
                    handleMoreOption();
                  }}
                >
                  <FontAwesomeIcon icon={faEllipsis} size={20} color="gray" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 100,
                    height: 30,
                    borderRadius: 2,
                    borderColor: "orange",
                    borderWidth: 1,
                  }}
                >
                  <Text
                    style={{ textAlign: "center", width: 100, marginTop: 5 }}
                  >
                    Tương tự
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchMua}>
                  <FontAwesomeIcon
                    style={styles.fontMua}
                    icon={faCartPlus}
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
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
    height: 250,
  },
  img: {
    width: "100%",
    height: 150,
    borderRadius: 5,
  },
  productName: {
    textAlign: "center",
    width: "100%",
  },
  viewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  touchMoreOption: {
    marginStart: 10,
    marginTop: 3,
  },
  touchMua: {
    marginEnd: 10,
    borderRadius: 50,
    backgroundColor: "orange",
    width: 25,
    height: 25,
    marginTop: 3,
  },
  fontMua: {
    marginTop: 4,
    alignSelf: "center",
  },
});
