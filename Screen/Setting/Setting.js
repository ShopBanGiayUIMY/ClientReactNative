import React, { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { AuthStatus } from "../../Services/AuthContext";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Setting = ({ isVisible, navigation }) => {
  const { state, dispatch } = AuthStatus();
  const [isloading, setIsloading] = useState(false);
  const logout = async () => {
    // Xóa trạng thái đăng nhập khỏi AsyncStorage khi người dùng đăng xuất
    await AsyncStorage.removeItem("isLoggedIn");
    await AsyncStorage.removeItem("user_id");
    await AsyncStorage.removeItem("accesstoken");
    dispatch({ type: "LOGOUT" });
    setIsloading(true);
    setTimeout(() => {
      setIsloading(false);
      navigation.replace("SplashStore");
    }, 2000);
  };
  const handleNavigation = (screenName) => {
    navigation.replace(screenName);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Cài đặt",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 5, marginRight: 10 }}
        >
          <FontAwesome
            name="arrow-left"
            size={24}
            color="blue"
            style={styles.icon}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <LoadingScreen isVisible={isloading} navigation={navigation} />
      <TouchableOpacity
        onPress={() => handleNavigation("AccountInfo")}
        style={styles.item}
      >
        <Text style={styles.itemText}>Thông tin tài khoản</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleNavigation("Address")}
        style={styles.item}
      >
        <Text style={styles.itemText}>Địa chỉ</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleNavigation("Country")}
        style={styles.item}
      >
        <Text style={styles.itemText}>Quốc gia</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleNavigation("Help")}
        style={styles.item}
      >
        <Text style={styles.itemText}>Trợ giúp</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleNavigation("Feedback")}
        style={styles.item}
      >
        <Text style={styles.itemText}>Phản hồi</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => logout()}
        style={styles.containlogout}
      >
        <Text style={styles.itemlogout}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#D8D8F7",
    paddingTop: 10,
  },
  item: {
    padding: 15,
    backgroundColor: "#E6F1F3",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    marginTop: 2,
  },
  itemText: {
    fontSize: 18,
    paddingLeft: 10,
  },
  itemlogout: {
    fontSize: 30,
    paddingLeft: 10,
    color: "red",
    textAlign: "center",
    fontWeight: "bold",
  },
  icon: {
    fontSize: 20,
    color: "#7DDDFF",
    marginTop: 3,
  },
  containlogout: {
    padding: 15,
    backgroundColor: "#E6F1F3",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    marginTop: 20,
  },
});

export default Setting;
