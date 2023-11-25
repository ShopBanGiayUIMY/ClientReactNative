import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Swipelist from "react-native-swipeable-list-view";
import {
  faEllipsisVertical,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../Services/auth.services";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const ProductInCart = (props) => {
  const { dataCart, Cart_id, handlePress } = props;
  const { updateQuantity } = useAuth()
  const loadlai = () => {
    handlePress();
  };
  const [data, setData] = useState(dataCart);
  
  const [quantity, setQuantity] = useState([]);
  useEffect(() => {
    setQuantity(dataCart.map((item) => item.quantity));
  }, [dataCart]);
  useEffect(() => {
    setData(dataCart);
  }, [dataCart]);
  const handleInputChange = (text, index) => {
    const newData = [...data];
    newData[index] = { ...newData[index], quantity: text };
    setData(newData);
  };
  const handleGiam = (quantity, product_detail_id) => {
    updateQuantity(Cart_id, product_detail_id, quantity - 1).then((result) => {
      console.log("result", result);
      loadlai();
    });
  };

  const handleTang = (quantity, product_detail_id) => {
    updateQuantity(Cart_id, product_detail_id, quantity + 1).then((result) => {
      console.log("result", result);
      loadlai();
    });
    loadlai();
  };
  const handleQuantityChange = (text, item) => {
    console.log(`Changing quantity for item with id ${item.item_id}`);
  };
  function ItemInput({ item, index, handleInputChange }) {
    const [tempQuantity, setTempQuantity] = useState(item.quantity.toString());

    const handleBlur = () => {
      handleInputChange(tempQuantity, index);
      setTimeout(() => {
        console.log("New state:", tempQuantity);
      }, 1000);
    };
    return (
      <TextInput
        style={styles.txtCount}
        value={tempQuantity}
        onChangeText={(text) => setTempQuantity(text)}
        keyboardType="numeric"
        onBlur={handleBlur}
      />
    );
  }
  return (
    <ScrollView style={styles.container}>
      <Swipelist
        data={data}
        renderRightItem={(item, index) => (
          <View style={styles.all} key={index}>
            <View style={styles.vImage}>
              <Image
                style={styles.imagee}
                resizeMode="contain"
                source={{
                  uri: item.ProductDetail.Product.thumbnail,
                }}
              />
              <View style={styles.vInforProduct}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 5,
                  }}
                >
                  <Text style={styles.txtName}>
                    {item.ProductDetail.Product.product_name.length > 15
                      ? item.ProductDetail.Product.product_name.slice(0, 15) +
                        "..."
                      : item.ProductDetail.Product.product_name}
                  </Text>

                  <TouchableOpacity>
                    <FontAwesomeIcon
                      icon={faEllipsisVertical}
                      size={20}
                      color="gray"
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.vSizeandColor}>
                  <Text style={styles.itemphanloai}>Phân loại</Text>
                  <View style={styles.phanloai}>
                    <Text style={styles.txtSizeandColor}>Size: {item.ProductDetail.size}</Text>
                    <Text style={styles.txtSizeandColor}>Màu: {item.ProductDetail.color}</Text>
                  </View>
                </View>

                <View style={styles.vContainer}>
                  <View style={styles.vThanhToan}>
                    <Text
                      style={{
                        color: "#F60000",
                        fontStyle: "normal",
                        fontWeight: "600",

                        fontSize: 15,
                      }}
                    >
                      {parseFloat(
                        item.ProductDetail.Product.product_price
                      ).toLocaleString("vi-VN")}
                      <Text>đ</Text>
                    </Text>
                  </View>
                  <View style={styles.vChildContainer}>
                    <TouchableOpacity
                      style={styles.pressTru}
                      onPress={() => {
                        handleGiam(item.quantity, item.ProductDetail.detail_id);
                      }}
                    >
                      <Text style={styles.txtTru}>-</Text>
                    </TouchableOpacity>
                    <View style={styles.vCount}>
                      <ItemInput
                        item={item}
                        index={index}
                        handleInputChange={handleInputChange}
                      />
                    </View>
                    <TouchableOpacity
                      style={styles.pressCong}
                      onPress={() => {
                        handleTang(item.quantity, item.ProductDetail.detail_id);
                      }}
                    >
                      <Text style={styles.txtCong}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
        rightOpenValue={200}
        renderHiddenItem={(data, index) => (
          <View style={{ flexDirection: "row" }}>
            <Pressable
              style={{
                width: 100,
                height: 100,
                backgroundColor: "green",
                borderRadius: 35,
                borderWidth: 0.5,
                borderColor: "white",
              }}
              onPress={() => console.log("pressed")}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 35,
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                xoá
              </Text>
            </Pressable>
            <Pressable
              style={{
                width: 100,
                height: 100,
                backgroundColor: "green",
                borderRadius: 35,
                borderWidth: 0.5,
                borderColor: "white",
              }}
              onPress={() => handleSua()}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 35,
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                edit
              </Text>
            </Pressable>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 10,
  },
  all: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 10,
    height: 160,
  },
  vImage: {
    flex: 1,
    flexDirection: "row",
  },
  imagee: {
    width: 150,
    height: "auto",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    resizeMode: "contain",
  },

  vInforProduct: {
    flex: 1,
    backgroundColor: "white",
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    padding: 10,
  },
  txtName: {
    fontSize: 16,
  },
  vSizeandColor: {
    flexDirection: "column",
    marginVertical: 5,
    color: "gray",
  },
  phanloai: {
    flexDirection: "row",
  },
  itemphanloai: {
    fontSize: 10,
    color: "gray",
    marginRight: 10,
  },
  txtSizeandColor: {
    fontSize: 10,
    color: "gray",
    marginRight: 10,
  },
  vContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  vChildContainer: {
    flexDirection: "row",
  },
  pressTru: {
    borderRadius: 10,
    borderWidth: 0.5,
    width: 35,
    height: 35,
    borderColor: "gray",
    backgroundColor: "white",
  },
  txtTru: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "gray",
  },
  vCount: {
    borderRadius: 10,
    borderWidth: 0.5,
    width: 50,
    height: 27,
    borderRadius: 4,
    marginTop: 4,
    justifyContent: "center",
  },
  txtCount: {
    textAlign: "center",

    fontSize: 16,
    fontWeight: "600",
  },
  pressCong: {
    borderRadius: 10,
    borderWidth: 0.5,
    width: 35,
    height: 35,
    borderColor: "gray",
    backgroundColor: "white",
  },
  txtCong: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "gray",
  },
  vThanhToan: {},
  hiddenItemContainer: {
    flexDirection: "row",
  },
  hiddenButton: {
    width: 100,
    height: 100,
    backgroundColor: "green",
    borderRadius: 35,
    borderWidth: 0.5,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  hiddenButtonText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

export default ProductInCart;
