import { SOLUONG_GIOHANG, INFOCART, USERINFO, LOGIN } from "../ActionTypes"
export const soluonggiohang = (data) => ({
  type: SOLUONG_GIOHANG,
  payload: data,
});
export const infoCart = (data) => {
  return {
    type: INFOCART,
    payload: data,
  };
};
export const userInfo = (data) => ({
  type: USERINFO,
  payload: data,
});
export const login = (data) => ({
  type: LOGIN,
  payload: data,
});
