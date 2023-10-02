import Config from "../Api/Config";
import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authHeader from "./auth.header";
const useAuth = () => {
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
        AsyncStorage.setItem("user", JSON.stringify(response.data));
      }
    } catch (error) {
      console.error("Lỗi dăng nhập :", error);
    }
  };
  const registerUser = async (user) => {
    try {
      const response = await axios
        .post(
          `${Config.API_BASE_URL}/register`,
          user,
          {
            headers: Config.configHeaders,
          }
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
