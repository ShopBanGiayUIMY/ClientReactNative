import React, { useState,useLayoutEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet ,TouchableOpacity,ToastAndroid} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import  useAuth  from "../../Services/auth.services";
export default function PasswordNew({ navigation, route }) {
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepassword, setShowRepassword] = useState(false);
  const { CreatePasswordUser } = useAuth();
  const { auth_code } = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Xác minh bảo mật",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("AccountInfo")}
          style={{ marginLeft: 5, marginRight: 10 }}
        >
          <FontAwesome
            name="arrow-left"
            size={24}
            color="blue"
            style={styles.icon}
          />
        </TouchableOpacity>
      ),
    });
  }, []);
  const handlePasswordChange = (text) => {
    setPassword(text);
    setError("");
  };

  const handleRepasswordChange = (text) => {
    setRepassword(text);
    setError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRepasswordVisibility = () => {
    setShowRepassword(!showRepassword);
  };
  const fetchData = async () => {
    try {
      const data = await CreatePasswordUser({auth_code:auth_code,password:password});
      if (data.message) {
        ToastAndroid.show("Đổi mật khẩu thành công", ToastAndroid.SHORT);
        setTimeout(() => {

          navigation.replace("AccountInfo");
        }
          , 1000);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleSavePassword = () => {
    if (password === repassword && password !== "") {
      fetchData();
    } else {
      setError("Mật khẩu không trùng khớp hoặc không được để trống");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nhập mật khẩu"
          secureTextEntry={!showPassword}
          onChangeText={handlePasswordChange}
          value={password}
          style={styles.input}
        />
        <FontAwesome
          name={showPassword ? "eye-slash" : "eye"}
          size={20}
          style={styles.iconeye}
          onPress={togglePasswordVisibility}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nhập lại mật khẩu"
          secureTextEntry={!showRepassword}
          onChangeText={handleRepasswordChange}
          value={repassword}
          style={styles.input}
        />
        <FontAwesome
          name={showRepassword ? "eye-slash" : "eye"}
          size={20}
          style={styles.iconeye}
          onPress={toggleRepasswordVisibility}
        />
      </View>
      {error !== "" && <Text style={styles.errorText}>{error}</Text>}
      <TouchableOpacity onPress={handleSavePassword} style={styles.save} >
        <Text  style={styles.savetext}>Lưu mật khẩu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 50,
  },
  inputContainer: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: "60%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  iconeye: {
    position: "absolute",
    marginLeft: "50%",
  },
  errorText: {
    color: "red",
    marginBottom: 20,
  },
  save: {
    width: "40%",
    height: 40,
    backgroundColor: "#42A5B9",
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  savetext: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
  icon: {
    fontSize: 20,
    color: "#7DDDFF",
    marginTop: 3,
  },
});
