import React, { useState, Component, useLayoutEffect, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
const windowWidth = Dimensions.get("window").width;
import ModalCoupon from "./modal.coupon";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CouponComponent from "../../components/Coupon/CouponComponent";
export default function Coupon({ navigation }) {
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isclick, setIsClick] = useState(false);
  useEffect(() => {
    // Define the API URL
    const apiUrl =
      "https://653caee5d5d6790f5ec82b3c.mockapi.io/api/v1/vouchers  ";
    // Make the GET request using fetch
    fetch(apiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        // Handle the retrieved data by updating the state
        setData(responseData);
        console.log("đã load dữ liệu thành công");
      })
      .catch((error) => {
        console.error("Đang gặp lỗi vui lòng chờ đợi trong giây lát:");
      });
  }, [refreshing]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Mã giảm giá",
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
  const fun_handlePress = (item) => {
    setIsClick(!isclick);
  };
  const handlePresSearch = (item) => {
    console.log(item);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.modal}> 
      <ModalCoupon
        check={isclick}
        handlePress={() => setIsClick(false)}
        fun_search={handlePresSearch}
      />
      </View>
     
      <View style={styles.header}>
        <Pressable style={styles.textHeader}
         onPress={fun_handlePress}>
          <Image
            source={{ uri: "https://iili.io/JqAuyDN.png" }}
            style={styles.img}
          />
          <Text style={styles.text}>Nhập mã voucher</Text>
        </Pressable>
      </View>
      <View>
        {data &&
          data.map((item, index) => (
            <CouponComponent
              key={index}
              dataVouchers={item}
              fun_={() => handlePresDetailProduct(item)}
            />
          ))}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(216, 234, 245, 0.8)",
  },
  icon: {
    marginLeft: 5,
  },
  header: {
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 10,
    marginHorizontal: 30,
    marginRight: 40,
    borderRadius: 10,
  },
  textHeader: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    fontSize: 20,
    justifyContent: "center",
    alignContent: "center",
  },
  img: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
    color: "rgba(28, 28, 28, 1)",
  },
});
