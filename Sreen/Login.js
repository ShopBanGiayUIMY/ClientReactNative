import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, Button } from "react-native";
import eye from "../image/eys.jpg";
import face from "../image/facebook.png";
import google from "../image/google.png";

import Checkbox from 'expo-checkbox';
export default function Login() {
     const [isChecked, setChecked] = useState(false);
     const [isPasswordVisible, setPasswordVisible] = useState(false);

     const togglePasswordVisibility = () => {
          setPasswordVisible(!isPasswordVisible);
     };
     const [toggleCheckBox, setToggleCheckBox] = useState(false)

     return (
          <View style={styles.container}>
               <Text style={styles.hi}>Hi, Welcome Back!{'\n'} </Text>
               <Text style={styles.vaytay}>👋</Text>
               <Text style={styles.nameapp}>Mini <Text style={styles.shop}> Shop</Text></Text>

               <View style={styles.view}>
                    <TextInput
                         style={styles.input}
                         placeholder="Enter your name"
                    />
                    <View style={styles.passwordInput}>
                         <TextInput
                              style={styles.input}
                              placeholder="Enter your password"
                              secureTextEntry={!isPasswordVisible} // Hiển thị hoặc ẩn mật khẩu tùy thuộc vào trạng thái của isPasswordVisible
                         />
                         <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeContainer}>
                              <Image source={eye} style={[styles.eye, isPasswordVisible && styles.invisibleEye]} />
                         </TouchableOpacity>
                    </View>
               </View>
               <View style={styles.checkboxx}>
                    <Checkbox
                         style={styles.checkbox}
                         value={isChecked}
                         onValueChange={setChecked}
                         color={isChecked ? '#4630EB' : undefined}

                    />
                    <Text style={{ marginLeft: 10, marginTop: 2 }}>Remember me? </Text>
                    <Text style={styles.forgotpassword}>Forgot the password?</Text>
               </View>
               <View style={styles.login}>
                    <Button
                         title="Login"
                         color="white"
                         accessibilityLabel="Learn more about this purple button"
                    />
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

const styles = StyleSheet.create({
     container: {
          marginTop:50
     },
     hi: {
          fontSize: 30,
          fontFamily: 'Cochin',
          fontWeight: 700,
          color: 'black',
          marginTop: 60,
          marginLeft: 30
     },
     vaytay: {
          textAlign: 'center',
          fontSize: 30,
          marginTop: -30
     },
     nameapp: {
          fontSize: 30,
          textAlign: 'center',
          fontWeight: 'bold'
     },
     shop: {
          color: 'rgba(255, 198, 0, 1)'
     },
     view: {
          marginTop: 60
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
          flexDirection: 'row'
     },
     forgotpassword: {
          marginLeft: 54,
          marginTop: 4,
          fontSize: 10,
          color: 'red'
     },
     login: {
          marginTop: 25,
          borderWidth: 1,
          backgroundColor: 'rgba(14, 100, 210, 1)',
          borderRadius: 10
     },
     orWith: {

          marginTop: 20,
          alignItems: 'center',
          marginBottom:20
     },
     buttonContainer: {
          borderWidth: 1,
          borderRadius: 10,
          backgroundColor: 'rgba(14, 100, 210, 1)', // Add some padding for better spacing
          marginTop: 10, // Add some top margin for spacing
     },
     buttonInnerContainer: {
          flexDirection: 'row', // Arrange the image and text horizontally
          alignItems: 'center', // Center the items vertically
          padding: 10,
     },
     buttonText: {
          marginLeft: 60,
          color:'white' // Add some left margin to create space between the image and text
     },
     imagess: {
          width: 20,
          height: 20,
          marginLeft: 15
     },
     buttonContainer1: {
          borderWidth: 1,
          borderRadius: 10,
          backgroundColor: 'white', // Add some padding for better spacing
          marginTop: 30, 
          
     },
     buttonInnerContainer1: {
          flexDirection: 'row', // Arrange the image and text horizontally
          alignItems: 'center', // Center the items vertically
          padding: 10,
     },
     buttonText1: {
          marginLeft: 60,
          color:'black' // Add some left margin to create space between the image and text
     },
     imagess1: {
          width: 20,
          height: 20,
          marginLeft: 15
     },
     createaccount:{
          marginTop:30,
     },
     texttt1:{
          textAlign:'center',
          fontWeight:'bold',
          textDecorationLine:'underline'
     }
    
});