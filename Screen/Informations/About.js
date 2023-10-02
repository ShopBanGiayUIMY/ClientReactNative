import React from "react";
import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";

const About = () => {
  return (
    <ScrollView>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          marginTop: 5,
          marginBottom: 5,
          backgroundColor: "#fff",
          width: "100%",
          height: 50,
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: 30, height: 30, marginRight: 10, marginStart: 5 }}
          source={{ uri: "https://iili.io/JdjSf9t.png" }}
        />
        <Text style={{ fontSize: 20 }}>Khách hàng thân thiết</Text>
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
        }}
      >
        <Image
          style={{ width: 30, height: 30, marginRight: 10, marginStart: 5 }}
          source={{ uri: "https://iili.io/JdjSFSI.png" }}
        />
        <Text style={{ fontSize: 20 }}>Đã Thích</Text>
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
        }}
      >
        <Image
          style={{ width: 30, height: 30, marginRight: 10, marginStart: 5 }}
          source={{ uri: "https://iili.io/JdjS3cN.png" }}
        />
        <Text style={{ fontSize: 20 }}>Đã xem gần đây </Text>
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
        }}
      >
        <Image
          style={{ width: 30, height: 30, marginRight: 10, marginStart: 5 }}
          source={{ uri: "https://iili.io/HgVbF2t.png" }}
        />
        <Text style={{ fontSize: 20 }}>Đánh giá của tôi</Text>
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
        }}
      >
        <Image
          style={{ width: 30, height: 30, marginRight: 10, marginStart: 5 }}
          source={{ uri: "https://iili.io/JdjS2Fp.png" }}
        />
        <Text style={{ fontSize: 20 }}>Thiết lập tài khoản </Text>
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
        }}
      >
        <Image
          style={{ width: 30, height: 30, marginRight: 10, marginStart: 5 }}
          source={{ uri: "https://iili.io/JdjSJPR.png" }}
        />
        <Text style={{ fontSize: 20 }}>Trò chuyện với UIMY </Text>
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
        }}
      >
        <Image
          style={{ width: 30, height: 30, marginRight: 10, marginStart: 5 }}
          source={{ uri: "https://iili.io/JdjSJPR.png" }}
        />
        <Text style={{ fontSize: 20 }}>Log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default About;
