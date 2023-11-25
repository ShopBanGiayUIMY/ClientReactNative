import React, { useState, Component, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import eye from "../../images/eys.jpg";
import face from "../../images/facebook.png";
import google from "../../images/google.png";
import Checkbox from "expo-checkbox";
import useAuth from "../../Services/auth.services";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import logo from "../../assets/images/logo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { AuthStatus } from "../../Services/AuthContext";
export default function Login({ navigation }) {
  const [isloading, setIsLoading] = useState(false);
  const { state, dispatch } = AuthStatus();
  const { InfoAuth } = useAuth();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Đăng nhập",
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
  const { loginUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const checkemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
  const checkInternetConnection = async () => {
    const netInfoState = await NetInfo.fetch();

    if (netInfoState.isConnected) {
      console.log("Đã kết nối với internet");
    } else {
      console.log("Không có kết nối internet");
    }
  };
  const checkinput = (text) => {
    if (checkemail.test(text)) {
      setFormData({ ...formData, email: text, username: "" });
    } else if (usernameRegex.test(text)) {
      setFormData({ ...formData, username: text, email: "" });
    } else {
      setFormData({ ...formData, email: text, username: text });
    }
  };
  const handleLogin = () => {
    try {

      checkInternetConnection();

      if (formData.username.length === 0 && formData.email.length === 0) {
        ToastAndroid.show("Các trường không để rỗng", ToastAndroid.SHORT);
      } else {
        if (!agreeToTerms) {
          ToastAndroid.show(
            "Bạn chưa đồng ý điều khoản !",
            ToastAndroid.SHORT
          );
        }else{
          loginUser(formData).then((result) => {
            if (result && result.success) {
              AsyncStorage.setItem(
                "accesstoken",
                JSON.stringify(result.accesstoken)
              );
              AsyncStorage.setItem("user_id", JSON.stringify(result.user_id));
              AsyncStorage.setItem("isLoggedIn", "true");
              InfoAuth().then((data) => {
                if (data) {
                  dispatch({ type: "USERINFO", payload: data });
                }
              });
    
              setIsLoading(true);
              ToastAndroid.show(result.message, ToastAndroid.SHORT);
              setTimeout(() => {
                setIsLoading(false);
                navigation.replace("SplashStore");
              }, 2000);
            }
            if (result && !result.success && agreeToTerms) {
              ToastAndroid.show(result.message, ToastAndroid.SHORT);
              return false;
            }
    
            
          });
        }
      }
      
    } catch (error) {
      ToastAndroid.show("Lỗi!", ToastAndroid.SHORT);
    }
  };
  return (
    <View style={styles.container}>
      <LoadingScreen isVisible={isloading} navigation={navigation} />
      <Image source={logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.nameapp}>
        Snake Nike <Text style={styles.shop}> Shop</Text>
      </Text>

      <View style={styles.view}>
        <TextInput
          onChangeText={(text) => checkinput(text)}
          style={styles.input}
          placeholder="Enter your username or email"
          autoCapitalize="none"
        />
        <View style={styles.passwordInput}>
          <TextInput
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
            value={formData.password}
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={!isPasswordVisible}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeContainer}
          >
            <Image
              source={eye}
              style={[styles.eye, isPasswordVisible && styles.invisibleEye]}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.checkboxx}>
        <Checkbox
          style={styles.checkbox}
          value={agreeToTerms}
          onValueChange={() => setAgreeToTerms(!agreeToTerms)}
          color={agreeToTerms ? "#4630EB" : undefined}
        />
        <Text style={{ marginLeft: 10, marginTop: 2 }}>Remember me? </Text>
        <Text style={styles.forgotpassword}>Forgot the password?</Text>
      </View>

      <View style={styles.login}>
        <TouchableOpacity onPress={() => handleLogin()}>
          <Text style={styles.touchablecity}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.orWith}>
        <Text>Or With</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonInnerContainer}>
          <Image source={face} style={styles.imagess} />
          <Text style={styles.buttonText}>Signup with Facebook</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer1}>
        <TouchableOpacity style={styles.buttonInnerContainer1}>
          <Image source={google} style={styles.imagess} />
          <Text style={styles.buttonText1}>Signup with Google</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.createaccount}>
        <Text style={styles.texttt}>
          Don't have an account?{" "}
          <Text style={styles.texttt1}>Create an account</Text>
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    flex: 1,
  },
  logo: {
    width: 90,
    height: 90,
    marginTop: 20,
  },
  nameapp: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  shop: {
    color: "rgba(255, 198, 0, 1)",
  },
  view: {
    marginTop: 20,
  },
  input: {
    borderRadius: 10,
    borderWidth: 1.5,
    height: 45,
    width: 300,
    marginTop: 20,
    paddingHorizontal: 20,
    borderColor: "gray",
  },
  passwordInput: {
    position: "relative",
  },
  eyeContainer: {
    position: "absolute",
    top: 34,
    right: 15,
    justifyContent: "center",
  },
  eye: {
    width: 20,
    height: 20,
  },
  invisibleEye: {
    opacity: 0.3,
  },
  checkboxx: {
    marginTop: 15,
    color: "gray",
    flexDirection: "row",
  },
  forgotpassword: {
    marginLeft: 54,
    marginTop: 4,
    fontSize: 10,
    color: "red",
    textDecorationLine: "underline",
  },
  login: {
    marginTop: 25,
    borderWidth: 1,
    backgroundColor: "rgba(14, 100, 210, 1)",
    borderRadius: 10,
    width: 300,
    height: 45,
    borderColor: "white",
  },
  touchablecity: {
    color: "white",
    textAlign: "center",
    marginTop: 12,
    fontSize: 15,
    width: "100%",
  },
  orWith: {
    marginTop: 10,
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "center",
  },
  buttonContainer: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "rgba(14, 100, 210, 1)", // Add some padding for better spacing
    marginTop: 10,
    width: 300,
    borderColor: "white",
  },
  buttonInnerContainer: {
    flexDirection: "row", // Arrange the image and text horizontally
    alignItems: "center", // Center the items vertically
    padding: 10,
  },
  buttonText: {
    marginLeft: 60,
    color: "white", // Add some left margin to create space between the image and text
  },
  imagess: {
    width: 20,
    height: 20,
    marginLeft: 15,
  },
  buttonContainer1: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: 30,
    width: 300,
    borderColor: "white",
  },
  buttonInnerContainer1: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  buttonText1: {
    marginLeft: 60,
    color: "black",
  },
  imagess1: {
    width: 20,
    height: 20,
    marginLeft: 15,
  },
  createaccount: {
    marginTop: 30,
    width: "100%",
    flexDirection: "row",
    paddingStart: 85,
  },
  texttt1: {
    textAlign: "center",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  icon: {
    fontSize: 20,
    color: "#7DDDFF",
    marginTop: 3,
  },
});
