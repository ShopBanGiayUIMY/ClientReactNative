import Config from "../Api/Config";
import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authHeader from "./auth.header";
 import { AuthStatus } from "./AuthContext";
const useAuth = () => {
  // khai báo hàm lưu trạng thái đăng nhập
  const { dispatch } = AuthStatus();
  //
  useEffect(() => {
    const checkAuth = async () => {
      const headers = await authHeader();
      try{
        const response = await axios.get(`${Config.API_BASE_URL}/user`, {
          headers: headers,
        });
        if (response.data) {
          console.log("thông tin người dùng", response.data);
        }
      }
      catch(error){
        console.log("token",headers);
        console.error("Lỗi check auth:", error);
      }
    };
    checkAuth();
  }, []);

  const loginUser = async (user) => {
    try {
      const response = await axios.post(`${Config.API_BASE_URL}/auth/login`, user);
      if (response.data) {
        console.log("Đăng nhập thành công", response.data);
        dispatch({ type: "LOGIN", payload: response.data.user_id });
        AsyncStorage.setItem("accesstoken", JSON.stringify(response.data.accesstoken));
        AsyncStorage.setItem("user_id", JSON.stringify(response.data.user_id));
        AsyncStorage.setItem('isLoggedIn', 'true');
      }
    } catch (error) {
      console.error("Lỗi dăng nhập :", error);
    }
  };
  const registerUser = async (user) => {
    console.log ("userr", user);
    try {
      const response = await axios
        .post(
          `${Config.API_BASE_URL}/auth/register`,
          user
        );
      if (response.data) {
        console.log("Đăng ký thành công", response.data);
      }
       
    } catch (error) {
      console.error("Lỗi đăng ký tài khoản:", error);
    }
  };
  return { loginUser, registerUser };
};

export default useAuth;
