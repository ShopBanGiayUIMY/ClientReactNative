import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
  faShareNodes,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { TouchableOpacity } from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const EXTAR_HEIGHT = 542.5;
import { AuthStatus } from "../../Services/AuthContext";

import DropDownPicker from "react-native-dropdown-picker";
const CpnProductDetail = ({ product, navigation }) => {
  const hanldeBack = () => {
    navigation.navigate("ListProduct");
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    { label: "M", value: "1" },
    { label: "L", value: "2" },
    { label: "XL", value: "3" },
    { label: "XXL", value: "4" },
  ]);
  //thêm giỏ hàng tại đây
  const { state, dispatch } = AuthStatus();

  const handleBack = () => {
    navigation.navigate("ListProduct");
  };

  const hanldeAddToCart = async () => {
    alert("Bạn đã thêm " + product.name + " vào giỏ hàng! ");
  };
  return (
    <View style={styles.container}>
      <View style={styles.viewTop}>
        <TouchableOpacity
          onPress={() => {
            hanldeBack();
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={20} />
        </TouchableOpacity>
        <Text style={styles.txtDetail}>Chi tiết sản phẩm</Text>
        <TouchableOpacity>
          <FontAwesomeIcon icon={faShareNodes} size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.vImage}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ScrollView horizontal={true} style={{ flex: 1 }}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: product.thumbnail }}
                style={{ width: 380, height: 350, borderRadius: 10 }}
              />
            </View>
          </ScrollView>
          <View style={styles.dropdownContainer}>
            <View style={styles.dropdown}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                multiple={true}
                min={1}
                max={1}
                autoScroll={true}
                style={{ width: "100%", height: 40 }}
                zIndex={9999}
              />
            </View>
            <View style={styles.dropdown}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                multiple={true}
                min={1}
                max={5}
                autoScroll={true}
                style={{ width: "100%", height: 40 }}
              />
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
        </ScrollView>
        <Pressable
          style={{
            position: "absolute",
            width: 380,
            height: 70,
            backgroundColor: "#DB3022",
            justifyContent: "center",
            top: 650,
            alignSelf: "center",
            marginStart: 10,
            marginEnd: 10,
            borderRadius: 25,
          }}
          onPress={() => {
            hanldeAddToCart();
          }}
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
