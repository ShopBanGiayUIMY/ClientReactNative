import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Cart from "./Screen/Cart/Cart";
import Register from "./Screen/Register/Register";
import Notification from "./Screen/Notification";
import Profile from "./Screen/Informations/Profile";
import Login from "./Screen/Login/Login";
import ProductDetail from "./Screen/Products/ProductDetail";
import SplashStore from "./Screen/Splash/SplashStore";
import Home from "./Screen/Home/Home";
import Setting from "./Screen/Setting/Setting";
import ResetPassword from "./Screen/SecurityAccount/ResetPassword";
import FormSecurity from "./Screen/SecurityAccount/FormSecurity/FormSecurity";
import PasswordNew from "./Screen/SecurityAccount/PasswordNew";
import Coupon from "./Screen/Coupons/Coupon";
import CpnProductDetail from "./components/Product/CpnProductDetail";
import Address from "./Screen/Informations/Address";
import Category from "./components/MenuCategory/Category"

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import * as Animatable from "react-native-animatable";
import React, { useRef, useEffect } from "react";
import AccountInfo from "./Screen/Accountinfomation/Accountinfo";
import { View, TouchableWithoutFeedback,Text } from "react-native";
import LikeProducts from "./Screen/Informations/LikeProducts";
import Search from "./Screen/Search/Search";
import Icon from "react-native-vector-icons/FontAwesome";
import DanhGiaProduct from "./Screen/danhgia/danhgiaproduct";

function TabButton({ onPress, accessibilityState, children }) {
  const viewRef = useRef(null);
  useEffect(() => {
    let animationFrameId;
  
    const handleAnimation = () => {
      if (accessibilityState.selected) {
        viewRef.current.animate({
          0: { scale: 0.3 },
          1: { scale: 2 },
        });
      } else {
        viewRef.current.animate({
          0: { scale: 0.5 },
          1: { scale: 1.5 },
        });
      }
    };
  
    const handleFrame = () => {
      animationFrameId = requestAnimationFrame(handleAnimation);
    };
  
    handleFrame();
  
    return () => cancelAnimationFrame(animationFrameId);
  }, [accessibilityState.selected]);
  

  return (
    <TouchableWithoutFeedback onPress={onPress} style={{ flex: 1 }}>
      <Animatable.View ref={viewRef} duration={500} style={{ flex: 1 }}>
        {children}
      </Animatable.View>
    </TouchableWithoutFeedback>
  );
}
const MemoizedCart = React.memo(Cart);
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 55,
          position: "absolute",
          backgroundColor: "#fff",
          borderRadius: 30,
          marginHorizontal: 5,
          marginBottom: 10,
        },
      }}
    >
      <Tab.Screen
        name="Homes"
        component={Home}
        options={{
          
          tabBarShowLabel: false,
          title: "Chào mừng bạn",
          headerShown: false,
          
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={20}  />
          ),
          tabBarButton: (props) => <TabButton {...props} />,
         
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarShowLabel: false,
          title: "Thông báo",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={20} />
          ),
          tabBarButton: (props) => <TabButton {...props} />,
        }}
      />
     
      <Tab.Screen
        name="Cart"
        component={MemoizedCart}
        options={{
          tabBarShowLabel: false,
          title: "Cart",
          tabBarIcon: ({ color }) => (
           
            <View>
                <View style={{
                    position: "absolute",
                    bottom: 16,
                    width: 12,
                    height: 12,
                    borderRadius: 8,
                    top: -3,
                    left: -5,
                    backgroundColor: "#3C3C3C",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 999
                }}>
                    <Text style={{
                        fontSize: 7,
                        color: "#FFFFFF"
                    }}>8</Text>
                </View>
                 <MaterialCommunityIcons name="cart" color={color} size={20} />
            </View>
          ),
          tabBarButton: (props) => <TabButton {...props} />,
        }}
      />
       <Tab.Screen
        name="Notificationf"
        component={Notification}
        options={{
          tabBarShowLabel: false,
          title: "Thông báo",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color={color} size={20} />
          ),
          tabBarButton: (props) => <TabButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={20} />
          ),
          tabBarButton: (props) => <TabButton {...props} />,
        }}
      />
    </Tab.Navigator>
  );
}
const MemoizedHome = React.memo(TabNavigator);
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashStore">
        <Stack.Screen
          name="SplashStore"
          component={SplashStore}
          options={{ headerShown: false}}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={MemoizedHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LikeProducts"
          component={LikeProducts}
          
        />
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
            headerShown:false
          }}
        />
           <Stack.Screen
          name="Category"
          component={Category}
          options={{
            resetOnBlur: true,
            headerShown:false
          }}
        />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="FormSecurity" component={FormSecurity} />
        <Stack.Screen name="PasswordNew" component={PasswordNew} />
        <Stack.Screen name="Coupon" component={Coupon} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="DanhGiaProduct" component={DanhGiaProduct} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
