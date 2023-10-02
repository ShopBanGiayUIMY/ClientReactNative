import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import React, { useState } from "react";

const Payment = () => {
  return (
    <View>
      {/* <View
        style={
          {
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: "red",
            justifyContent: "center",
            alignSelf: "center",
          }
        }
      >
        <Text style={{ color: "white", fontSize: 16 }}>{"+1"}</Text>
      </View> */}
      <TouchableOpacity>
        <Text style={{ fontSize: 20, color: "white", textAlign: "center" }}>
          Thêm vào giỏ hàng
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Payment;
