import React, { useState, useLayoutEffect, useEffect,useCallback } from "react";
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
  ToastAndroid,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Swipelist from "react-native-swipeable-list-view";
import {
  faEllipsisVertical,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../Services/auth.services";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Checkbox } from "react-native-paper";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const ProductInCart = (props) => {
  const { dataCart, Cart_id, handlePress } = props;
  const { UpdateCreateCart } = useAuth();
  const loadlai = () => {
    handlePress();
  };
  const [data, setData] = useState(dataCart);

  const [selectedItems, setSelectedItems] = useState([]);
  const toggleItemSelection = useCallback(
    (itemId) => {
      if (selectedItems.includes(itemId)) {
        setSelectedItems(selectedItems.filter((id) => id !== itemId));
      } else {
        setSelectedItems([...selectedItems, itemId]);
      }
    },
    [selectedItems]
  );
  
  const handlePayment = () => {
    const selectedProducts = data.filter(
      (item) => selectedItems.includes(item.ProductDetail.detail_id)
    );
    handlePlaceOrder(selectedProducts);
  };
  
  const handlePlaceOrder = (selectedProducts) => {
  //   // Chuẩn bị dữ liệu đơn hàng để gửi lên server
  //   const orderData = {
  //     shipping_address_id: 2,
  //     payment_method_id: 1,
  //     delivered_address:"Tah",
  //     cart_id: Cart_id,
  //     cart_items: selectedProducts.map(item => item.item_id),
   
  //   };
  
  //  console.log("orderData",orderData);
  //  console.log("selectedProducts",dataCart);
  };



  
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
    if (quantity > 1) {
      UpdateCreateCart(Cart_id, product_detail_id, quantity - 1).then(
        (result) => {
          console.log("result", result);
          loadlai();
        }
      );
    }
  };
  const handleTang = (quantity, product_detail_id) => {
    UpdateCreateCart(Cart_id, product_detail_id, quantity + 1).then(
      (result) => {
        console.log("result", result);
        loadlai();
      }
    );
  };
  const handleQuantityChange = (text, item) => {
    console.log(`Changing quantity for item with id ${item.item_id}`);
  };
  function ItemInput({ item, index, handleInputChange }) {
    const [tempQuantity, setTempQuantity] = useState(item.quantity.toString());

    const handleBlur = () => {
      handleInputChange(tempQuantity, index);
      setTimeout(() => {
        console.log("Số lượng mới:", parseInt(tempQuantity));
        UpdateCreateCart(
          Cart_id,
          item.ProductDetail.detail_id,
          parseInt(tempQuantity)
        )
          .then((result) => {
            if (result.status == -1) {
              ToastAndroid.show(result.message, ToastAndroid.SHORT);
              loadlai();
            } else if (result.status == 1) {
              ToastAndroid.show(result.message, ToastAndroid.SHORT);
              loadlai();
              console.log("result", result);
              loadlai();
            } else if (result.status == 0) {
              ToastAndroid.show(result.message, ToastAndroid.SHORT);
              loadlai();
              console.log("result", result);
              loadlai();
            }
          })
          .catch((error) => {
            console.log("error", error);
          });
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
    <ScrollView
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={true}
      style={styles.container}
    >
      <Swipelist
        data={data}
        renderRightItem={(item, index) => (
          <View style={styles.all} key={index}>
            <Checkbox
              status={
                selectedItems.includes(item.ProductDetail.detail_id)
                  ? "checked"
                  : "unchecked"
              }
              onPress={() => toggleItemSelection(item.ProductDetail.detail_id)}
              color="#3399ff"
            />
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
                    <Text style={styles.txtSizeandColor}>
                      Size: {item.ProductDetail.size}
                    </Text>
                    <Text style={styles.txtSizeandColor}>
                      Màu: {item.ProductDetail.color}
                    </Text>
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
        rightOpenValue={210}
        renderHiddenItem={(data, index) => (
          <View style={styles.hiddenItemContainer}>
            <Pressable
              style={styles.editButton}
              onPress={() => console.log("pressed")}
            >
              <Text style={styles.buttonTextedit}>Chỉnh sửa</Text>
            </Pressable>
            <Pressable
              style={styles.deleteButton}
              onPress={() =>
                alert(`Xoá sản phẩm ${data.ProductDetail.detail_id}`)
              }
            >
              <Text style={styles.buttonTextdelete}>Xoá</Text>
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
    marginHorizontal: 5,
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

  hiddenItemContainer: {
    flexDirection: "row",
    marginHorizontal: 5,
    alignItems: "center",
  },
  editButton: {
    width: 100,
    height: 160,
    backgroundColor: "orange",
    alignContent: "center",
    borderRadius: 10,
  },
  deleteButton: {
    width: 100,
    height: 160,
    backgroundColor: "rgba(245, 65, 2, 0.8)",
    borderColor: "white",
    borderRadius: 10,
  },
  buttonTextdelete: {
    textAlign: "center",
    marginTop: 35,
    fontSize: 20,
    color: "white",
  },
  buttonTextedit: {
    textAlign: "center",
    marginTop: 35,
    fontSize: 20,
    color: "white",
  },
});

export default ProductInCart;
