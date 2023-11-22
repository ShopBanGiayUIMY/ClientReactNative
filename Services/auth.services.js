import Config from "../Api/Config";
import { useState, useEffect } from "react";
import { ToastAndroid } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authHeader from "./auth.header";
import { AuthStatus } from "./AuthContext";
const useAuth = () => {
  // khai báo hàm lưu trạng thái đăng nhập
  const { dispatch } = AuthStatus();
  //
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const headers = await authHeader();
  //     try{
  //       const response = await axios.get(`${Config.API_BASE_URL}/user`, {
  //         headers: headers,
  //       });
  //       if (response.data) {
  //         console.log("thông tin người dùng", response.data);
  //       }
  //     }
  //     catch(error){
  //       console.log("token",headers);
  //       console.error("Lỗi check auth:", error);
  //     }
  //   };
  //   checkAuth();
  // }, []);

  const loginUser = async (user) => {
    try {
      const response = await axios.post(
        `${Config.API_BASE_URL}/auth/login`,
        user
      );
      if (response.data) {
        console.log("Đăng nhập thành công", response.data);
        dispatch({ type: "LOGIN", payload: response.data.user_id });
       
        return response.data;
      }
    } catch (error) {
      console.error("Lỗi dăng nhập :", error);
    }
  };
  const registerUser = async (user) => {
    console.log("userr", user);
    try {
      const response = await axios.post(
        `${Config.API_BASE_URL}/auth/register`,
        user
      );
      return response.data;
    } catch (error) {
      console.error("Lỗi đăng ký tài khoản:", error);
    }
  };
  const InfoAuth = async () => {
    const headers = await authHeader();
    const userid = await AsyncStorage.getItem("user_id");
    try {
      const response = await axios.get(
        `${Config.API_BASE_URL}/auth/infouser/${userid}`,
        {
          headers: headers,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log("lỗi mạng", error);
    }
  };
  const CheckOtp = async (user) => {
    try {
      const headers = await authHeader();
      const userid = await AsyncStorage.getItem("user_id");
      const response = await axios.post(
        `${Config.API_BASE_URL}/auth/verify-user/${userid}`,
        user,
        {
          headers: headers,
        }
      );
      if (response.data) {
        console.log("Reset thành công", response.data);
      }
    } catch (error) {
      console.error("Lỗi gửi otp:", error);
    }
  };
  const CreatePasswordUser = async (user) => {
    try {
      const headers = await authHeader();
      const userid = await AsyncStorage.getItem("user_id");
      const response = await axios.post(
        `${Config.API_BASE_URL}/auth/authentication-otp/${userid}`,
        user,
        {
          headers: headers,
        }
      );
      if (response.data) {
        console.log("otp đúng", response.data);
        return response.data;
      }
    } catch (error) {
      ToastAndroid.show("Mã lỗi không xác định", ToastAndroid.SHORT);
    }
  };
  const GetCart = async (cart) => {
    const headers = await authHeader();
    try {
      const response = await axios.get(`${Config.API_BASE_URL}/carts/`, {
        headers: headers,
      });
      if (response.data) {
        
        return response.data;
      }
    } catch (error) {
      ToastAndroid.show("Mã lỗi không xác định", ToastAndroid.SHORT);
    }
  };
  const GetVoucher = async () => {
    const headers = await authHeader();
    try {
      const response = await axios.get(`${Config.API_BASE_URL}/vouchers/`, {
        headers: headers,
      });
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      ToastAndroid.show("Mã lỗi không xác định", ToastAndroid.SHORT);
    }
  }
  return {
    loginUser,
    registerUser,
    InfoAuth,
    CheckOtp,
    CreatePasswordUser,
    GetCart,
    GetVoucher
  };
};

export default useAuth;
