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
          right: -6,
          top: -3,
          backgroundColor: "red",
          borderRadius: 8.5,
          width: 17,
          height: 17,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 10,
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
