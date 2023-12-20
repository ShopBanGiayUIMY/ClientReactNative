import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  Pressable,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Animated,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
  faShareNodes,
  faHeart,
  faShare,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
const { height, width } = Dimensions.get("window");
const EXTAR_HEIGHT = 542.5;
import { AuthStatus } from "../../Services/AuthContext";
import axios from "axios";
import Config from "../../Api/Config";
import Entypo from "react-native-vector-icons/Entypo";
const COLOURS = {
  white: "#ffffff",
  black: "#000000",
  green: "#00AC76",
  red: "#C04345",
  blue: "#0043F9",
  backgroundLight: "#F0F0F3",
  backgroundMedium: "#B9B9B9",
  backgroundDark: "#777777",
};
import useAuth from "../../Services/auth.services";
import ModalBottom from "../../Screen/Modal/modal.product.detail";
import ModalBottomOrder from "../../Screen/Modal/modal.product.order";
import Star from "react-native-star-view";
import { SafeAreaView } from "react-native";
const CpnProductDetail = ({ product, navigation }) => {
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);
  const [data, setData] = useState(null);
  const [dataimage, setDataimage] = useState(null);
  const { state, dispatch } = AuthStatus();
  const [daban, setdaban] = useState(null);
  const [star, setstar] = useState(null);

  const {
    GetFavorite,
    AddFavorite,
    RemoveFavorite,
    CheckFavoriteByProduct,
    GetSolidProductById,
    GetRatingProduct,
  } = useAuth();
  const [favorites, setFavorites] = useState();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getproductbyid();
      if (state.isLoggedIn) {
        GetFavoriteProduct();
        GetSolidProductId();
        GetStarProduct();
      }
    });

    return unsubscribe;
  }, [navigation]);

  const GetFavoriteProduct = async () => {
    try {
      const response = await CheckFavoriteByProduct(product.id);
      console.log("thích ", response.message);
      if (response.message == true) {
        setFavorites(true);
        return;
      } else {
        setFavorites(false);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
  const GetSolidProductId = async () => {
    try {
      const response = await GetSolidProductById(product.id);
      setdaban(response.total_quantity_sold);
      return;
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const GetStarProduct = async () => {
    try {
      const response = await GetRatingProduct(product.id);
      if (response) {
        setstar((+response.average_rating).toFixed(1));
        console.log("sao", (+response.average_rating).toFixed(1));
      } else {
        setstar(0);
      }
      return;
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const CheckFavorite = async () => {
    try {
      if (!state.isLoggedIn) {
        ToastAndroid.showWithGravity(
          "Bạn cần đăng nhập để thực hiện chức năng này",
          2,
          ToastAndroid.CENTER
        );
        return;
      } else {
        const response = await CheckFavoriteByProduct(product.id);
        if (response.message == true) {
          RemoveFavorite(product.id);
          setFavorites(false);
          ToastAndroid.showWithGravity(
            "Đã loại bỏ sản phẩm khỏi mục yêu thích",
            2,
            ToastAndroid.CENTER
          );
        } else {
          AddFavorite(product.id);
          setFavorites(true);
          ToastAndroid.showWithGravity(
            "Đã thêm sản phẩm vào mục yêu thích",
            2,
            ToastAndroid.CENTER
          );
        }
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
  const getproductbyid = async () => {
    try {
      const response = await axios.get(
        `${Config.API_BASE_URL}/products/${product.id}`
      );
      setData(response.data);
      setDataimage(response.data.images);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
  const hanldeAddToCart = async () => {
    // alert("Bạn đã thêm " + product.name + " vào giỏ hàng! ");
  };
  const renderProduct = ({ item, index }) => {
    return (
      <View
        style={{
          width: width,
          height: 240,
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Image
          source={{ uri: item }}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "contain",
            borderRadius: 10,
          }}
        />
      </View>
    );
  };
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleOrder, setisModalVisibleOrder] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModalOrder = () => {
    setisModalVisibleOrder(!isModalVisibleOrder);
  };
  let totalQuantitySold = daban;
  if (totalQuantitySold === null) {
    totalQuantitySold = 0;
  } else {
    totalQuantitySold = parseInt(totalQuantitySold);
  }

  const hanldThanhToan = () => {
    toggleModalOrder();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={COLOURS.backgroundLight}
        barStyle="dark-content"
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.main}>
        {isModalVisible && (
          <ModalBottom
            openDrawer={isModalVisible}
            closeDrawer={toggleModal}
            dataprod={data}
          />
        )}
        {isModalVisibleOrder && (
          <ModalBottomOrder
            openDrawer={isModalVisibleOrder}
            closeDrawer={toggleModalOrder}
            dataprod={data}
          />
        )}

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.back}
          >
            <Entypo
              name="chevron-left"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundDark,
                padding: 12,
                backgroundColor: COLOURS.white,
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={dataimage}
          horizontal
          renderItem={renderProduct}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0.8}
          snapToInterval={width}
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        />
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
            marginTop: 10,
          }}
        >
          {dataimage
            ? dataimage.map((data, index) => {
                let opacity = position.interpolate({
                  inputRange: [index - 1, index, index + 1],
                  outputRange: [0.2, 1, 0.2],
                  extrapolate: "clamp",
                });
                return (
                  <Animated.View
                    key={index}
                    style={{
                      width: "16%",
                      height: 2.4,
                      backgroundColor: COLOURS.black,
                      opacity,
                      marginHorizontal: 4,
                      borderRadius: 100,
                    }}
                  ></Animated.View>
                );
              })
            : null}
        </View>

        <View
          style={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "200",
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            {product.name}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "400",
              paddingLeft: 10,
              paddingTop: 10,
              color: "red",
            }}
          >
            {parseFloat(product.price).toLocaleString("vi-VN")}
            <Text>đ</Text>
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            backgroundColor: "rgba(240, 237, 241, 0.72)",
            padding: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Star
                score={+star}
                style={{
                  width: 100,
                  height: 20,
                  marginTop: 5,
                }}
              />
              <Text
                style={{
                  fontWeight: "200",
                  paddingLeft: 5,
                }}
              >
                {+star}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: 50,
              }}
            >
              <Text style={{}}>Đã bán</Text>
              <Text
                style={{
                  fontWeight: "200",
                  paddingLeft: 5,
                }}
              >
                {totalQuantitySold}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingRight: 10,
              position: "relative",
            }}
          >
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                alignItems: "center",
                paddingTop: 10,
                borderRadius: 25,
                borderWidth: 0.5,
                borderColor: "white",

                backgroundColor: "white",
                shadowColor: "black",
                shadowOffset: { width: 5, height: 0 },
                shadowOpacity: 0.5,
                shadowRadius: 5,
              }}
              onPress={() => CheckFavorite()}
            >
              <FontAwesomeIcon
                icon={faHeart}
                size={20}
                color={favorites ? "red" : "gray"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                alignItems: "center",
                paddingTop: 10,
                borderRadius: 25,
                borderWidth: 0.5,
                borderColor: "white",
                marginLeft: 30,
                backgroundColor: "white",
                shadowColor: "black",
                shadowOffset: { width: 5, height: 0 },
                shadowOpacity: 0.5,
                shadowRadius: 5,
              }}
            >
              <FontAwesomeIcon icon={faShare} size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            position: "relative",
            top: 25,
          }}
        >
          <Text style={{ marginStart: 10, marginEnd: 10, marginBottom: 150 }}>
            {product.description}
          </Text>
        </View>
        <View style={styles.heartContainer}>
          <TouchableOpacity
            onPress={() => CheckFavorite()}
            style={{
              width: 40,
              height: 40,
              alignItems: "center",
              paddingTop: 10,
              borderRadius: 25,
              borderWidth: 0.5,
              borderColor: "white",
              marginLeft: 50,
              backgroundColor: "white",
              shadowColor: "black",
              shadowOffset: { width: 5, height: 0 }, // 5px bên tay phải
              shadowOpacity: 0.5,
              shadowRadius: 5,
            }}
          >
            <FontAwesomeIcon
              icon={faHeart}
              size={20}
              color={favorites ? "red" : "gray"}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.addToCartButton} onPress={toggleModal}>
          <FontAwesomeIcon
            style={styles.iconAddToCart}
            icon={faCartShopping}
            size={20}
            color="white"
          />
          <Text style={styles.buttonTextadd}>Thêm vào giỏ hàng</Text>
        </Pressable>
        {/* <Pressable style={styles.buyNowButton} onPress={hanldThanhToan}>
          <Text style={styles.buttonTextmua}>Mua ngay</Text>
        </Pressable> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  back: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  container: {
    width: width,
    height: '100%',
  },

  },
  viewTop: {
    width: width,
    height: 109,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(75, 158, 255, 1)",
  },
  txtDetail: {
    width: 240,
    textAlign: "center",
    fontSize: 25,
  },
  dropdownContainer: {
    flexDirection: "row",
    width: width,
    height: 150,
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
  },
  dropdown: {
    flex: 1,
    marginRight: 5,
  },
  heartContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addToCartButton: {
    alignItems: "center",
    backgroundColor: "#26aa99",
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "100%",
    height: "100%",
  },
  buyNowButton: {
    backgroundColor: "#ee4d2d",
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: "100%",

    width: "50%",
    paddingVertical: 16,
  },
  iconAddToCart: {
    marginRight: 5,
  },
  buttonTextadd: {
    textAlign: "center",
    fontSize: 10,
    color: "white",
  },
  buttonTextmua: {
    textAlign: "center",
    fontSize: 15,

    color: "white",
  },
});

export default CpnProductDetail;
