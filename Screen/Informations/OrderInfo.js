import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import PENDING from "../../images/1.png";
import PROCESSING from "../../images/2.png";
import SHIPPING from "../../images/3.png";
import SHIPPED from "../../images/4.png";
import DELIVERED from "../../images/5.png";
import CANCELED from "../../images/6.png";

import useAuth from "../../Services/auth.services";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthStatus } from "../../Services/AuthContext";

export default OrderInfo = () => {
  const { totalOrderStatus } = useAuth();
  const [totalOrderStatusItem, setTotalOrderStatusItem] = useState([]);
  const navigation = useNavigation();
  const { state, dispatch } = AuthStatus();
  const hanldChoThanhToan = (key) => {
    navigation.navigate("MainTabPurchase", { initialTabIndex: key });
  };
  // navigation.addListener("focus", () => {
  //   if (state.isLoggedIn) {
  //     totalOrderStatus().then((res) => {
  //       setTotalOrderStatusItem(res.data);
  //       console.log("res.data");
  //     });
  //   }
  // });
  useEffect(() => {
    if (state.isLoggedIn) {
      totalOrderStatus().then((res) => {
        setTotalOrderStatusItem(res.data);
      });
    }
  }, [navigation, state.isLoggedIn]);
  const getIconByStatusId = (statusId) => {
    switch (statusId) {
      case 1:
        return PROCESSING;
      case 2:
        return PENDING;
      case 3:
        return SHIPPING;
      case 4:
        return SHIPPED;
      case 5:
        return DELIVERED;
      case 6:
        return CANCELED;
      default:
        return null; // Trả về hình ảnh mặc định hoặc null nếu không tìm thấy
    }
  };
  return state.isLoggedIn ? (
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
        {totalOrderStatusItem.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.iconItem}
            onPress={() => {
              hanldChoThanhToan(item.status_id - 1);
            }}
          >
            <Image
              style={styles.iconImage}
              source={getIconByStatusId(item.status_id)}
            />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.total_orders}</Text>
            </View>
            <Text style={styles.iconText}>{item.status_name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  ) : (
    <View style={styles.check}>
      <Text style={styles.checkText}>Đăng nhập để xem đơn hàng</Text>
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
    height: 80,
  },
  check: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  checkText: {
    fontSize: 16,
    color: "rgba(166, 179, 185, 0.8)",
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
    width: "15%",
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
    right: 7,
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
