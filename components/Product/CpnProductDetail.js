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
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
  faShareNodes,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const EXTAR_HEIGHT = 542.5;
import { AuthStatus } from "../../Services/AuthContext";
import axios from "axios";

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
import ModalBottom from "../../Screen/Modal/modal.bottom";
const CpnProductDetail = ({ product, navigation }) => {
  const scrollX = new Animated.Value(0);

  let position = Animated.divide(scrollX, WIDTH);

  
  const [data, setData] = useState(null);
  const [dataimage, setDataimage] = useState(null);
  const { state, dispatch } = AuthStatus();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getproductbyid();
    });

    return unsubscribe;
  }, [navigation]);
  const getproductbyid = async () => {
    try {
      const response = await axios.get(
        `http://103.77.172.199:3000/api/v1/products/${product.id}`
      );
      setData(response.data);
      console.log("data", response.data.images);
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
          width: WIDTH,
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

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.container}>
      <View style={styles.vImage}>
      <StatusBar
        backgroundColor={COLOURS.backgroundLight}
        barStyle="dark-content"
      />
        <ScrollView showsVerticalScrollIndicator={false}>
        <ModalBottom   openDrawer={isModalVisible} closeDrawer={toggleModal}/>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
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
            snapToInterval={WIDTH}
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
              marginStart: 10,
              marginEnd: 10,
              width: WIDTH,
              height: 70,
              position: "relative",
              top: -50,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "200", paddingLeft: 5 }}>
              {product.name}
            </Text>
            <Text style={{ fontSize: 25, fontWeight: "200", paddingRight: 50 }}>
              {product.price}
              <Text>đ</Text>
            </Text>
          </View>
          <View
            style={{
              marginStart: 10,
              marginEnd: 10,
              position: "relative",
              top: -55,
              paddingBottom: 115,
            }}
          >
            <Text>{product.description}</Text>
          </View>
          <View style={styles.heartContainer}>
              <TouchableOpacity
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
                <FontAwesomeIcon icon={faHeart} size={20} color="gray" />
              </TouchableOpacity>
            </View>
        </ScrollView>
        
        <Pressable
          style={{
            position: "absolute",
            width: 380,
            height: 70,
            backgroundColor: "#DB3022",
            justifyContent: "center",
            bottom: 0,
            alignSelf: "center",
            marginStart: 10,
            marginEnd: 10,
            borderRadius: 25,
          }}
          onPress={toggleModal}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 25,
              fontWeight: "bold",
              fontStyle: "italic",
              color: "white",
            }}
          >
            THÊM VÀO GIỎ HÀNG
          </Text>
        </Pressable>
      </View>
    </View>
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
    width: WIDTH,
    height: HEIGHT,
    flex: 1,
  },
  viewTop: {
    width: WIDTH,
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
  vImage: {
    width: "100%",
    height: HEIGHT,
    backgroundColor: "#A9CDEE",
    position: "relative",
  },
  dropdownContainer: {
    flexDirection: "row",
    width: WIDTH,
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
});

export default CpnProductDetail;
