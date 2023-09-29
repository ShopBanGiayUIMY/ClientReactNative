import Config from "../Api/Config";
import { useState, useEffect } from "react";
import axios from "axios";

const useAuth = () => {
  useEffect(() => {
    const checkAuth = async () => {
      console.log("đang check mã phân quyền...");
    };
    checkAuth();
  }, []);

  const loginUser = async (user) => {
    try {
      const response = await axios
        .post(
          `${Config.API_BASE_URL}/login`,
          {
            user: user,
          },
          {
            headers: Config.configHeaders,
            // Authorization: `Bearer ${token}`
          }
        )
        .then((response) => {
          if (response.data.access_token) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
        });
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const registerUser = async (user) => {
    try {
      const response = await axios
        .post(
          `${Config.API_BASE_URL}/api/v1/users`,
          {
            user: user,
          },
          {
            headers: Config.configHeaders,
          }
        )
        .then((response) => {
          if (response.data.success) {
            console.log("đăng ký thành công");
          }
        });
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  return {loginUser, registerUser };
};

export default useAuth;
