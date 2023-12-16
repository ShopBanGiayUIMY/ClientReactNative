import React, { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { AuthStatus } from "../../Services/AuthContext";
import useAuth from "../../Services/auth.services";
const InfoUser = (props) => {
  const navigation = useNavigation();
  const { state, dispatch } = AuthStatus();
  const { info } = props.route.params;
  const [name, setName] = useState(info?.full_name || "");
  const [phone, setPhone] = useState(info?.phone || "");
  const [date, setDate] = useState(new Date(info?.date_of_birth));
  const [show, setShow] = useState(false);
  const [gender, setGender] = useState(info?.gender || "");
  const { UpdateInfoUser } = useAuth();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Thông tin tài khoản",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.replace("Setting")}
          style={{ marginLeft: 5, marginRight: 10 }}
        >
          <FontAwesome
            name="chevron-left"
            size={24}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
      ),
    });
  }, []);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };
  const UpdateInfo = async () => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const year = date.getFullYear();

    // Create a date string in a consistent format (yyyy-mm-dd)
    const consistentDateString = `${year}-${month
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;

    // Create a new Date object
    const dateObject = new Date(consistentDateString);

    // Adjust for the timezone offset
    const timeOffsetInMS = dateObject.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(dateObject.getTime() - timeOffsetInMS);

    // Convert to ISO string
    const isoString = adjustedDate.toISOString();
    const dataUser = {
      address: info.address,
      cart_id: info.cart_id,
      date_of_birth: isoString,
      email: info.email,
      full_name: name,
      gender: gender,
      phone: phone,
      total_cart_items: info.cart_id,
      user_id: info.user_id,
      username: info.username,
    };
    dispatch({ type: "USERINFO", payload: dataUser });
    console.log(dataUser);
    console.log(state.userInfo);
    const dataUserUpdate = {
      full_name: name,
      phone: phone,
      gender: gender,
      date_of_birth: isoString,
    };
    const result = UpdateInfoUser(dataUserUpdate);
    if (result) {
      Alert.alert("Thông báo", "Cập nhật thông tin thành công");
    } else {
      Alert.alert("Thông báo", "Cập nhật thông tin thất bại");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tên</Text>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Nguyễn Văn A"
        />
      </View>
      <TouchableOpacity style={styles.field} onPress={showDatepicker}>
        <Text style={styles.label}>Ngày sinh</Text>
        <TouchableOpacity onPress={showDatepicker} style={styles.dateInput}>
          <Text>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="spinner"
          onChange={onChange}
        />
      )}

      <TouchableOpacity style={styles.field} onPress={() => {}}>
        <Text style={styles.label}>Giới tính</Text>
        <RNPickerSelect
          onValueChange={(value) => setGender(value)}
          items={[
            { label: "Nam", value: "male" },
            { label: "Nữ", value: "female" },
            { label: "Khác", value: "other" },
          ]}
          style={pickerSelectStyles}
          placeholder={{}}
          value={gender}
          useNativeAndroidPickerStyle={false}
          Icon={() => {
            return <Icon name="caretright" size={14} color="gray" />;
          }}
        />
      </TouchableOpacity>

      {/* Placeholder for Phone */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPhone}
          value={phone}
          keyboardType="phone-pad"
          placeholder="******59"
        />
      </View>

      {/* Placeholder for Email */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.button} onPress={UpdateInfo}>
          <Text style={styles.buttonText}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,

    color: "black",

    width: 90, // Adjust the width to fit your design
  },
  iconContainer: {
    top: 5,
    right: 15,
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  inputContainer: {
    marginBottom: 15,
  },
  field: {
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    paddingHorizontal: 10,
    height: 60,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
  },
  setupNow: {
    fontSize: 16,
    color: "blue",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default InfoUser;
