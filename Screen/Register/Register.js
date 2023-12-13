import React, { Component, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ActivityIndicator,
  Modal,
} from "react-native";
import logo from "../../assets/images/logo.png";
import Icon from "react-native-vector-icons/FontAwesome";
import { MaterialIcons } from "@expo/vector-icons";
import useAuth from "../../Services/auth.services";
import FontAwesome from "react-native-vector-icons/FontAwesome";
export default function Register({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Đăng ký",
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
  const { registerUser } = useAuth();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const regemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const handleRegister = (e) => {
    e.preventDefault();
    if (!regemail.test(formData.email)) {
      ToastAndroid.show("Email không hợp lệ", ToastAndroid.SHORT);
      return false;
    }
    if (formData.username.length < 6) {
      ToastAndroid.show("Username phải có ít nhất 6 ký tự", ToastAndroid.SHORT);
      return false;
    }
    if (formData.password.length < 6) {
      ToastAndroid.show("Mật khẩu phải có ít nhất 6 ký tự", ToastAndroid.SHORT);
      return false;
    }
    if (!agreeToTerms) {
      ToastAndroid.show("Bạn chưa đồng ý với điều khoản", ToastAndroid.SHORT);
      return false;
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        registerUser(formData).then((result) => {
          console.log("result", result);
          if (result&& !result.success) {
            ToastAndroid.show(result.message, ToastAndroid.SHORT);
            return false;
          }
          if (result && result.success) {
            ToastAndroid.show(result.message, ToastAndroid.SHORT);
            // navigation.navigate("Login");
            return true;
          }
         
        }
        );

      }, 1000);
   
    }
  };

  return (
    <View style={styles.container}>
      <Modal transparent={true} animationType="slide" visible={loading}>
        <View style={styles.modalContainer}>
          <ActivityIndicator size="large" color="#DFDFDF" />
        </View>
      </Modal>

      <Image source={logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.nameapp}>
      Nike Sneaker<Text style={styles.shop}> Shop</Text>
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setFormData({ ...formData, fullname: text })}
          value={formData.fullname}
          style={styles.input}
          placeholder="Enter Your FullName"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          value={formData.email}
          style={styles.input}
          placeholder="Enter Your Email"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setFormData({ ...formData, username: text })}
          value={formData.username}
          style={styles.input}
          placeholder="Enter Your Username"
        />
      </View>
      <View style={styles.inputContainer_pass}>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Password"
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          value={formData.password}
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity
          style={styles.passwordVisible}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <Icon
            name={passwordVisible ? "eye-slash" : "eye"}
            size={20}
            color="gray"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.checkBoxContainer}>
        <TouchableOpacity
          style={styles.checkBoxContainer}
          onPress={() => setAgreeToTerms(!agreeToTerms)}
        >
          {agreeToTerms ? (
            <MaterialIcons
              name="check-box"
              size={24}
              color="#0E64D2"
              style={styles.icon_checkbox}
            />
          ) : (
            <Icon
              name="square-o"
              size={24}
              color="gray"
              style={styles.icon_checkbox}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.text_checkbox}>
          I agree to Terms and Conditions
        </Text>
      </View>
      <View style={styles.inputContainerButton}>
        <TouchableOpacity style={styles.register} onPress={handleRegister}>
          <Text style={styles.TextRegister}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container_line}>
        <View style={styles.line_left} />
        <Text style={styles.text_line}>Or With</Text>
        <View style={styles.line_right} />
      </View>
      <View style={styles.inputContainerButton}>
        <TouchableOpacity style={styles.registerbyfb}>
          <View style={styles.fbIconContainer}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/5968/5968764.png",
              }}
              style={styles.fbIcon}
            />
          </View>
          <Text style={styles.TextRegister}>Signup with Facebook</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainerButton}>
        <TouchableOpacity style={styles.registerbygoogle}>
          <View style={styles.ggIconContainer}>
            <Image
              source={{
                uri: "https://www.nicepng.com/png/full/133-1334497_google-favicon-vector-google-g-logo-png.png",
              }}
              style={styles.ggIcon}
            />
          </View>
          <Text style={styles.TextRegisterGoogle}>Signup with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  inputContainer: {
    width: "75%",
    marginBottom: 20,
  },
  inputContainer_pass: {
    width: "75%",
    marginBottom: 10,
  },
  inputContainerButton: {
    width: "75%",
    marginBottom: 10,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    fontSize: 17,
  },
  passwordVisible: {
    position: "absolute",
    right: 15,
    top: 15,
    justifyContent: "center",
    textAlign: "center",
  },
  register: {
    backgroundColor: "#0E64D2",
    borderRadius: 20,
    width: "100%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 29,
  },
  registerbyfb: {
    width: "100%",
    height: 45,
    borderRadius: 20,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#1877F2",
    textAlign: "center",
    justifyContent: "center",
  },
  fbIconContainer: {
    alignItems: "center",
    position: "relative",
    right: 20,
    justifyContent: "center",
    top: -2,
  },
  fbIcon: {
    width: 30,
    height: 30,
  },
  registerbygoogle: {
    width: "80%",
    height: 45,
    borderRadius: 20,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderColor: "gray",
    borderWidth: 1,
    textAlign: "center",
    justifyContent: "center",
  },
  ggIconContainer: {
    alignItems: "center",
    position: "relative",
    right: 30,
    justifyContent: "center",
    top: 0,
  },
  ggIcon: {
    width: 35,
    height: 35,
  },
  TextRegister: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  TextRegisterGoogle: {
    color: "#787878",
    fontSize: 17,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  container_line: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  line_left: {
    flex: 1,
    height: 2,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    marginLeft: 55,
  },
  line_right: {
    flex: 1,
    height: 2,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    marginRight: 55,
  },
  text_line: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.5)",
    fontWeight: "bold",
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 0,
  },
  icon_checkbox: {
    marginRight: 10,
    width: 24,
    opacity: 0.8,
  },
  text_checkbox: {
    fontSize: 16,
    color: "#768487",
    marginTop: -3,
    width:185,
  },
  icon: {
    fontSize: 20,
    color: "#7DDDFF",
    marginTop: 0,
  },
  logo: {
    width: 90,
    height: 90,
    marginTop: 10,
  },
  nameapp: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  shop: {
    color: "rgba(255, 198, 0, 1)",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
});
