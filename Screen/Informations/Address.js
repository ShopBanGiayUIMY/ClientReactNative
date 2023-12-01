import React, { useState, useRef } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Addres from "../../Screen/addresstest";
const Address = ({ navigation }) => {
  const googlePlacesRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const [name, setName] = useState("");
  const [sodienthoai, setSoDienThoai] = useState("");
  const [diachi, setDiaChi] = useState("");
  const [diaChiCuThe, setDiaChiCuThe] = useState("");
  const [isAddressSelected, setIsAddressSelected] = useState(false);
  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };
  const handlePhoneInputChange = (text) => {
    setSoDienThoai(text);
  };
  // const handleAddressSelection = () => {
  //   setIsAddressSelected(true);
  // };
  const xacNhanDiaChi = () => {
    if (!validatePhoneNumber(sodienthoai)) {
      Alert.alert("Lỗi", "Số điện thoại không hợp lệ");
      return;
    }
    // if (!isAddressSelected) {
    //   Alert.alert("Lỗi", "Hãy chọn địa chỉ nhận hàng");
    //   return;
    // }
    console.log("Họ và tên:", name);
    console.log("Số điện thoại:", sodienthoai);
    console.log("Địa chỉ cụ thể:", diaChiCuThe);
    navigation.goBack("Home");
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerItem}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              style={styles.icon}
              icon={faArrowLeft}
              size={20}
              color="white"
            />
          </TouchableOpacity>
          <Text style={styles.title}>Thêm địa chỉ nhận hàng</Text>
        </View>
      </View>
      <View style={styles.content}>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
          placeholder="Họ và tên"
          returnKeyType="next"
          onSubmitEditing={() => {
            phoneRef.current.focus();
          }}
        />
        <TextInput
          multiline={true}
          dataDetectorTypes="phoneNumber"
          style={styles.input}
          placeholder="Số điện thoại"
          value={sodienthoai}
          onChangeText={handlePhoneInputChange}
          returnKeyType="next"
          onSubmitEditing={() => {
            googlePlacesRef.current.focus();
          }}
        />
        <TextInput
          value={diaChiCuThe}
          onChangeText={(text) => {
            setDiaChiCuThe(text);
          }}
          style={styles.input}
          placeholder="Địa chỉ cụ thể"
          ref={addressRef}
        />
        <View style={styles.addressContainer}>
          <Addres/>
        </View>
      </View>
      <Pressable
        onPress={() => {
          xacNhanDiaChi();
        }}
        style={styles.confirmButton}
      >
        <Text style={styles.confirmButtonText}>Xác nhận</Text>
      </Pressable>
    </View>
  );
};
export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 380,
    backgroundColor: "#E0E0E0",
  },
  header: {
    width: "100%",
    height: 100,
  },
  headerItem: {
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#F9F9F9",
    height: 100,
  },
  icon: {
    width: 25,
    height: 25,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "white",
    backgroundColor: "gray",
    marginStart: 25,
    marginTop: 40,
  },
  title: {
    textAlign: "center",
    width: 250,
    height: 45,
    fontSize: 25,
    marginStart: 35,
    fontWeight: "800",
    marginTop: 35,
  },
  content: {
    width: 345,
    alignSelf: "center",
    paddingTop: 15,
  },
  input: {
    width: 343,
    height: 64,
    color: "#9B9B9B",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#fff",
    alignSelf: "center",
    paddingStart: 10,
    marginBottom: 10,
  },
  addressContainer: {
    width: "100%",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height:250
  },
  confirmButton: {
    width: 343,
    height: 48,
    backgroundColor: "#DB3022",
    alignSelf: "center",
    borderRadius: 25,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  
});
