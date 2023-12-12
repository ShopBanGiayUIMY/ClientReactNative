import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import change from "../../images/ReChange.png";
import wait from "../../images/2.png";
import ship from "../../images/3.png";
import mess from "../../images/4.png";
import pay from "../../images/5.png";

export default OrderInfo = ({ navigation }) => {
  const hanldChoThanhToan = () => {
   
  };
  return (
    <View style={styles.iconsContainer}>
      <View>
        <View style={styles.info}>
          <Text style={styles.label}>Đơn hàng</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("MainTabPurchase");
            }}
          >
            <Text style={styles.viewAllOrders}>Xem tất cả đơn hàng {">"}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.Containerinfo}>
        <TouchableOpacity
          style={styles.iconItem}
          onPress={() => {
            hanldChoThanhToan();
          }}
        >
          <Image style={styles.iconImage} source={wait} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>29</Text>
          </View>
          <Text style={styles.iconText}>Chờ Thanh Toán</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconItem}>
          <Image style={styles.iconImage} source={ship} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>29</Text>
          </View>
          <Text style={styles.iconText}>Chờ Vận Chuyển</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconItem}>
          <Image style={styles.iconImage} source={mess} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>29</Text>
          </View>
          <Text style={styles.iconText}>Chờ Giao Hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconItem}>
          <Image style={styles.iconImage} source={pay} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>29</Text>
          </View>
          <Text style={styles.iconText}>Đơn đã đổi trả & hủy đơn</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.iconItem}>
          <Image style={styles.iconImage} source={change} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>29</Text>
          </View>
          <Text style={styles.iconText}>Phản hồi Về Sản Phẩm</Text>
        </TouchableOpacity> */}
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
    height: 90,
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
    width: "20%", // Adjusted width to fit three items in a row
  },
  iconImage: {
    width: 30,
    height: 30,
  },
  iconText: {
    marginTop: 5,
    fontSize: 10,
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
    color: "rgba(166, 179, 185, 0.8)",
    marginHorizontal: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 70,
  },
  info: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  badge: {
    position: "absolute",
    right: 12,
    top: -5,
    backgroundColor: "red",
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
  },
});
