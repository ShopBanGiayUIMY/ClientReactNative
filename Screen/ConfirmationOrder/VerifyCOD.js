import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { PulseIndicator } from "react-native-indicators";
import { useNavigation } from "@react-navigation/native";

const VerifyCOD = () => {
  const [showIndicator, setShowIndicator] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIndicator(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#FF512F", "#DD2476"]} style={styles.gradient}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Cart");
            }}
          >
            <FontAwesome name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.notification}>
            <FontAwesome5 name="bell" size={24} color="#fff" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>29</Text>
            </View>
          </View>
        </View>
        {showIndicator && (
          <View style={styles.content}>
            <PulseIndicator color="white" size={100} />
          </View>
        )}
        {!showIndicator && (
          <View style={styles.content}>
            <View style={styles.alertBox}>
              <FontAwesome5 name="exclamation-circle" size={24} color="#fff" />
              <Text style={styles.alertText}>Đang chờ thanh toán</Text>
            </View>
            <Text style={styles.description}>
              Cùng UIMY bảo vệ quyền lợi của bạn - Chỉ nhấn & thanh toán khi đơn
              mua ở trạng thái "Đang giao hàng".
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Trang chủ</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Đơn mua</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notification: {
    flexDirection: "row",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    right: -6,
    top: -3,
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
  content: {
    paddingTop: 50,
  },
  alertBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  alertText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },
  description: {
    color: "white",
    textAlign: "center",
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});

export default VerifyCOD;
