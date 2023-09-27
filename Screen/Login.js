import React, { useState,Component } from "react";
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity,ToastAndroid } from "react-native";
import eye from "../image/eys.jpg";
import face from "../image/facebook.png";
import google from "../image/google.png";
import axios from "axios";
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Login extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      userList: [],
      isPasswordVisible: false,
      isChecked: false,
    };
  }


  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      isPasswordVisible: !prevState.isPasswordVisible,
    }));
  };
  togglexacnhan = () => {
    this.setState((prevState) => ({
      isChecked: !prevState.isChecked,
    }));
  };

  componentDidMount() {
    this.getData();
  }
  getData() {
    const url = "https://64ffde2c18c34dee0cd40218.mockapi.io/registration/users";
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        this.setState({
          userList: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleLogin() {
    const { username, password, userList,isChecked } = this.state;
    try {
      const user = userList.find((user) => user.username === username.trim() && user.password === password);
    const usernameExists = userList.some((user) => user.username === username.trim());
    const passwordExists = userList.some((user) => user.password === password);

    if (username.trim().length === 0) {
      ToastAndroid.show('Không để rỗng!', ToastAndroid.SHORT);
      return;
    } 
    else if (!isChecked) {
      ToastAndroid.show('Bạn chưa đồng ý với điều khoản!', ToastAndroid.SHORT);
      return;
    }
    else if (!usernameExists) {
      ToastAndroid.show('Tài khoản không tồn tại!', ToastAndroid.SHORT);
    }
    else if (!passwordExists) {
      ToastAndroid.show('Mật khẩu không đúng!', ToastAndroid.SHORT);
    }
    else if (!user) {
      ToastAndroid.show('Tài khoản hoặc mật khẩu không chính xác!', ToastAndroid.SHORT);
    }
    
    else {
      const userId = user.id.toString();
      AsyncStorage.setItem('userId', userId).then(() => {
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: 'ListProduct' }],
        });
        ToastAndroid.show('Chúc mừng bạn đăng nhập thành công ✓', ToastAndroid.SHORT);
      });
    }
    } catch (error) {
      ToastAndroid.show('Lỗi Mạng ✓', ToastAndroid.SHORT);
    }
    
  }
render(){
  const { isChecked, isPasswordVisible } = this.state;
  return (
    <View style={styles.container}>
      <Text style={styles.hi}>Hi, Welcome Back!{'\n'} </Text>
      <Text style={styles.vaytay}>👋</Text>
      <Text style={styles.nameapp}>Mini <Text style={styles.shop}> Shop</Text></Text>

      <View style={styles.view}>
        <TextInput
          onChangeText={(text) => this.setState({ username: text })}
          value={this.state.username}
          style={styles.input}
          placeholder="Enter your name"
        />
        <View style={styles.passwordInput}>
          <TextInput
           onChangeText={(text) => this.setState({ password: text })}
           value={this.state.password}
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity onPress={this.togglePasswordVisibility} style={styles.eyeContainer}>
            <Image source={eye} style={[styles.eye, isPasswordVisible && styles.invisibleEye]} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.checkboxx}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={this.togglexacnhan}
          color={isChecked ? '#4630EB' : undefined}
        />
        <Text style={{ marginLeft: 10, marginTop: 2 }}>Remember me? </Text>
        <Text style={styles.forgotpassword}>Forgot the password?</Text>
      </View>

      <View style={styles.login}>
        <TouchableOpacity onPress={() => this.handleLogin()}>
          <Text style={styles.touchablecity}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.orWith}>
        <Text>Or With</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonInnerContainer}>
          <Image
            source={face}
            style={styles.imagess}
          />
          <Text style={styles.buttonText}>Signup with Facebook</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer1}>
        <TouchableOpacity style={styles.buttonInnerContainer1}>
          <Image
            source={google}
            style={styles.imagess}
          />
          <Text style={styles.buttonText1}>Signup with Google</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.createaccount}>
        <Text style={styles.texttt}>Don't have an account? <Text style={styles.texttt1}>Create an account</Text></Text>
      </View>
    </View>
  );
}
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 50,
    paddingHorizontal: '5%',
  },
  hi: {
    fontSize: 30,
    fontWeight: '700',
    color: 'black',
    marginTop: 60,
    marginLeft: 30,
  },
  vaytay: {
    textAlign: 'center',
    fontSize: 30,
    marginTop: -30,
  },
  nameapp: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  shop: {
    color: 'rgba(255, 198, 0, 1)',
  },
  view: {
    marginTop: 60,
  },
  input: {
    borderRadius: 10,
    borderWidth: 1.5,
    height: 45,
    width: 300,
    marginTop: 20,
    paddingHorizontal: 20,
    borderColor: 'gray',
  },
  passwordInput: {
    position: 'relative',
  },
  eyeContainer: {
    position: 'absolute',
    top: 29,
    right: 15,
  },
  eye: {
    width: 25,
    height: 25,
  },
  invisibleEye: {
    opacity: 0.3,
  },
  checkboxx: {
    marginTop: 15,
    color: 'gray',
    flexDirection: 'row',
  },
  forgotpassword: {
    marginLeft: 54,
    marginTop: 4,
    fontSize: 10,
    color: 'red',
    textDecorationLine: 'underline',
  },
  login: {
    marginTop: 25,
    borderWidth: 1,
    backgroundColor: 'rgba(14, 100, 210, 1)',
    borderRadius: 10,
    width: 300,
    height: 45,
  },
  touchablecity: {
    color: 'white',
    textAlign: 'center',
    marginTop: 12,
    fontSize: 15,
  },
  orWith: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(14, 100, 210, 1)', // Add some padding for better spacing
    marginTop: 10,
    width: 300,
  },
  buttonInnerContainer: {
    flexDirection: 'row', // Arrange the image and text horizontally
    alignItems: 'center', // Center the items vertically
    padding: 10,
  },
  buttonText: {
    marginLeft: 60,
    color: 'white', // Add some left margin to create space between the image and text
  },
  imagess: {
    width: 20,
    height: 20,
    marginLeft: 15,
  },
  buttonContainer1: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 30,
    width: 300,
  },
  buttonInnerContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  buttonText1: {
    marginLeft: 60,
    color: 'black',
  },
  imagess1: {
    width: 20,
    height: 20,
    marginLeft: 15,
  },
  createaccount: {
    marginTop: 30,
  },
  texttt1: {
    textAlign: 'center',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
