import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
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
  KeyboardAvoidingView,
  Alert,
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
import { useDispatch, useSelector } from "react-redux";
import { soluonggiohang } from "../../Services/Redux/action/Actions";
const ProductInCart = (props) => {
  const { dataCart, Cart_id, handlePress, handleOrder, navigation } = props;
  const [isAnyProductSelected, setIsAnyProductSelected] = useState(false);
  const { UpdateCreateCart, getTotalCart } = useAuth();
  const [soluongchon, setsoluongchon] = useState(0);
  const [data, setData] = useState(dataCart);
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const dispatchRedux = useDispatch();
  const loadlai = () => {
    handlePress();
  };
  const calculateTotal = () => {
    return selectedItems.reduce((total, selectedItem) => {
      const product_price = parseFloat(selectedItem.product_price);
      const { quantity } = selectedItem;
      return total + product_price * quantity;
    }, 0);
  };
  let Orderdata = {
    Cart_id: Cart_id,
    total: calculateTotal(),
    item_id: selectedItems.map((item) => item.item_id),
  };
  const toggleItemSelection = (item_id, product_price, quantity) => {
    setSelectedItems((prevSelectedItems) => {
      const isItemSelected = prevSelectedItems.some(
        (selectedItem) => selectedItem.item_id === item_id
      );
      const newSelectedItems = isItemSelected
        ? prevSelectedItems.filter(
            (selectedItem) => selectedItem.item_id !== item_id
          )
        : [...prevSelectedItems, { item_id, product_price, quantity }];

      console.log("newSelectedItems", newSelectedItems);
      setIsAnyProductSelected(newSelectedItems.length > 0);
      return newSelectedItems;
    });
  };

  const updateQuantityByItemId = (itemId, newQuantity) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedItems = prevSelectedItems.map((selectedItem) => {
        if (selectedItem.item_id === itemId) {
          const updatedQuantity = !isNaN(Number(newQuantity))
            ? Number(newQuantity)
            : 0;

          return { ...selectedItem, quantity: updatedQuantity };
        }
        return selectedItem;
      });

      return updatedItems;
    });
  };

  useEffect(() => {
    setQuantity(dataCart.map((item) => item.quantity));
  }, [dataCart]);

  useEffect(() => {
    setData(dataCart);
    getTotalCart().then((result) => {
      if (result) {
        dispatchRedux(soluonggiohang(result[0].total_cart_items));
      }
    });
  }, [dataCart]);
  const handleInputChange = (text, index) => {
    const newData = [...data];
    newData[index] = { ...newData[index], quantity: text };
    setData(newData);
  };
  const handleGiam = (quantity, product_detail_id, item_id) => {
    if (quantity > 1) {
      UpdateCreateCart(Cart_id, product_detail_id, quantity - 1).then(
        (result) => {
          if (result.status == 1) {
            updateQuantityByItemId(item_id, quantity - 1);
            loadlai();
          }
          if (result.status == -1) {
            ToastAndroid.show(result.message, ToastAndroid.SHORT);
            loadlai();
          }
          if (result.status == 0) {
            ToastAndroid.show(result.message, ToastAndroid.SHORT);
            loadlai();
          }
        }
      );
    } else if (quantity == 1) {
      DeleteCart(quantity, product_detail_id, item_id);
    }
  };
  const handleTang = (quantity, product_detail_id, item_id) => {
    UpdateCreateCart(Cart_id, product_detail_id, quantity + 1).then(
      (result) => {
        if (result.status == 1) {
          console.log("result", result);
          updateQuantityByItemId(item_id, quantity + 1);
          loadlai();
        }
        if (result.status == -1) {
          ToastAndroid.show(result.message, ToastAndroid.SHORT);
          loadlai();
        }
        if (result.status == 0) {
          ToastAndroid.show(result.message, ToastAndroid.SHORT);
          loadlai();
        }
      }
    );
  };
  const DeleteCart = (quantity, product_detail_id, item_id) => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn tiếp tục không?",
      [
        {
          text: "No",
          onPress: () => console.log("huỷ xoá sản phẩm trong giỏ hàng"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            UpdateCreateCart(Cart_id, product_detail_id, 0).then((result) => {
              if (result.status == 1) {
                console.log("result", result);
                updateQuantityByItemId(item_id, quantity - 1);
                loadlai();
              }
              if (result.status == -1) {
                ToastAndroid.show(result.message, ToastAndroid.SHORT);
                loadlai();
              }
              if (result.status == 0) {
                ToastAndroid.show(result.message, ToastAndroid.SHORT);
                loadlai();
              }
            });
          },
        },
      ],
      { cancelable: false }
    );
  };
  function ItemInput({ item, index, handleInputChange }) {
    const [tempQuantity, setTempQuantity] = useState(item.quantity.toString());

    const handleBlur = () => {
      if (parseInt(tempQuantity) !== item.quantity) {
        console.log("Số lượng đã thay đổi");
        handleInputChange(tempQuantity, index);
        setTimeout(() => {
          console.log("Số lượng mới:", parseInt(tempQuantity));
          UpdateCreateCart(
            Cart_id,
            item.ProductDetail.detail_id,
            parseInt(tempQuantity)
          )
            .then((result) => {
              console.log("result", result);
              if (result.status == -1) {
                ToastAndroid.show(result.message, ToastAndroid.SHORT);
                loadlai();
              } else if (result.status == 1) {
                ToastAndroid.show(result.message, ToastAndroid.SHORT);
                updateQuantityByItemId(item.item_id, parseInt(tempQuantity));
                loadlai();
                console.log("result", result);
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
      } else {
        console.log("Số lượng không thay đổi");
      }
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
    <View style={{ flex: 1, marginBottom: "18%" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        style={styles.container}
        nestedScrollEnabled={true}
        horizontal={false}
      >
        <Swipelist
          data={data}
          renderRightItem={(item, index) => (
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View style={styles.all} key={index}>
                <View style={styles.vImage}>
                  <View style={styles.Checkbox}>
                    <Checkbox
                      status={
                        selectedItems.some(
                          (selectedItem) =>
                            selectedItem.item_id === item.item_id
                        )
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={() =>
                        toggleItemSelection(
                          item.item_id,
                          item.ProductDetail.Product.product_price,
                          item.quantity
                        )
                      }
                      color="#3399ff"
                    />
                  </View>

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
                          ? item.ProductDetail.Product.product_name.slice(
                              0,
                              15
                            ) + "..."
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
                            handleGiam(
                              item.quantity,
                              item.ProductDetail.detail_id,
                              item.item_id
                            );
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
                            handleTang(
                              item.quantity,
                              item.ProductDetail.detail_id,
                              item.item_id
                            );
                          }}
                        >
                          <Text style={styles.txtCong}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          )}
          rightOpenValue={110}
          renderHiddenItem={(data, index) => (
            <View style={styles.hiddenItemContainer}>
              <Pressable
                style={styles.deleteButton}
                onPress={() =>
                  DeleteCart(
                    data.quantity,
                    data.ProductDetail.detail_id,
                    data.item_id
                  )
                }
              >
                <Text style={styles.buttonTextdelete}>Xoá</Text>
              </Pressable>
            </View>
          )}
        />
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View style={[styles.totalTextContainer, { flex: 1 }]}>
          <Text style={styles.totalText}>Tổng thanh toán: </Text>
          <Text style={styles.tongtien}>
            {calculateTotal().toLocaleString("de-DE")}
            <Text style={styles.kihieutongtien}>đ</Text>
          </Text>

          <Text style={styles.totalText}>
            Số lượng thanh toán:{" "}
            <Text style={styles.soluongchon}>{selectedItems.length}</Text>
          </Text>
        </View>
        <View style={{ justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ConfirmationOrder", { Orderdata })
            }
            style={[
              styles.paymentButton,
              {
                backgroundColor: isAnyProductSelected
                  ? "rgba(254, 7, 7, 0.8)"
                  : "rgba(205, 206, 206, 0.8)",
              },
            ]}
            disabled={!isAnyProductSelected}
          >
            <Text style={styles.paymentButtonText}>Thanh toán</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: "20%",
  },
  all: {
    flexDirection: "row",
    width: "100%",
    height: 160,
    marginVertical: 5,
    borderRadius: 10,
  },
  Checkbox: {
    justifyContent: "center",
  },
  vImage: {
    flex: 1,
    flexDirection: "row",
  },
  imagee: {
    width: 160,
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
    marginTop: 5,
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
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(222, 250, 253, 0.8)",
    borderRadius: 5,
    height: "11%",
  },
  paymentButton: {
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: "center",
    marginRight: "5%",
    alignItems: "center",
    backgroundColor: "rgba(254, 7, 7, 0.8)",
  },
  paymentButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  totalTextContainer: {
    marginLeft: 15,
    justifyContent: "center",
  },
  tongtien: {
    color: "#F60000",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 15,
  },
  soluongchon: {
    color: "#F60000",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 15,
  },
  kihieutongtien: {
    textDecorationLine: "underline",
  },
});

export default ProductInCart;
