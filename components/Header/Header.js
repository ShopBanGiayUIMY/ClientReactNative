import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSearch,
  faQrcode,
  faShoppingCart,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

const { width } = Dimensions.get("window");
import { AuthStatus } from "../../Services/AuthContext";
import useAuth from "../../Services/auth.services";
const Header = (props) => {
  const { navigation } = props;
  const [totalCart, setTotalCart] = useState(0);
  const { getTotalCart } = useAuth();
  const { state } = AuthStatus();
  const fetchDataCart = async () => {
    try {
      if (state.isLoggedIn) {
        const data = await getTotalCart();
        if (data) {
          setTotalCart(data[0].total_cart_items);
        }
      }
    } catch (error) {
      console.log("Error cart2:", error);
    }
  };
  useEffect(() => {
    fetchDataCart();
  }, []);
  const handlePress = () => {
    navigation.navigate("Cart");
  };
  const openqr = () => {
    navigation.navigate("Qrcode");
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.icon} onPress={openqr}>
          <FontAwesomeIcon icon={faQrcode} size={24} style={styles.iconitem} />
        </TouchableOpacity>
        <TouchableWithoutFeedback>
          <TouchableOpacity style={styles.center}>
            <View style={styles.inputWrapper}>
              <TouchableOpacity
                style={styles.iconsearch}
                onPress={() => navigation.navigate("Search")}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  size={18}
                  style={styles.searchIcon}
                />
              </TouchableOpacity>
              <TextInput
                style={styles.input}
                placeholder="Tìm kiếm..."
                placeholderTextColor="#999"
                onPressIn={() => navigation.navigate("Search")}
              />
            </View>
          </TouchableOpacity>
        </TouchableWithoutFeedback>
        <View style={styles.right}>
          {/* <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              navigation.navigate("Notification");
            }}
          >
            <View style={styles.count_notify}>
              <Text style={styles.count_notify_total}>40</Text>
            </View>

            <FontAwesomeIcon
              icon={faBell}
              size={24}
              style={styles.iconitem}
              color="#363636"
            />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              handlePress();
            }}
          >
            {totalCart > 0 ? (
              <View style={styles.count_cart}>
                <Text style={styles.count_cart_total}>{totalCart}</Text>
              </View>
            ) : null}

            <FontAwesomeIcon
              icon={faShoppingCart}
              size={24}
              color="#363636"
              style={styles.iconitemcart}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  safeArea: {
    backgroundColor: "transparent",
    width: width,
    paddingHorizontal: 10,
  },
  container: {
    flexDirection: "row",
    height: 60,
  },
  center: {
    flex: 9,
    flexDirection: "row",
    alignItems: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    
    borderColor: "rgba(0, 199, 218, 0.8)",
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: "#333", // Màu chữ
  },
  right: {
    flex: 1,
    flexDirection: "row",

    marginLeft: 10,
  },
  icon: {
    width: 30,
    height: 25,
    alignSelf: "center",
    color: "white",
  },
  iconitem: {
    width: 30,
    height: 30,

    color: "black",
  },
  iconitemcart: {
    width: 30,
    height: 30,
    alignSelf: "center",
    color: "black",
    position: "relative",
    top: 1,
  },
  count_cart: {
    position: "absolute",
    borderRadius: 200,
    zIndex: 999,
    top: -13,
    right: -5,
    backgroundColor: "red",
    width: "auto",
    padding: 2,
    height: 21,
    borderWidth: 1,
    borderColor: "#fff",
  },
  count_notify: {
    position: "absolute",
    borderRadius: 200,
    zIndex: 999,
    top: -13,
    right: -0,
    backgroundColor: "red",
    width: "auto",
    padding: 2,

    height: 21,
    borderWidth: 1,
    borderColor: "#fff",
  },
  count_cart_total: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    paddingHorizontal: 5,
  },
  count_notify_total: { color: "#fff", fontSize: 10, fontWeight: "bold" },
};

export default Header;
