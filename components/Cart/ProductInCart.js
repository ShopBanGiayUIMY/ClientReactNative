import React, { useState, useLayoutEffect } from "react";
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
import FontAwesome from "react-native-vector-icons/FontAwesome";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const ProductInCart = ({ navigation,data }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Giỏ hàng của tôi",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 5, marginRight: 10 }}
        >
          <FontAwesome
            name="arrow-left"
            size={24}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  const [cartData, setCartData] = useState(data);

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.soluong * item.price, 0);
  };

  const handleGiam = (item) => {
    console.log(`Increasing quantity for item with id ${item.id}`);
    const updatedData = cartData.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, soluong: Math.max(0, cartItem.soluong - 1) }
        : cartItem
    );

    setCartData(updatedData);
  };

  const handleTang = (item) => {
    console.log(`Increasing quantity for item with id ${item.id}`);
    const updatedData = cartData.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, soluong: cartItem.soluong + 1 }
        : cartItem
    );

    setCartData(updatedData);
  };

  return (
    <ScrollView style={styles.container}>
      <Swipelist
        data={cartData}
        renderRightItem={(item, index) => (
          <View style={{ width: "100%" }}>
            <View style={styles.vProduct}>
             <View style={styles.vImage}>
                <Image
                   style={styles.imagee}
                  source={{
                    uri: "https://cf.shopee.vn/file/b4799a8f363f351245ea3e0d532502f3",
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
                    <Text style={styles.txtName}>{item.name}</Text>
                    <TouchableOpacity>
                      <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        size={20}
                        color="gray"
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.vSizeandColor}>
                    <Text style={styles.txtSizeandColor}>Size: L</Text>
                    <Text style={styles.txtSizeandColor}>Màu: Đen</Text>
                  </View>
                  <View style={styles.vContainer}>
                    <View style={styles.vChildContainer}>
                      <Pressable
                        style={styles.pressTru}
                        onPress={() => {
                          handleGiam(item);
                        }}
                      >
                        <Text style={styles.txtTru}>-</Text>
                      </Pressable>
                      <View style={styles.vCount}>
                        <Text style={styles.txtCount}>{item.soluong}</Text>
                      </View>
                      <Pressable
                        style={styles.pressCong}
                        onPress={() => {
                          handleTang(item);
                        }}
                      >
                        <Text style={styles.txtCong}>+</Text>
                      </Pressable>
                      <View style={styles.vThanhToan}>
                        <Text>
                          {item.soluong * item.price}
                          <Text>đ</Text>
                        </Text>
                      </View>
                    </View>
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
              onPress={() => handleXoa()}
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

      <View style={{ width: "100%", height: 165 }}>
        <View style={styles.vVoucher}>
          <TextInput
            style={{ paddingStart: 10, textAlign: "center" }}
            placeholder="Nhập mã voucher"
          />
          <Pressable style={styles.pressEnterVoucher}>
            <FontAwesomeIcon
              style={{ alignSelf: "center", marginTop: 4 }}
              icon={faArrowRight}
              size={15}
              color="white"
            />
          </Pressable>
        </View>

        <View style={styles.vTongtien}>
          <Text style={styles.txtTongTien}>Tổng tiền:</Text>
          <Text style={styles.txtTongSoTien}>
            {calculateTotalPrice(cartData)}
            <Text>đ</Text>
          </Text>
        </View>
        <Pressable style={styles.pressThanhToanNgay}>
          <Text style={styles.txtThanhToanNgay}>Thanh toán ngay</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: HEIGHT,
    marginTop: 10,
    elevation: 5,
    marginBottom:95
  },
  pressSearch: {
    width: 25,
    height: 25,
    marginTop: 35,
    marginRight: 25,
    alignItems: "center",
    paddingTop: 3,
  },
  txtTitle: {
    fontSize: 25,
    fontWeight: "300",
    marginStart: 10,
    marginTop: 10,
  },
  vProduct: {
    width: "90%",
    height: 'auto', 
    alignSelf: "center",
    marginBottom: 10,
  },
  vImage: {
    width: "100%",
    height: 104,
    flexDirection: "row",
  },
  imagee: {
    width: 104,
    height: 104,
    padding: 2,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  vInforProduct: {
    width: 242,
    height: 104,
    backgroundColor: "white",
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
  },
  txtName: {
    width: 63,
    height: 16,
    fontSize: 16,
    marginStart: 7,
  },
  vSizeandColor: {
    flexDirection: "row",
    marginStart: 10,
    width: 63,
    height: 11,
    marginTop: 10,
  },
  txtSizeandColor: { fontSize: 10, width: 63, color: "gray" },
  vContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 50,
  },
  vChildContainer: {
    width: "85%",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pressTru: {
    borderRadius: 35,
    borderWidth: 0.5,
    width: 30,
    height: 30,
    borderColor: "gray",
    marginTop: 10,
    marginStart: 10,
    backgroundColor: "white",
  },
  txtTru: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 2,
    color: "gray",
  },
  vCount: {
    backgroundColor: "gray",
    width: 50,
    height: 25,
    marginTop: 12,
    borderRadius: 4,
    marginLeft: 3,
  },
  txtCount: {
    textAlign: "center",
    marginTop: 5,
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  pressCong: {
    borderRadius: 35,
    borderWidth: 0.5,
    width: 30,
    height: 30,
    borderColor: "gray",
    marginTop: 10,
    marginStart: 10,
    backgroundColor: "white",
  },
  txtCong: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 2,
    color: "gray",
  },
  vThanhToan: {
    width: "25%",
    alignSelf: "flex-end",
    position: "relative",
    top: -20,
    right: -25,
  },
  vVoucher: {
    width: "80%",
    height: 36,
    alignSelf: "center",
    backgroundColor: "pink",
    borderRadius: 5,
    marginTop: 4,
  },
  pressEnterVoucher: {
    position: "absolute",
    right: 2,
    top: 5,
    borderRadius: 50,
    width: 25,
    height: 25,
    borderWidth: 0.5,
    borderColor: "gray",
    backgroundColor: "black",
  },
  vTongtien: {
    width: "100%",
    height: 22,
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  txtTongTien: {
    marginStart: 10,
    fontSize: 16,
    color: "white",
    marginTop: 2,
    width: 60,
  },
  txtTongSoTien: {
    width: 110,
    marginEnd: 10,
    fontSize: 16,
    color: "white",
    marginTop: 2,
  },
  pressThanhToanNgay: {
    width: "80%",
    alignSelf: "center",
    backgroundColor: "#DB3022",
    height: 55,
    borderRadius: 35,
    marginTop: 15,
  },
  txtThanhToanNgay: {
    textAlign: "center",
    marginTop: 16,
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
   
  },
  icon: {
    fontSize: 20,
    color: "#BCBCBC",
    marginTop: 3,
    marginLeft: 10,
  },
});

export default ProductInCart;
