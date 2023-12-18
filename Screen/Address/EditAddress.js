import React, { useState, useRef, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
  Switch,
  ToastAndroid
} from "react-native";
import AddressConfirm from "./addressConfirm";
import useAuth from "../../Services/auth.services";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const EditAddress = ({ navigation, route }) => {
  const [address, setAddress] = useState("");
  const { item } = route.params;
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const googlePlacesRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const { updateAddress } = useAuth();

  const [name, setName] = useState(item.recipient_name || "");
  const [sodienthoai, setSoDienThoai] = useState(
    item.recipient_numberphone || ""
  );
  const [isEnabled, setIsEnabled] = useState(item.default || false);
  const [diaChiCuThe, setDiaChiCuThe] = useState("");
  const [formAddress, setFormAddress] = useState({
    recipient_name: "",
    street_address: "",
    city: "",
    state: "",
    postal_code: "",
    address_id: item.id,
    default_address: isEnabled,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Sửa địa chỉ",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
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

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{9,}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handlePhoneInputChange = (text) => {
    setSoDienThoai(text);
  };

  const xacNhanDiaChi = async () => {
    if (!validatePhoneNumber(sodienthoai)) {
      Alert.alert("Lỗi", "Số điện thoại không hợp lệ");
      return;
    }
    if (name == "") {
      Alert.alert("Lỗi", "Vui lòng nhập họ và tên");
      return;
    }
    let updatedFormAddress = {};
    if (address == "") {
      updatedFormAddress = {
        address_id: item.id,
        recipient_name: name,
        street_address: item.street_address,
        city: item.city,
        state: item.state,
        postal_code: item.postal_code,
        default_address: isEnabled,
        recipient_numberphone: sodienthoai,
      };
    } else {
      updatedFormAddress = {
        address_id: item.id,
        recipient_name: name,
        street_address: address.district,
        city: address.province,
        state: address.wards,
        postal_code: "chưa cập nhật",
        default_address: isEnabled,
        recipient_numberphone: sodienthoai,
      };
    }
    console.log("updatedFormAddress", updatedFormAddress);
    const result = await updateAddress(updatedFormAddress);
    if (result.success) {
      ToastAndroid.show("Cập nhật địa chỉ thành công", ToastAndroid.SHORT);
      navigation.goBack();
    } else {
      ToastAndroid.show("Cập nhật địa chỉ thất bại", ToastAndroid.SHORT);
    }
    
  };
  const handleDataAndress = (data) => {
    setAddress(data);
  };
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Họ và tên"
          value={name}
          onChangeText={(text) => setName(text)}
          returnKeyType="next"
          onSubmitEditing={() => phoneRef.current.focus()}
        />
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={sodienthoai}
          onChangeText={handlePhoneInputChange}
          keyboardType="phone-pad"
          returnKeyType="next"
          onSubmitEditing={() => googlePlacesRef.current.focus()}
        />
        <View
          style={{
            padding: 20,
            backgroundColor: "#ffffff",
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            Địa chỉ hiện tại của bạn{" "}
          </Text>
          <Text style={{ fontSize: 15, color: "rgba(255, 13, 0, 0.8)" }}>
            {item.city}
          </Text>
          <Text style={{ fontSize: 15, color: "rgba(255, 13, 0, 0.8)" }}>
            {item.street_address}
          </Text>
          <Text style={{ fontSize: 15, color: "rgba(255, 13, 0, 0.8)" }}>
            {item.state}
          </Text>
        </View>
        <View style={styles.addressContainer}>
          <View style={styles.AddressConfirm}>
            <Image
              source={{ uri: "https://iili.io/JzRD1wB.png" }}
              style={styles.locationicon}
            />
            <AddressConfirm sendDataAddress={handleDataAndress} />
          </View>
        </View>
      </View>
      <View style={styles.containerSwitch}>
        <Text style={styles.switchLabel}>Đặt làm địa chỉ mặc định</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={styles.switchContainer}
        />
      </View>
      <TouchableOpacity style={styles.confirmButton} onPress={xacNhanDiaChi}>
        <Text style={styles.confirmButtonText}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 380,
    backgroundColor: "#E0E0E0",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    height: 100,
    paddingLeft: 10,
  },
  iconContainer: {
    padding: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "800",
    marginLeft: 10,
  },
  content: {
    width: 345,
    alignSelf: "center",
    paddingTop: 15,
  },
  input: {
    width: "100%",
    height: 50,
    color: "#9B9B9B",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#fff",
    alignSelf: "center",
    paddingLeft: 10,
    marginBottom: 10,
  },
  addressContainer: {
    width: "100%",
    borderRadius: 8,
    height: "45%",
  },
  confirmButton: {
    width: 343,
    height: 48,
    backgroundColor: "#DB3022",
    alignSelf: "center",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  locationicon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginLeft: 10,
    marginTop: 10,
  },
  AddressConfirm: {
    flex: 1,
    width: "100%",
    height: "auto",
  },
  containerSwitch: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingLeft: 30,
    marginTop: 0,
    position: "absolute",
    top: "82%",
  },
  switchLabel: {
    marginLeft: 0,
    fontSize: 18,
    fontWeight: "bold",
  },
  switchContainer: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
});

export default EditAddress;
