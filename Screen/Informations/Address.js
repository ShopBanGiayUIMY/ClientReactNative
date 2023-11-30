import React, { useState, useRef, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Addres from "../../Screen/addresstest";
import * as Location from "expo-location";

const Address = ({ navigation }) => {
  const googlePlacesRef = React.createRef();
  const phoneRef = React.createRef();
  const addressRef = React.createRef();

  const [currentLocation, setCurrentLocation] = useState(null);
  const [name, setName] = useState("");
  const [sodienthoai, setSoDienThoai] = useState("");
  const [diachi, setDiaChi] = useState("");
  const [diaChiCuThe, setDiaChiCuThe] = useState("");
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const userLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });

      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  useEffect(() => {
    userLocation();
  }, []);

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handlePhoneInputChange = (text) => {
    setSoDienThoai(text);
  };

  const handleGooglePlacesSelect = (data, details = null) => {
    const selectedAddress = details?.formatted_address || "";
    setDiaChi(selectedAddress);
  };

  const xacNhanDiaChi = () => {
    if (!validatePhoneNumber(sodienthoai)) {
      alert("Số điện thoại không hợp lệ");
      return;
    }

    if (!diachi) {
      alert("Vui lòng chọn địa chỉ");
      return;
    }

    console.log("Họ và tên:", name);
    console.log("Số điện thoại:", sodienthoai);
    console.log("Địa chỉ:", diachi);
    console.log("Địa chỉ cụ thể:", diaChiCuThe);

    navigation.replace("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.vheader}>
        <View style={styles.vItemheader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              style={styles.icon}
              icon={faArrowLeft}
              size={20}
              color="white"
            />
          </TouchableOpacity>
          <Text style={styles.txtTitle}>Thêm địa chỉ nhận hàng</Text>
        </View>
      </View>
      <View style={styles.vNoidung}>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.txtTen}
          placeholder="Họ và tên"
          returnKeyType="next"
          onSubmitEditing={() => {
            phoneRef.current.focus();
          }}
        />
        <TextInput
          multiline={true}
          dataDetectorTypes="phoneNumber"
          style={styles.txtTen}
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
          style={styles.txtTen}
          placeholder="Địa chỉ cụ thể"
          ref={addressRef}
        />
        <View style={styles.addressContainer}>
          <Addres />
        </View>
      </View>
      <Pressable
        onPress={() => {
          xacNhanDiaChi();
        }}
        style={styles.vXacNhanDiaChi}
      >
        <Text style={styles.txtXacNhan}>Xác nhận</Text>
      </Pressable>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 380,
    height: 1000,
    backgroundColor: "#E0E0E0",
  },
  vheader: {
    width: "100%",
    height: 100,
  },
  vItemheader: {
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
  txtTitle: {
    textAlign: "center",
    width: 250,
    height: 45,
    fontSize: 25,
    marginStart: 35,
    fontWeight: "800",
    marginTop: 35,
  },
  vNoidung: {
    width: 345,
    height: "auto",
    alignSelf: "center",
    paddingTop: 15,
  },
  txtTen: {
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
    height: 200,
    backgroundColor: "red",
    marginBottom: 10,
  },
  vXacNhanDiaChi: {
    width: 343,
    height: 48,
    backgroundColor: "#DB3022",
    alignSelf: "center",
    borderRadius: 25,
    marginTop: 10,
  },
  txtXacNhan: {
    textAlign: "center",
    paddingTop: 15,
    color: "#fff",
    height: "100%",
    fontSize: 18,
  },
});
