import React, { createContext, useContext, useReducer } from "react";

// Tạo một React Context với giá trị mặc định
const AuthContext = createContext();

// Provider component chứa giá trị và hàm dispatch
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hàm reducer (để quản lý các hành động liên quan đến xác thực)
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case "USERINFO":
      return {
        ...state,
        userInfo: action.payload,
      };
    case "INFOCART":
      return {
        ...state,
        infoCart: action.payload,
      };
    case "ORDERCART":
      return {
        ...state,
        OrderCart: action.payload,
      };
    case "USE_VOUCHER":
      return {
        ...state,
        UseVoucher: action.payload,
      };
    default:
      return state;
  }
};

// Giá trị mặc định cho Context
const initialState = {
  isLoggedIn: false,
  user: null,
  userInfo: [],
  OrderCart: [],
  infoCart: [],
  UseVoucher: [],
};

// Custom hook để sử dụng giá trị và hàm dispatch từ Context
export const AuthStatus = () => {
  return useContext(AuthContext);
};
