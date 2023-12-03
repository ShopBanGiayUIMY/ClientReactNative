import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
  Switch,
  Pressable,
  ToastAndroid,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import useAuth from "../../Services/auth.services";
import { Entypo } from "@expo/vector-icons";
const Address = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [address, setAddress] = useState("");
  const { getAddress, CreateAddress, updateAddress, DeleteAddress } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAdress] = useState("");
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Thông tin địa chỉ",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("BottomTabNavigation")}
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
  useEffect(() => {
    const onFocus = () => {
      fetchAddresses();
    };

    const unsubscribeFocus = navigation.addListener("focus", onFocus);

    // Cleanup function to remove the listener when the component is unmounted
    return () => {
      unsubscribeFocus();
    };
  }, [fetchAddresses, navigation]);

  const fetchAddresses = async () => {
    try {
      const data = await getAddress();
      if (data.success == true) {
        setAddresses(data.data);
      } else {
        console.log("error fetching address", response);
      }
    } catch (error) {
      console.log("errror", error);
    }
  };
  const setdefaultAddress = async (item) => {
    let data = {
      address_id: item.id,
      recipient_name: item.recipient_name,
      street_address: item.street_address,
      city: item.city,
      state: item.state,
      postal_code: item.postal_code,
      default_address: true,
      recipient_numberphone: item.recipient_numberphone,
    };
    Alert.alert(
      "Xác nhận",
      "Bạn có muốn thay đổi địa chỉ mặc định không?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => handleUpdateAddress(data),
        },
      ],
      { cancelable: false }
    );
  };
  const DeleteAddressUser = async (item) => {
    let data = item.id;
    Alert.alert(
      "Xác nhận",
      "Bạn có muốn xóa địa chỉ này không?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => handleDeleteAddress(data),
        },
      ],
      { cancelable: false }
    );
  };
  const handleDeleteAddress = async (data) => {
    const result = await DeleteAddress(data);
    if (result.success) {
      ToastAndroid.show("Xóa địa chỉ thành công", ToastAndroid.SHORT);
      fetchAddresses();
    } else {
      ToastAndroid.show("Xóa địa chỉ thất bại", ToastAndroid.SHORT);
    }
  };

  const handleUpdateAddress = async (data) => {
    const result = await updateAddress(data);

    if (result.success) {
      ToastAndroid.show("Cập nhật địa chỉ thành công", ToastAndroid.SHORT);
      fetchAddresses();
    } else {
      ToastAndroid.show("Cập nhật địa chỉ thất bại", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={{ marginHorizontal: 20 }}>
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
                    borderColor: "#D0D0D0",
                  }}
                  onPress={() => {
                    DeleteAddressUser(item);
                  }}
                >
                  <Text>Remove</Text>
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
                  onPress={() => {
                    setdefaultAddress(item);
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
      <View>
        <Pressable
          onPress={() => navigation.navigate("AddAddress")}
          style={{
            backgroundColor: "#008397",
            padding: 10,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text style={{ textAlign: "center", color: "white" }}>
            Thêm địa chỉ mới
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Address;
