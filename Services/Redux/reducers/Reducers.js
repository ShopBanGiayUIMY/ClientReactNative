import { SOLUONG_GIOHANG , INFOCART , USERINFO , LOGIN } from "../ActionTypes";
const initState = {
  total: 0,
  isLoggedIn: false,
  user: null,
  userInfo: null,
  infoCart: null,
  
};
export const Reducers = (state = initState, action) => {
  switch (action.type) {
    case SOLUONG_GIOHANG:
      return {
        ...state,
        total: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case USERINFO:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.payload,
      };
    case INFOCART:
      return {
        ...state,
        isLoggedIn: true,
        infoCart: action.payload,
      };
    default:
      return state;
  }
  // return false
};
