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
    try {
      const response = await axios.get(
        `${Config.API_BASE_URL}/users/info-user/`,
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
  const UpdateCreateCart = async (Cart_id, product_detail_id, quantity) => {
    const headers = await authHeader();
    try {
      const response = await axios.patch(
        `${Config.API_BASE_URL}/carts/${Cart_id}`,
        { product_detail_id: product_detail_id, quantity: quantity },
        {
          headers: headers,
        }
      );
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
  };
  const GetFavorite = async () => {
    const headers = await authHeader();
    try {
      const response = await axios.get(`${Config.API_BASE_URL}/favorites/`, {
        headers: headers,
      });
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      ToastAndroid.show(
        "Mã lỗi không xác định của GetFavorite",
        ToastAndroid.SHORT
      );
    }
  };
  const AddFavorite = async (product_id) => {
    const headers = await authHeader();
    try {
      const response = await axios.post(
        `${Config.API_BASE_URL}/favorites/create`,
        { productId: product_id },
        {
          headers: headers,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      ToastAndroid.show(
        "Mã lỗi không xác định của GetFavorite",
        ToastAndroid.SHORT
      );
    }
  };
  const RemoveFavorite = async (product_id) => {
    const headers = await authHeader();
    try {
      const response = await axios.delete(
        `${Config.API_BASE_URL}/favorites/delete/${product_id}`,
        {
          headers: headers,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      ToastAndroid.show("Mã lỗi không xác định", ToastAndroid.SHORT);
    }
  };
  const CheckFavoriteByProduct = async (product_id) => {
    const headers = await authHeader();
    try {
      const response = await axios.get(
        `${Config.API_BASE_URL}/favorites/check-favorited/${product_id}`,
        {
          headers: headers,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      ToastAndroid.show(
        "Mã lỗi không xác định của GetFavorite",
        ToastAndroid.SHORT
      );
    }
  };
  const getcountFavorites = async () => {
    const headers = await authHeader();
    try {
      const response = await axios.get(
        `${Config.API_BASE_URL}/favorites/count-favorites`,
        {
          headers: headers,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      ToastAndroid.show(
        "Mã lỗi không xác định của số lượng Favorite",
        ToastAndroid.SHORT
      );
    }
  };
  const GetSolidProductById = async (product_id) => {
    const headers = await authHeader();
    try {
      const response = await axios.post(
        `${Config.API_BASE_URL}/products/solidproduct?id=${product_id}`,
        {
          headers: headers,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log("Network error", error);
    }
  };
  const search_voucher_and_add = async (voucher_code) => {
    const headers = await authHeader();
    try {
      const response = await axios.post(
        `${Config.API_BASE_URL}/vouchers/find-voucher`,
        { voucher_code: voucher_code },
        {
          headers: headers,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.log("Network error", error);
    }
  };
  const getTotalCart = async () => {
    const headers = await authHeader();
    try {
      const response = await axios.get(
        `${Config.API_BASE_URL}/carts/total-cart`,
        {
          headers: headers,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return error.response.data;
    }
  };
  const getAddress = async () => {
    const headers = await authHeader();
    try {
      const response = await axios.get(`${Config.API_BASE_URL}/address/info`, {
        headers: headers,
      });
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return error.response.data; 
    }
  };
  const CreateAddress = async (address) => {
    const headers = await authHeader();
    try {
      const response = await axios.post(
        `${Config.API_BASE_URL}/address/create`,
        address,
        {
          headers: headers,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return error.response.data;
    }
  };
  const updateAddress = async (addressForm) => {
    const headers = await authHeader();
    try {
      const response = await axios.put(
        `${Config.API_BASE_URL}/address/update`,
        addressForm,
        {
          headers: headers,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return error.response.data;
    }
  };
  const DeleteAddress = async (address_id) => {
    const headers = await authHeader();
    try {
      const response = await axios.delete(
        `${Config.API_BASE_URL}/address/delete/${address_id}`,
        {
          headers: headers,
        }
      );
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      return error.response.data;
    }
  };
  return {
    loginUser,
    registerUser,
    InfoAuth,
    CheckOtp,
    CreatePasswordUser,
    GetCart,
    UpdateCreateCart,
    GetVoucher,
    GetFavorite,
    AddFavorite,
    RemoveFavorite,
    CheckFavoriteByProduct,
    getcountFavorites,
    GetSolidProductById,
    search_voucher_and_add,
    getTotalCart,
    getAddress,
    CreateAddress,
    updateAddress,
    DeleteAddress,
  };
};

export default useAuth;
