import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  Image,
  Pressable,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import DropDownPicker from "react-native-dropdown-picker";
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
import useAuth from "../../Services/auth.services";
import { AuthStatus } from "../../Services/AuthContext";
import DataLoadingCart from "../../components/loading/DataLoadingCart";
import {soluonggiohang} from "../../Services/Redux/action/Actions";
const COLORS = {
  black: "#3C3C3C",
  gray: "#F5F5F5",
  white: "#FFFFFF",
  red: "#EE4B2B",
};
const { height, width } = Dimensions.get("window");
import { useDispatch, useSelector } from "react-redux";
export default function ModalBottom(props) {
  const { closeDrawer, openDrawer, dataprod } = props;
  const [cartUpdate, setCartUpdate] = useState(0);
  const { UpdateCreateCart } = useAuth();
  const { state } = AuthStatus();
  const dispatchredux = useDispatch();
  // dữ liệu là
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [formData, setFormData] = useState({
    product_detail_id: null,
    quantity: quantity,
  });
  const addCart = async () => {
    if (formData.product_detail_id === null) {
      alert("Vui lòng chọn size");
      return;
    }
    console.log("formdata", formData.quantity);
    const data = await UpdateCreateCart(
      state.userInfo.cart_id,
      formData.product_detail_id,
      quantity
    );
    console.log(data);
    if (data) {
      alert("Thêm vào giỏ hàng thành công");
      setCartUpdate(cartUpdate + 1);
      dispatchredux(soluonggiohang(cartUpdate + 1));
    }
  };

  const handleSizeSelection = (detail, size, color) => {
    setSelectedSize(size);
    setFormData({ ...formData, product_detail_id: detail });
    console.log(detail, size, color, quantity);
  };
  return (
    <View style={styles.container}>
      <DataLoadingCart key={cartUpdate} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={openDrawer}
        onRequestClose={closeDrawer}
      >
        <Pressable
          style={styles.modalContainer}
          onPress={closeDrawer}
        ></Pressable>
        <SafeAreaView
          style={{
            flex: 1,
          }}
        >
          <Pressable
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            }}
          >
            <View
              style={{
                backgroundColor: COLORS.white,
                borderTopRightRadius: 36,
                borderTopLeftRadius: 36,
                paddingHorizontal: 22,
                paddingVertical: 22,
                position: "absolute",
                width: "100%",
                bottom: 0,
              }}
            >
              <View style={{ marginVertical: 22 }}>
                <Text style={styles.h4}>Chọn Size:</Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 18,
                  }}
                >
                  {dataprod.ProductDetails.map((detail, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.checkboxContainer,
                        selectedSize === detail.size && styles.selectedCheckbox,
                      ]}
                      onPress={() =>
                        handleSizeSelection(
                          detail.detail_id,
                          detail.size,
                          detail.color
                        )
                      }
                    >
                      <Text
                        style={[
                          selectedSize === detail.size && styles.checkboxText,
                        ]}
                      >
                        {detail.size}
                      </Text>
                      <Text
                        style={[
                          selectedSize === detail.size && styles.checkboxText,
                        ]}
                      >
                        {detail.color}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <Text style={styles.h4}>Qty</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginVertical: 6,
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.gray,
                    height: 48,
                    width: 134,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 12,
                    borderRadius: 24,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      if (quantity > 1) {
                        setQuantity(quantity - 1);
                      }
                    }}
                    style={{
                      height: 32,
                      width: 32,
                      borderRadius: 16,
                      backgroundColor: COLORS.white,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Feather name="minus" size={24} color={COLORS.black} />
                  </TouchableOpacity>
                  <Text style={styles.body3}>{quantity}</Text>

                  <TouchableOpacity
                    onPress={() => {
                      setQuantity((prevQuantity) => prevQuantity + 1);
                    }}
                    style={{
                      height: 32,
                      width: 32,
                      borderRadius: 16,
                      backgroundColor: COLORS.white,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Feather name="plus" size={24} color={COLORS.black} />
                  </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.body4}>Tạm tính</Text>
                  <Text style={styles.h3}>23000đ</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  addCart();
                }}
              >
                <Feather name="shopping-bag" size={24} color={COLORS.white} />

                <Text
                  style={{
                    color: COLORS.white,
                    marginLeft: 12,
                  }}
                >
                  Thêm vào giỏ hàng
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  checkboxContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    width: 70,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.gray,
    marginRight: 12,
  },
  selectedCheckbox: {
    backgroundColor: COLORS.black,
  },
  checkboxText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  button: {
    marginTop: 12,
    height: 60,
    width: width - 44,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.black,
  },
});
