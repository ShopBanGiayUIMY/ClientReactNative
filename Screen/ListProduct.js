import React, { useState, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  Dimensions,
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
import products from "../image/products.png";
const images = [banner, banner1, banner2];
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function ListProduct() {
  const [imageActive, setImageActive] = useState(0);
  const scrollViewRef = useRef();
  //get api
  const [data, setData] = useState(null);

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

  //slide show banner
  const handleChangeImage = (event) => {
    const slideSize = WIDTH;
    const currentOffset = event.nativeEvent.contentOffset.x;
    const activeImage = Math.floor(currentOffset / slideSize);
    setImageActive(activeImage);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      const activeImage = (imageActive + 1) % images.length;
      setImageActive(activeImage);
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: activeImage * WIDTH,
          animated: true,
        });
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [imageActive]);
  return (
    <View style={styles.container}>
      <View style={styles.searchs}>
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
      <View style={styles.viewBanner}>
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleChangeImage}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.carousel}
        >
          {images.map((image, index) => (
            <Image
              key={index}
              resizeMode="stretch"
              source={image}
              style={styles.image}
            />
          ))}
        </ScrollView>
      </View>
      <ScrollView
        contentContainerStyle={styles.viewProducts}
        showsVerticalScrollIndicator={true}
      >
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: "5%",
    backgroundColor: "#BBDEF2",
  },
  searchs: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(75, 158, 255, 1)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 55,
  },
  viewBanner: {
    width: WIDTH,
    height: HEIGHT * 0.25,
    marginTop: 55,
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
  carousel: {
    width: WIDTH,
    height: HEIGHT * 0.25,
  },
  image: {
    width: WIDTH,
    height: HEIGHT * 0.25,
  },
  viewProducts: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 5,
  },
  productItem: {
    width: "49%",
    marginBottom: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  productImage: {
    width: "100%",
    height: 200,
    marginBottom: 100,
  },
  productContent: {
    position: "absolute",
    marginTop: 210,
    textAlign: "center",
  },
  productName: {
    fontWeight: "700",
    marginLeft: 10,
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
