// CartBadge.js
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";

const CartBadge = () => {
  const [totalCart, setTotalCart] = useState(0);
  const info = useSelector((state) => state.Reducers.total);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (info > 0) {
          setTotalCart(info);
        } else {
          setTotalCart(0);
        }
      } catch (error) {
        console.log("Error cart1:", error);
      }
    };

    fetchData();
  }, [info]);

  return (
    totalCart > 0 && (
      <View
        style={{
          position: "absolute",
          bottom: 16,
          width: 10,
          height: 10,
          borderRadius: 10,
          top: -3,
          left: 11,
          backgroundColor: "#3C3C3C",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999,
        }}
      >
        <Text
          style={{
            fontSize: 5,
            color: "#FFFFFF",
          }}
        >
          {totalCart}
        </Text>
      </View>
    )
  );
};

export default CartBadge;
