import React,{useState} from "react";
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
import login from "../../images/login.png";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { AuthStatus } from "../../Services/AuthContext";


export default function Information({ navigation }) {
  const { state ,dispatch} = AuthStatus();
  console.log(state.isLoggedIn);
  const handleLogin = () => {
  
    navigation.navigate("Login"); 
  };
  const handleRegister = () => {
    navigation.navigate("Register"); 
  };

  return (
    <View style={styles.container}>
      <Image style={styles.backgroundImage} source={background} />
      <View style={styles.header}>
        {!state.isLoggedIn ? (
          <View>
            <Text style={{marginTop:50, textAlign: "center",fontSize:15 }}>
              Đăng nhập để trải nghiệm tốt hơn nhé!
            </Text>
            <View
              style={{
                width: "100%",
                position: "absolute",
                top: 80,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  width: 100,
                  height: 45,
                  marginRight: 15,
                }}
                onPress={handleLogin}
              >
                <Image
                  style={{
                    width: "100%",
                    borderRadius: 5,
                    height: 45,
                  }}
                  source={login}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: 100,
                  height: 45,
                  marginLeft: -10,
                  borderColor: "rgba(213, 79, 133, 0.68)",
                  borderWidth: 2,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={handleRegister}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "rgba(0, 123, 167, 0.67)",
                    fontStyle: "normal",
                    fontWeight: "800",
                  }}
                >
                  Đăng Ký
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              style={styles.settingsIcon}
              onPress={() => navigation.navigate("Setting")}
            >
              <FontAwesomeIcon icon={faCog} size={24} style={styles.cogIcon} />
            </TouchableOpacity>
            <View style={styles.userInfoContainer}>
              <Image style={styles.avatar} source={avatar} />
              <View style={styles.textContainer}>
                <Text style={styles.userName}>Nguyễn Văn Huy</Text>
                <Text style={styles.likeproducts}>3 sản phẩm đã thích</Text>
                <Text style={styles.saleOffUser}>100 Phiếu giảm giá</Text>
              </View>
            </View>
          </View>
        )}
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
    height: 190,
  },
  header: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
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
    marginTop: 0,
    color: "#333",
  },
  likeproducts: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  saleOffUser: {
    fontSize: 15,
    color: "#666",
    marginTop: 5,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  textContainer: {
    marginLeft: 15,
  },
});
