import React from "react";
import { View, StyleSheet, ScrollView,Text,TouchableOpacity,Image } from "react-native";
import change from "../../images/ReChange.png";
import wait from "../../images/2.png";
import ship from "../../images/3.png";
import mess from "../../images/4.png";
import pay from "../../images/5.png";

export default OrderInfo = ({ navigation }) => {
  return (
    <View style={styles.iconsContainer}>
    <View>
   <View style={styles.info}>
      <Text style={styles.label}>Đơn hàng của tôi</Text>
      <TouchableOpacity onPress={()=>{alert("đang xem tất cả đơn hàng")}}>
        <Text style={styles.viewAllOrders}>Xem tất cả đơn hàng {">"}</Text>
      </TouchableOpacity>
    </View>
   </View>
   <View  style={styles.Containerinfo}>
      <TouchableOpacity style={styles.iconItem}>
        <Image style={styles.iconImage} source={wait} />
        <Text style={styles.iconText}>Chờ Thanh Toán</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconItem}>
        <Image style={styles.iconImage} source={ship} />
        <Text style={styles.iconText}>Chờ Vận Chuyển</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconItem}>
        <Image style={styles.iconImage} source={mess} />
        <Text style={styles.iconText}>Chờ Giao Hàng</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconItem}>
        <Image style={styles.iconImage} source={pay} />
        <Text style={styles.iconText}>Đơn đã đổi trả & hủy đơn</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconItem}>
        <Image style={styles.iconImage} source={change} />
        <Text style={styles.iconText}>Phản hồi Về Sản Phẩm</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Containerinfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 10,
    height:90,
  },
  
  iconsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  iconItem: {
    alignItems: "center",
    marginBottom: 20,
    width: "15%", // Adjusted width to fit three items in a row
  },
  iconImage: {
    width: 30,
    height: 30,
  },
  iconText: {
    marginTop: 5,
    fontSize: 11,
    textAlign: "center",
    color: "#333",
    fontWeight: "bold",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  viewAllOrders: {
    fontSize: 16,
    color: "#ff6600",
    marginHorizontal: 50,
    marginVertical: 3,
  },
  info: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 50,
  },
});


