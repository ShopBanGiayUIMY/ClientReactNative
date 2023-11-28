import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSearch,
  faQrcode,
  faShoppingCart,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
const { width } = Dimensions.get("window");

const Header = (props) => {
  const { navigation } = props;
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
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              handlePress();
            }}
          >
            <FontAwesomeIcon
              icon={faShoppingCart}
              size={24}
              style={styles.iconitem}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <FontAwesomeIcon icon={faBell} size={24} style={styles.iconitem} />
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
    flex: 4,
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
    justifyContent: "space-between",
    marginLeft: 10,
  },
  icon: {
    width: 30,
    height: 25,
    alignSelf: "center",
    color: "black",
    marginRight: 10,
  },
  iconitem: {
    width: 30,
    height: 30,
    alignSelf: "center",
    color: "black",
  },
};

export default Header;
