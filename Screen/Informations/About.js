import React from "react";
import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";

const About = ({navigation}) => {
  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  };
  return (
    <ScrollView style={{marginBottom:"14%"}}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          marginTop: 5,
          marginBottom: 5,
          backgroundColor: "#fff",
          width: "100%",
          height: 50,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image
          style={{ width: 30, height: 30, marginRight: 10, marginStart: 5,position:"relative" }}
          source={{ uri: "https://iili.io/JdjSf9t.png" }}
        />
        <Text style={{ fontSize: 20, position:"absolute",left:45 }}>Khách hàng thân thiết</Text>
        <Image
          style={{ width: 25, height: 25,marginRight: 10, marginStart: 5,tintColor:"#CDCDCD" }}
          source={{ uri: "https://cdn-icons-png.flaticon.com/128/271/271228.png" }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          marginTop: 5,
          marginBottom: 5,
          backgroundColor: "#fff",
          width: "100%",
          height: 50,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image
          style={{ width: 32, height: 30, marginRight: 8, marginStart: 5 }}
          source={{ uri: "https://iili.io/JdjSFSI.png" }}
        />
        <Text style={{ fontSize: 20,position:"absolute",left:45 }}>Đã Thích</Text>
        <Image
          style={{ width: 25, height: 25,marginRight: 10, marginStart: 5,tintColor:"#CDCDCD" }}
          source={{ uri: "https://cdn-icons-png.flaticon.com/128/271/271228.png" }}
        />
      </TouchableOpacity>
      <TouchableOpacity
      onPress={() => handleNavigation("Coupon")}
        style={{
          flexDirection: "row",
          marginTop: 5,
          marginBottom: 5,
          backgroundColor: "#fff",
          width: "100%",
          height: 50,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image
          style={{ width: 40, height: 40, marginRight: 10, marginStart: 0,position:"relative" }}
          source={{ uri: "https://iili.io/JfxcmOb.png" }}
        />
        <Text style={{ fontSize: 20, position:"absolute",left:45 }}>Mã giảm giá</Text>
        <Image
          style={{ width: 25, height: 25,marginRight: 10, marginStart: 5,tintColor:"#CDCDCD" }}
          source={{ uri: "https://cdn-icons-png.flaticon.com/128/271/271228.png" }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          marginTop: 5,
          marginBottom: 5,
          backgroundColor: "#fff",
          width: "100%",
          height: 50,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image
          style={{ width: 30, height: 30, marginRight: 10, marginStart: 5 }}
          source={{ uri: "https://iili.io/JdjS3cN.png" }}
        />
        <Text style={{ fontSize: 20,position:"absolute",left:45 }}>Đã xem gần đây </Text>
        <Image
          style={{ width: 25, height: 25,marginRight: 10, marginStart: 5,tintColor:"#CDCDCD" }}
          source={{ uri: "https://cdn-icons-png.flaticon.com/128/271/271228.png" }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          marginTop: 5,
          marginBottom: 5,
          backgroundColor: "#fff",
          width: "100%",
          height: 50,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image
          style={{ width: 30, height: 30, marginRight: 10, marginStart: 5 }}
          source={{ uri: "https://iili.io/HgVbF2t.png" }}
        />
        <Text style={{ fontSize: 20,position:"absolute",left:45 }}>Đánh giá của tôi</Text>
        <Image
          style={{ width: 25, height: 25,marginRight: 10, marginStart: 5,tintColor:"#CDCDCD" }}
          source={{ uri: "https://cdn-icons-png.flaticon.com/128/271/271228.png" }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          marginTop: 5,
          marginBottom: 5,
          backgroundColor: "#fff",
          width: "100%",
          height: 50,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image
          style={{ width: 30, height: 30, marginRight: 10, marginStart: 5 }}
          source={{ uri: "https://iili.io/JdjS2Fp.png" }}
        />
        <Text style={{ fontSize: 20,position:"absolute",left:45 }}>Thiết lập tài khoản </Text>
        <Image
          style={{ width: 25, height: 25,marginRight: 10, marginStart: 5,tintColor:"#CDCDCD" }}
          source={{ uri: "https://cdn-icons-png.flaticon.com/128/271/271228.png" }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          marginTop: 5,
          marginBottom: 5,
          backgroundColor: "#fff",
          width: "100%",
          height: 50,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image
          style={{ width: 30, height: 30, marginRight: 10, marginStart: 5 }}
          source={{ uri: "https://iili.io/JdjSJPR.png" }}
        />
        <Text style={{ fontSize: 20,position:"absolute",left:45 }}>Trò chuyện với UIMY </Text>
        <Image
          style={{ width: 25, height: 25,marginRight: 10, marginStart: 5,tintColor:"#CDCDCD" }}
          source={{ uri: "https://cdn-icons-png.flaticon.com/128/271/271228.png" }}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default About;
