import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./Screen/Register/Register";
import Login from "./Screen/Login/Login";
import ProductDetail from "./Screen/Products/ProductDetail";
import SplashStore from "./Screen/Splash/SplashStore";
import Setting from "./Screen/Setting/Setting";
import ResetPassword from "./Screen/SecurityAccount/ResetPassword";
import FormSecurity from "./Screen/SecurityAccount/FormSecurity/FormSecurity";
import PasswordNew from "./Screen/SecurityAccount/PasswordNew";
import Coupon from "./Screen/Coupons/Coupon";
import CpnProductDetail from "./components/Product/CpnProductDetail";
import Address from "./Screen/Informations/Address";
import Category from "./components/MenuCategory/Category";
import OrderDetail from "./Screen/Order/OrderDetail";
import Payment from "./Screen/Payment/Payment";
import PaymentMethod from "./Screen/Payment/PaymentMethod";
const Stack = createNativeStackNavigator();
import React, { useRef, useEffect } from "react";
import AccountInfo from "./Screen/Accountinfomation/Accountinfo";
import LikeProducts from "./Screen/Informations/LikeProducts";
import Search from "./Screen/Search/Search";
import DanhGiaProduct from "./Screen/danhgia/danhgiaproduct";
import BottomTabNavigation from "./navigations/BottomTabNavigation";
import Qrcode from "./Screen/Qrcode/Qrcode";
import ConfirmationOrder from "./Screen/ConfirmationOrder/ConfirmationOrder";
import EditAddress from "./Screen/Address/EditAddress";
import AddAddress from "./Screen/Address/AddAddress";
import CouponOrder from "./Screen/CouponsOrder/CouponOrder";
import Contact from "./Screen/Contact/Contact";
import VerifyVnPayPayMent from "./Screen/ConfirmationOrder/Verifyvnpaypayment";
import VerifyCOD from "./Screen/ConfirmationOrder/VerifyCOD";
import MainTabPurchase from "./Screen/PurchaseOrder/MainTabPurchase";
import StatusOrder from "./Screen/ConfirmationOrder/StatusOrder";
import UploadImage from "./Screen/Informations/upload";
const MemoizedBottomTab = React.memo(BottomTabNavigation);
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashStore">
        <Stack.Screen
          name="BottomTabNavigation"
          component={MemoizedBottomTab}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SplashStore"
          component={SplashStore}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="LikeProducts" component={LikeProducts} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen
          name="AccountInfo"
          component={AccountInfo}
          options={{
            resetOnBlur: true,
          }}
        />
        <Stack.Screen
          name="CpnProductDetail"
          component={CpnProductDetail}
          options={{
            resetOnBlur: true,
          }}
        />
        <Stack.Screen
          name="Address"
          component={Address}
          options={{
            resetOnBlur: true,
          }}
        />
        <Stack.Screen
          name="Category"
          component={Category}
          options={{
            resetOnBlur: true,
            
          }}
        />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="FormSecurity" component={FormSecurity} />
        <Stack.Screen name="PasswordNew" component={PasswordNew} />
        <Stack.Screen name="Coupon" component={Coupon} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="DanhGiaProduct" component={DanhGiaProduct} />
        <Stack.Screen name="Qrcode" component={Qrcode} />
        <Stack.Screen name="ConfirmationOrder" component={ConfirmationOrder} />
        <Stack.Screen
          name="OrderDetail"
          component={OrderDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentMethod"
          component={PaymentMethod}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="EditAddress" component={EditAddress} />
        <Stack.Screen name="AddAddress" component={AddAddress} />
        <Stack.Screen name="CouponOrder" component={CouponOrder} />
        <Stack.Screen name="Contact" component={Contact} options={{}} />
        <Stack.Screen
          name="VerifyCOD"
          component={VerifyCOD}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerifyVnPayPayMent"
          component={VerifyVnPayPayMent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabPurchase"
          component={MainTabPurchase}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StatusOrder"
          component={StatusOrder}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UploadImage"
          component={UploadImage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
