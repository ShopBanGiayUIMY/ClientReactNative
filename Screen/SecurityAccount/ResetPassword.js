import React, { useState, useLayoutEffect,useEffect } from 'react';
import { StyleSheet, View, Text, TextInput,Image, TouchableOpacity, ToastAndroid } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import  useAuth  from "../../Services/auth.services";
import { AuthStatus } from "../../Services/AuthContext";
const ResetPassword = ({ isVisible, navigation }) => {
  const {state}=AuthStatus();
  const [email,setmail]=useState(null); 
  const [phone,setphone]=useState(null); 
  const { InfoAuth,CheckOtp } = useAuth()
  const handleNavigation = (screenName, data) => {
    setTimeout(() => {
      navigation.replace(screenName, { data });
      ToastAndroid.show("Gửi mã xác nhận thành công", ToastAndroid.SHORT);
      
    }, 700);
   console.log( "huhuihuih",state.userInfo);
    if (data.name === "gmail") {
      try {
        setTimeout(() => {
          if (email) {
            CheckOtp({ email: email });
          }
          else {
            CheckOtp({ email: state.userInfo.email });
          }
          
        }, 3000);
       
      
      } catch (error) {
        console.error("Lỗi khi gửi email:", error);
      }
    }
  };
  const fetchData = async () => {
    try {
      const data = await InfoAuth();
      if (data) {
        setmail(data.email);
        setphone(data.phone);
      }
    } catch (error) {
      console.error("Error fetching data5:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []); 
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Xác minh bảo mật',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.replace("AccountInfo")} style={{ marginLeft: 5, marginRight: 10 }}>
          <FontAwesome name="chevron-left" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
      ),
    });
  }, []);


  return (
    <View style={styles.container}>
      
      <Image
          source={{ uri: 'https://iili.io/J3VhYVS.png' }} // Thay đổi đường dẫn thành URL hình ảnh của bạn
          style={styles.image}
        />
        <Text style={{textAlign:"center",fontSize:15,color:"#689BA5",paddingLeft:10,paddingRight:10}} >Để bảo vệ bảo mật tài khoản của bạn, chúng tôi cần xác nhận danh tính của bạn </Text>
      <Text style={{textAlign:"center",fontSize:15,color:"#689BA5",padding:10}} >Vui lòng chọn cách xác minh</Text>
        <View style={styles.item}>
      
        
      <TouchableOpacity style={styles.button} onPress={()=>handleNavigation("FormSecurity",{name:"gmail",data:email})}>
        <View style={styles.buttonContent}>
          <FontAwesome name="envelope" size={24} color="white" style={styles.iconemail} />
          <Text style={styles.buttonText}>Gửi mã về Email</Text>
          <FontAwesome name="chevron-right" size={24} color="black" style={styles.iconitem}/>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}  onPress={()=>handleNavigation("FormSecurity")}>
        <View style={styles.buttonContent}>
          <FontAwesome name="phone" size={24} color="white" style={styles.iconphone} />
          <Text style={styles.buttonText}>Gửi mã về Số điện thoại</Text>
          <FontAwesome name="chevron-right" size={24} color="black" style={styles.iconitem}/>
        </View>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    width: "90%",
    borderColor: '#42A5B9',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    marginRight: 10,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  buttonText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#798D91',
  },
  icon: {
    fontSize: 20,
    marginTop: 2,
  },
  iconemail: {
    fontSize: 25,
    marginTop: 2,
    color: '#798D91',
  },
  iconphone: {
    fontSize: 25,
    marginTop: 2,
    color: '#798D91',
  },
  iconitem:{
    fontSize: 15,
    color: "#BCBCBC",
    marginTop: 3,
    marginLeft: 10,
    borderColor: "#BCBCBC",
    marginLeft: 'auto',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain', 
  },
  item:{
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    marginTop: 60,
  }
});

export default ResetPassword;
