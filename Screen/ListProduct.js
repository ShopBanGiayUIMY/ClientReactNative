import React, { useState, useEffect,useRef } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  Dimensions,
  RefreshControl
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faShoppingCart,
  faBell,
  faMagnifyingGlass,
  faQrcode,
  faMoneyBill1,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import banner from "../image/banner.png";
import banner1 from "../image/banner1.jpg";
import banner2 from "../image/banner2.jpg";
const images = [banner, banner1, banner2];
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function ListProduct() {
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    // Define the API URL
    const apiUrl = "https://64e6e269b0fd9648b78f008b.mockapi.io/api/shopquanao";

    // Make the GET request using fetch
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Handle the retrieved data
        setData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);

    const handleScroll = (event) => {
      const scrollY = event.nativeEvent.contentOffset.y;
      // Điều chỉnh giá trị opacity tùy thuộc vào vị trí cuộn của trang
      const newOpacity = Math.min(scrollY / 100, 1);
      setBackgroundOpacity(newOpacity);
    };

  return (
    <View style={styles.container}>
      <View style={{
          ...styles.searchs,
          backgroundColor: `rgba(75, 158, 255, ${backgroundOpacity})`, // Sử dụng giá trị backgroundOpacity
        }}>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => {
              alert("quét qr code");
            }}
          >
            <FontAwesomeIcon icon={faQrcode} size={25} />
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputt} placeholder="Enter something..." />
            <TouchableOpacity
              onPress={() => {
                alert("Tìm kiếm");
              }}
            >
              <FontAwesomeIcon
                style={styles.glass}
                size={25}
                icon={faMagnifyingGlass}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => {
            alert("Giỏ hàng");
          }}
        >
          <FontAwesomeIcon icon={faShoppingCart} size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => {
            alert("Không có thông báo nào");
          }}
        >
          <FontAwesomeIcon icon={faBell} size={25} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.viewProductsContainer}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        refreshControl={ 
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.handleRefresh}
            colors={['#9Bd35A', '#689F38']}
          />
        }
      >
       {/* banner ở đây */}
        <View style={styles.productList}>
          {data &&
            data.map((product, index) => (
              <View key={index} style={styles.productItem}>
                <Image
                  style={styles.productImage}
                  source={{ uri: product.image }}
                />
                <View style={styles.productContent}>
                  <Text style={styles.productName}>{product.nameproduct}</Text>
                  <View style={styles.productRow}>
                    <FontAwesomeIcon
                      style={styles.productIcon}
                      icon={faMoneyBill1}
                      size={25}
                      color="rgba(241, 209, 96, 1)"
                    />
                    <Text style={styles.productPrice}>
                      {product.price}
                      <Text style={styles.underlline}>đ</Text>
                    </Text>
                    <Text style={styles.productOldPrice}>
                      {product.discount}%
                    </Text>
                  </View>
                  <View style={styles.productRow}>
                    <FontAwesomeIcon
                      style={styles.productIcon}
                      icon={faStar}
                      size={17}
                      color="rgba(241, 209, 96, 1)"
                    />
                    <Text style={styles.productRating}>
                      {product.rating} / 5.0{" "}
                    </Text>
                    <View style={styles.productSeparator}></View>
                    <Text style={styles.productSales}>
                      {product.sales} lượt bán
                    </Text>
                  </View>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BBDEF2",
  },
  searchs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 75,
    backgroundColor: "rgba(75, 158, 255, 1)",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 47.6,
    borderWidth: 1,
    borderColor: "gray",
    marginLeft: 20,
  },
  inputt: {
    width: 200,
    height: 30,
    paddingLeft: 10,
    fontSize: 20,
    color: "white",
  },
  glass: {
    marginLeft: 10,
    marginRight: 5,
  },
  viewBanner: {
    width: WIDTH,
    height: HEIGHT * 0.25,
  },
  image: {
    width: WIDTH,
    height: HEIGHT * 0.25,
  },
  viewProductsContainer: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  productList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 5,
    paddingHorizontal: 10,
  },
  productItem: {
    width: "48%",
    marginBottom: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  productImage: {
    width: "100%",
    height: 200,
  },
  productContent: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  productName: {
    fontWeight: "700",
  },
  productRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  productIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    paddingTop: 4,
  },
  productPrice: {
    fontWeight: "700",
    marginLeft: 5,
    fontSize: 20,
    color: "red",
  },
  underlline: {
    textDecorationLine: "underline",
  },
  productOldPrice: {
    fontWeight: "bold",
    lineHeight: 15,
    marginTop: 2,
    color: "white",
    backgroundColor: "rgba(255, 55, 55, 1)",
    borderRadius: 5,
    textAlign: "center",
    width: 35,
    height: 23,
    paddingTop: 5,
    marginStart: 50,
  },
  productRating: {
    fontWeight: "400",
    marginTop: 1,
    fontSize: 15,
    lineHeight: 18,
  },
  productSeparator: {
    top: 4,
    left: "30%",
    transform: [{ translateX: -0.5 }],
    width: 1,
    height: 15,
    backgroundColor: "gray",
  },
  productSales: {
    marginStart: 10,
    marginTop: 1,
    fontWeight: "400",
    fontSize: 15,
  },
});
