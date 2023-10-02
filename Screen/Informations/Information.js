import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import avatar from "../../images/avatar.png";
import background from "../../images/backgroundprofile.png";
import change from "../../images/ReChange.png";
import wait from "../../images/2.png";
import ship from "../../images/3.png";
import mess from "../../images/4.png";
import pay from "../../images/5.png";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import Repurchase from "./Repurchase";
import About from "./About";

export default function Information({ navigation }) {
  const handleLogin = () => {
    navigation.navigate("Register"); // Corrected the typo here
  };

  return (
    <View style={styles.container}>
      <Image style={styles.backgroundImage} source={background} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.settingsIcon}>
          <FontAwesomeIcon icon={faCog} size={24} style={styles.cogIcon} />
        </TouchableOpacity>
        <View style={{ left: -100 }}>
          <Image style={styles.avatar} source={avatar} />
          <Text style={styles.userName}>Example</Text>
          <Text style={styles.userEmail}>example@example.com</Text>
          <Text style={styles.saleOffUser}>100 Phiếu giảm giá</Text>
        </View>
        <View
          style={{
            width: "50%",
            height: 50,
            position: "absolute",
            right: 5,
            top: 130,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              color: "#841584",
              backgroundColor: "#DAA3A3",
              width: "49%",
              borderRadius: 5,
            }}
            onPress={() => navigation.navigate("Login")} // Corrected the function call
          >
            <Text
              style={{
                paddingTop: 12,
                textAlign: "center",
                color: "white",
                fontStyle: "normal",
                fontWeight: "800",
              }}
            >
              Đăng nhập
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              color: "#841584",
              backgroundColor: "#DE6247",
              width: "49%",
              borderRadius: 5,
            }}
            onPress={handleLogin} // Corrected the function call
          >
            <Text
              style={{
                paddingTop: 12,
                textAlign: "center",
                color: "white",
                fontStyle: "normal",
                fontWeight: "800",
                
              }}
            >
              Đăng Ký
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>Đơn hàng của tôi</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllOrders}>Xem tất cả đơn hàng</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
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
      <View
      >
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 5,
            borderBottomWidth: 0.1,
            shadowOffset: { width: 0, height: 2 }, // Độ dịch chuyển đổ bóng theo chiều ngang và dọc
            shadowOpacity: 0.5, // Độ mờ của đổ bóng
            elevation: 1,
          }}
        >
          <Image
            style={{ width: 30, height: 30, marginRight: 23 }}
            source={{ uri: "https://iili.io/JdjjLmv.png" }}
          />
          <Text style={{ fontSize: 25 }}>Mua lại</Text>
        </View>
        <Repurchase style={{ with: "100%", height: 200 }} />
      </View>
      <View>
        <About />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    width: "100%",
    height: 270,
  },
  header: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  settingsIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 20,
  },
  cogIcon: {
    color: "#fff",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    color: "#333",
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  saleOffUser: {
    fontSize: 15,
    color: "#ff6600", // Shopee's orange color
    marginTop: 5,
    fontWeight: "bold",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    elevation: 2, // Material design shadow
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  viewAllOrders: {
    fontSize: 15,
    color: "#ff6600",
    fontWeight: "bold",
  },
  iconsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  iconItem: {
    alignItems: "center",
    marginBottom: 20,
    width: "15%", // Adjusted width to fit three items in a row
  },
  iconImage: {
    width: 35,
    height: 35,
  },
  iconText: {
    marginTop: 5,
    fontSize: 14,
    textAlign: "center",
    color: "#333",
  },
});