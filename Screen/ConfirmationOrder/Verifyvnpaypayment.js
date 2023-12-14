import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, TouchableOpacity, StyleSheet, ToastAndroid } from "react-native";
import { PulseIndicator } from "react-native-indicators";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { WebView } from "react-native-webview";
import useAuth from "../../Services/auth.services";
import axios from "axios";
import Config from "../../Api/Config";
import { AuthStatus } from "../../Services/AuthContext";
import authHeader from "../../Services/auth.header";

const VerifyVnPayPayment = (props) => {
  const navigation = useNavigation();
  const [webViewUrl, setWebViewUrl] = useState(null);
  const { Orders } = useAuth();
  const { state, dispatch } = AuthStatus();
  const {
    cartItems,
    cartId,
    totalPrice,
    shippingAddressId,
    paymentMethodId,
    voucherId,
    freightCost,
  } = props.route.params;
  console.log("cartItems", cartItems, cartId, totalPrice, shippingAddressId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Orders(props.route.params);
        if (data.message === "ok") {
          const usedVoucherIds = state.UseVoucher.map(
            (voucher) => voucher.voucher_id
          );

          // Filter out the used vouchers from the state.UseVoucher array
          const updatedVouchers = state.UseVoucher.filter(
            (voucher) => !usedVoucherIds.includes(voucher.voucher_id)
          );

          // Update the state with the remaining vouchers
          dispatch({ type: "USE_VOUCHER", payload: updatedVouchers });
          console.log("orderId", data);
          
          const headers = await authHeader();
          const response = await axios.post(
            `${Config.API_BASE_URL}/payment/vnpay/create_payment_url`,
            {
              orderId: data.orderId,
              amount: totalPrice,
              bankCode: "VNBANK",
              language: "vn",
            }, {
              headers: headers
            }
          );
          console.log("Payment URL response: ", response.data);
          setWebViewUrl(response.data.url);
        }
      } catch (error) {
        console.error("Error fetching payment URL:", error);
        ToastAndroid.show("Error fetching payment URL", ToastAndroid.SHORT);
      }
    };

    fetchData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Verify Payment",
      headerTransparent: true,
      headerStyle: { backgroundColor: "transparent" },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconContainer}
        >
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handlePaymentStatus = (response) => {
    if (response.RspCode === "00") {
      ToastAndroid.show("Thanh toán thành công", ToastAndroid.SHORT);
      navigation.navigate("Home");
    } else if (response.RspCode === "01") {
      ToastAndroid.show("Thanh toán đã bị hủy", ToastAndroid.SHORT);
      navigation.goBack();
    } else {
      ToastAndroid.show(
        `Payment Error: ${response.RspCode}`,
        ToastAndroid.SHORT
      );
    }
  };

  const handleNavigationChange = async (event) => {
    if (event.url.includes("api/v1/payment/vnpay/vnpay_ipn")) {
      try {
        const response = await axios.get(event.url);
        console.log("Payment status response: ", response.data);
        handlePaymentStatus(response.data);
      } catch (error) {
        console.error("Error processing payment status:", error);
        ToastAndroid.show(
          "Error processing payment status",
          ToastAndroid.SHORT
        );
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {webViewUrl && (
        <WebView
          source={{ uri: webViewUrl }}
          style={{ flex: 1 }}
          onNavigationStateChange={handleNavigationChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginLeft: 5,
    marginRight: 10,
  },
});

export default VerifyVnPayPayment;