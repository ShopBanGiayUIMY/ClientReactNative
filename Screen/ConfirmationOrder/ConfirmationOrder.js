import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
  Image,
  ToastAndroid,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../Services/auth.services";
import { AuthStatus } from "../../Services/AuthContext";
import WebView from "react-native-webview";
import Config from "../../Api/Config";
import { err } from "react-native-svg";
import authHeader from "../../Services/auth.header";
import { Header } from "react-native/Libraries/NewAppScreen";
const ConfirmationOrder = (props) => {
  const { getDefaultAddress, CreateAddress } = useAuth();
  const { Orderdata } = props.route.params;
  const [webViewUrl, setWebViewUrl] = useState()
  const { state, dispatch } = AuthStatus();
  console.log("state", state.UseVoucher);

  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Voucher", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  const [addresses, setAddresses] = useState([]);

  const [selectedAddress, setSelectedAdress] = useState("");
  const [option, setOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState("cash");
  const [phivanchuyen, setPhivanchuyen] = useState(10000);
  useEffect(() => {
    console.log(webViewUrl)
    const onFocus = () => {
      fetchAddresses();
    };

    const unsubscribeFocus = navigation.addListener("focus", onFocus);

    // Cleanup function to remove the listener when the component is unmounted
    return () => {
      unsubscribeFocus();
    };
  }, [webViewUrl, fetchAddresses, navigation]);
  const fetchAddresses = async () => {
    try {
      const data = await getDefaultAddress();
      console.log("data", data);
      if (data.status === -1) {
        navigation.navigate("Address");
        ToastAndroid.show(
          "Bạn chưa có địa chỉ hoặc chưa chọn mặc định",
          ToastAndroid.SHORT
        );
      }
      if (data.success == true) {
        setAddresses(data.data);
        console.log("address", data.data);
      } else {
        console.log("error fetching address", response);
      }
    } catch (error) {
      console.log("errror", error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        userId: 4,
        cartItems: [3],
        cartId: 5,
        totalPrice: 80000,
        shippingAddressId: 1,
        paymentMethodId: 1,
      };
      const jwtHeader = await authHeader()
      console.log(orderData)
      console.log(jwtHeader)
      const response = await axios.post(
        `${Config.API_BASE_URL}/orders`,
        orderData,
        {headers: jwtHeader},
      );
      console.log(jwtHeader)
      if (response.status === 200) {
        navigation.navigate("Order");
        console.log("order created successfully", response.data);
      } else {
        console.log("error creating order", response.data);
      }
    } catch (error) {
      console.log("errror", error);
    }
  };

  const Tinhtoantien = ({ item, voucher }) => {
    let total = 0;
    if (item?.reward_type === 1) {
      total = Orderdata.total * (item?.discount_amount / 100);
    }
    if (item?.reward_type === 2) {
      total = Number(item?.discount_amount);
    }
    return <Text style={{ fontSize: 10, color: "red" }}>{total}đ</Text>;
  };

  const TinhGiamPhiVanChuyen = ({ index, item }) => {
    let total = 0;

    const discountAmount = Number(item?.discount_amount);

    total = discountAmount;

    return (
      <Text style={{ fontSize: 15, color: "gray" }}>
        {"-"}
        {total}đ
      </Text>
    );
  };
  const Tinhgiamgia = ({ index, item }) => {
    let total = 0;
    if (item?.reward_type === 1) {
      total = Orderdata.total * (item?.discount_amount / 100);
    }
    if (item?.reward_type === 2) {
      total = Number(item?.discount_amount);
    }

    return (
      <Text style={{ fontSize: 15, color: "gray" }}>
        {"-"}
        {total}đ
      </Text>
    );
  };
  const calculateTotalPayment = () => {
    // Initial total is the total price of the items in the cart
    let totalPayment = Orderdata.total;

    // Add the shipping fee
    totalPayment += phivanchuyen;

    // Iterate through applied vouchers and apply discounts
    state.UseVoucher.forEach((voucher) => {
      if (voucher?.reward_type === 1) {
        // Apply percentage discount
        const discountAmount =
          (Orderdata.total * voucher?.discount_amount) / 100;
        totalPayment -= discountAmount;
      } else if (voucher?.reward_type === 2) {
        // Apply fixed amount discount
        totalPayment -= voucher?.discount_amount;
      }
    });

    return totalPayment;
  };

  console.log("totalPayment", calculateTotalPayment());

  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            justifyContent: "space-between",
          }}
        >
          {steps?.map((step, index) => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {index > 0 && (
                <View
                  style={[
                    { flex: 1, height: 2, backgroundColor: "green" },
                    index <= currentStep && { backgroundColor: "green" },
                  ]}
                />
              )}
              <View
                style={[
                  {
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "#ccc",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  index < currentStep && { backgroundColor: "green" },
                ]}
              >
                {index < currentStep ? (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text style={{ textAlign: "center", marginTop: 8 }}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Địa chỉ nhận hàng
        </Text>

        <Pressable>
          {addresses?.map((item, index) => (
            <Pressable
              style={{
                borderWidth: 1,
                borderColor: "#D0D0D0",
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                paddingBottom: 17,
                marginVertical: 7,
                borderRadius: 6,
              }}
              key={index}
              onPress={() => {
                navigation.navigate("Address");
              }}
            >
              <View style={{ marginLeft: 6 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <Entypo name="location-pin" size={24} color="red" />
                  <Text style={{ fontSize: 15, fontWeight: "400" }}>
                    {item?.recipient_name}
                  </Text>
                  <Text style={{ fontSize: 15, fontWeight: "400" }}>
                    | (+84) {item?.recipient_numberphone}
                  </Text>
                </View>
                <Text style={{ fontSize: 15, color: "#181818" }}>
                  {item?.street_address}, {item?.city}
                </Text>
                <Text style={{ fontSize: 15, color: "#181818" }}>
                  {item?.state}
                </Text>

                <Text style={{ fontSize: 15, color: "#181818" }}>
                  pin code : {item?.postal_code}
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 7,
                  }}
                >
                  <Pressable
                    style={{
                      backgroundColor: "#F5F5F5",
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 5,
                      borderWidth: 0.9,
                      borderColor: "#D0D0D0",
                    }}
                    onPress={() => {
                      navigation.navigate("EditAddress", { item });
                    }}
                  >
                    <Text>Edit</Text>
                  </Pressable>

                  <Pressable
                    style={{
                      backgroundColor: "#F5F5F5",
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 5,
                      borderWidth: 0.9,
                      borderColor: item?.default
                        ? "rgba(255, 124, 49, 0.8)"
                        : "#D0D0D0",
                      backgroundColor: item?.default
                        ? "rgba(255, 124, 49, 0.8)"
                        : "#F5F5F5",
                    }}
                    disabled={item?.default}
                  >
                    {item?.default ? (
                      <Text style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                        Mặc định
                      </Text>
                    ) : (
                      <Text style={{}}>Chọn mặc định </Text>
                    )}
                  </Pressable>
                </View>
              </View>
            </Pressable>
          ))}
        </Pressable>
      </View>

      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Voucher</Text>

        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            padding: 8,
            gap: 7,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
          }}
          onPress={() => {
            navigation.navigate("CouponOrder");
          }}
        >
          {state.UseVoucher.length > 0 ? (
            <FontAwesome5
              name="dot-circle"
              size={20}
              color="#008397"
              onPress={() => setOption(!option)}
            />
          ) : (
            <Entypo
              onPress={() => setOption(!option)}
              name="circle"
              size={20}
              color="gray"
            />
          )}
          {state.UseVoucher.length > 0 &&
            state.UseVoucher.map((voucher, index) => (
              <View key={index}>
                {voucher?.reward_type === 3 ? (
                  <Image
                    source={{
                      uri: "https://beebot-sg-knowledgecloud.oss-ap-southeast-1.aliyuncs.com/kc/kc-media/kc-oss-1646302396798-image.png",
                    }}
                    style={{
                      width: 100,
                      height: 30,
                      resizeMode: "contain",
                      borderRadius: 8,
                    }}
                  />
                ) : null}
                {voucher?.reward_type === 2 || voucher?.reward_type === 1 ? (
                  <ImageBackground
                    source={{
                      uri: "https://iili.io/JzQxWnR.png",
                    }}
                    style={{
                      width: 50,
                      height: 30,
                      resizeMode: "center",
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: "gray",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Tinhtoantien index={index} item={voucher} />
                  </ImageBackground>
                ) : null}
              </View>
            ))}
          {state.UseVoucher.length <= 0 ? (
            <Text style={{ fontSize: 15, color: "gray" }}>Chọn voucher</Text>
          ) : null}
        </Pressable>

        <Pressable
          onPress={() => {
            setCurrentStep(2);
          }}
          style={{
            backgroundColor: "#FFC72C",
            padding: 10,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Text>Tiếp tục</Text>
        </Pressable>
      </View>

      {currentStep == 2 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Select your payment Method
          </Text>

          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginTop: 12,
            }}
          >
            {selectedOption === "cash" ? (
              <FontAwesome5 name="dot-circle" size={20} color="#008397" />
            ) : (
              <Entypo
                onPress={() => setSelectedOption("cash")}
                name="circle"
                size={20}
                color="gray"
              />
            )}

            <Text>Thanh toán khi nhận hàng</Text>
          </View>

          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
              marginTop: 12,
            }}
          >
            {selectedOption === "card" ? (
              <FontAwesome5 name="dot-circle" size={20} color="#008397" />
            ) : (
              <Entypo
                onPress={() => {
                  setSelectedOption("card");
                  Alert.alert("UPI/Debit card", "Pay Online", [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel is pressed"),
                    },
                    {
                      text: "OK",
                      onPress: async () => {
                        const response = await axios.post(
                          "http://192.168.0.107:3000/api/v1/payment/vnpay/create_payment_url",
                          {"amount":"10000000","bankCode":"VNBANK","language":"vn"}
                        )
                        console.log('response: ',response.data)
                        // console.log('url', response.re)
                        setWebViewUrl(response.data.url)
                      }
                    },
                  ]);
                }}
                name="circle"
                size={20}
                color="gray"
              />
            )}

            <Text>UPI / Credit or debit card</Text>
            
          </View>
          <Pressable
            onPress={() => setCurrentStep(3)}
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text>Tiếp tục</Text>
          </Pressable>
          
          <WebView source={{ uri: webViewUrl}} style={{width: 300, height: 200}}/>
        </View>
      )}

      {currentStep === 3 && selectedOption === "cash" && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order Now</Text>

          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text>Chi tiết thanh toán {selectedAddress?.name}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 3,
              }}
            >
              <Text style={{ fontSize: 15, color: "gray" }}>
                Tổng tiền hàng
              </Text>

              <Text style={{ color: "gray", fontSize: 16 }}>
                {Orderdata.total.toLocaleString("vi-VN")}đ
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 3,
              }}
            >
              <Text style={{ fontSize: 15, color: "gray" }}>
                Phí vận chuyển
              </Text>

              <Text style={{ color: "gray", fontSize: 16 }}>10.000đ</Text>
            </View>
            {state.UseVoucher.length > 0 &&
              state.UseVoucher.map((voucher, index) => (
                <View key={index}>
                  {voucher?.reward_type === 3 ? (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 3,
                      }}
                    >
                      <Text style={{ fontSize: 15, color: "gray" }}>
                        Giảm phí vận chuyển
                      </Text>

                      <TinhGiamPhiVanChuyen
                        index={index}
                        item={voucher.toLocaleString("vi-VN")}
                      />
                    </View>
                  ) : null}
                  {voucher?.reward_type === 1 ? (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 3,
                      }}
                    >
                      <Text style={{ fontSize: 15, color: "gray" }}>
                        Voucher Giảm giá
                      </Text>

                      {<Tinhgiamgia index={index} item={voucher} />}
                    </View>
                  ) : null}
                  {voucher?.reward_type === 2 ? (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 3,
                      }}
                    >
                      <Text style={{ fontSize: 15, color: "gray" }}>
                        Tổng tiền hàng
                      </Text>

                      <Text style={{ color: "gray", fontSize: 16 }}>₹</Text>
                    </View>
                  ) : null}
                </View>
              ))}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 3,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Tổng Thanh Toán
              </Text>

              <Text
                style={{ color: "#C60C30", fontSize: 17, fontWeight: "bold" }}
              >
                {calculateTotalPayment() < 0
                  ? 0
                  : calculateTotalPayment().toLocaleString("vi-VN")}
                đ
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: "white",
              padding: 8,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 16, color: "gray" }}>Kiểu thanh toán</Text>

            <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 7 }}>
              {selectedOption == "cash"
                ? "Thanh toán khi nhận hàng"
                : "UPI/Debit card"}
            </Text>
          </View>

          <Pressable
            onPress={handlePlaceOrder}
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
              position: "relative",
              top: -5,
            }}
          >
            <Text>Xác nhận đặt hàng</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmationOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
