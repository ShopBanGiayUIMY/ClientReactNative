import React, { useState,Component,useLayoutEffect  } from "react";
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity,ToastAndroid, Pressable } from "react-native";
import eye from "../../images/eys.jpg";
import face from "../../images/facebook.png";
import google from "../../images/google.png";
import Checkbox from 'expo-checkbox';
import  useAuth  from "../../Services/auth.services";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import logo from "../../assets/images/logo.png";
export default function Login ({navigation})  {
  const [isloading, setIsLoading] = useState(false);
  useLayoutEffect(() => { 
    navigation.setOptions({ 
      headerTitle: 'Đăng nhập',
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 5 ,marginRight: 10}}
        >
         
         <FontAwesome name="arrow-left" size={24} color="black" style={styles.icon}/>
        </TouchableOpacity>
      ),
    }) 
  }, [])
  const { loginUser } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  }); 
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const checkemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const handleLogin = async () =>{
    
    try {
    if (formData.username.trim().length === 0) {
      ToastAndroid.show('Không để rỗng!', ToastAndroid.SHORT);
      return;
    } 
    else if (!agreeToTerms) {
      ToastAndroid.show('Bạn chưa đồng ý với điều khoản!', ToastAndroid.SHORT);
      return;
    }
    else {
      const response = await loginUser(formData);
      if (response) {
        console.log(response,"huydz");
        setIsLoading(true);
        ToastAndroid.show('Chúc mừng bạn đăng nhập thành công ✓', ToastAndroid.SHORT);
        setTimeout(() => {
          setIsLoading(false);
          navigation.replace("SplashStore");
        }, 2000);
      } else {
        // Xử lý trường hợp không nhận được dữ liệu từ hàm loginUser
        console.error("Tài khoản hoặc mật khẩu không tồn tại");
      }
         
       
    }
    } catch (error) {
      ToastAndroid.show('Lỗi Mạng ✓', ToastAndroid.SHORT);
    }
    
  }
  return (
    <View style={styles.container}>
       <LoadingScreen isVisible={isloading} navigation={navigation} />
      <Image source={logo} style={styles.logo} resizeMode="contain"/>
      <Text style={styles.nameapp}>Snake Nike <Text style={styles.shop}> Shop</Text></Text>

      <View style={styles.view}>
      <TextInput
          onChangeText={(text) => setFormData({ ...formData, username: text })}
          value={formData.username}
          style={styles.input}
          placeholder="Enter your username or email"
        />
       <View style={styles.passwordInput}>
          <TextInput
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            value={formData.password}
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeContainer}>
            <Image source={eye} style={[styles.eye, isPasswordVisible && styles.invisibleEye]} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.checkboxx}>
        <Checkbox
          style={styles.checkbox}
          value={agreeToTerms}
          onValueChange={()=>setAgreeToTerms(!agreeToTerms)}
          color={agreeToTerms ? '#4630EB' : undefined}
        />
        <Text style={{ marginLeft: 10, marginTop: 2 }}>Remember me? </Text>
        <Text style={styles.forgotpassword}>Forgot the password?</Text>
      </View>

      <View style={styles.login}>
        <TouchableOpacity onPress={() => handleLogin()}>
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
        <Text style={styles.txt}>Don't have an account? </Text>
        <Pressable onPress={() =>{navigation.navigate('Register'); ToastAndroid.show('Đăng ký tài khoản !', ToastAndroid.SHORT);}}><Text style={styles.texttt1}>Create an account</Text></Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flex:1
  },
  logo: {
    width: 90,
    height: 90,
    marginTop: 20,
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
    marginTop: 20,
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
    top: 34,
    right: 15,
    justifyContent: 'center',
  },
  eye: {
    width: 20,
    height: 20,
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
    borderColor:'white'
  },
  touchablecity: {
    color: 'white',
    textAlign: 'center',
    marginTop: 12,
    fontSize: 15,
    width:'100%'
  },
  orWith: {
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
  },
  buttonContainer: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(14, 100, 210, 1)', 
    marginTop: 10,
    width: 300,
    borderColor:'white'

  },
  buttonInnerContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 10,
  },
  buttonText: {
    marginLeft: 60,
    color: 'white', 
    width:'100%'
  },
  imagess: {
    width: 20,
    height: 20,
    marginLeft: 15,
  },
  buttonContainer1: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#C0C0C0',
    marginTop: 30,
    width: 300,
    borderColor:'white'
  },
  buttonInnerContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  buttonText1: {
    marginLeft: 60,
    color: 'black',
    width:200
  },
  imagess1: {
    width: 20,
    height: 20,
    marginLeft: 15,
  },
  createaccount: {
    marginTop: 30,
    width:'100%',
    flexDirection:'row',
   paddingStart:85,
   
  },
  texttt1: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    
  },
  icon: {
    fontSize: 20,
    color: "#7DDDFF",
    marginTop: 3,
  },
});
