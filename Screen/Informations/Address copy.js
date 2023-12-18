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
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import AddressConfirm from "../Address/addressConfirm";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const Address = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [address, setAddress] = useState("");
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Thêm địa chỉ",
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

  const googlePlacesRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();

  const [name, setName] = useState("");
  const [sodienthoai, setSoDienThoai] = useState("");
  const [diaChiCuThe, setDiaChiCuThe] = useState("");

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handlePhoneInputChange = (text) => {
    setSoDienThoai(text);
  };

  const xacNhanDiaChi = () => {
    if (!validatePhoneNumber(sodienthoai)) {
      Alert.alert("Lỗi", "Số điện thoại không hợp lệ");
      return;
    }
    if (address == "") {
      Alert.alert("Lỗi", "Vui lòng chọn địa chỉ");
      return;
    }

    console.log("Họ và tên:", name);
    console.log("Số điện thoại:", sodienthoai);
    console.log("Địa chỉ cụ thể:", diaChiCuThe);
    console.log("Địa chỉ:", address);
    console.log("Đặt làm địa chỉ mặc định:", isEnabled);
  };
  const handleDataAndress = (data) => {
    console.log("data", data);
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
        <TextInput
          style={styles.input}
          placeholder="Địa chỉ cụ thể"
          value={diaChiCuThe}
          onChangeText={(text) => setDiaChiCuThe(text)}
          ref={addressRef}
        />
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
    height: "55%",
  },
  confirmButton: {
    width: 343,
    height: 48,
    backgroundColor: "#DB3022",
    alignSelf: "center",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
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

export default Address;
