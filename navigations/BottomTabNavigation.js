import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Notification from "../Screen/Notification";
import Profile from "../Screen/Informations/Profile";

import Home from "../Screen/Home/Home";

import Cart from "../Screen/Cart/Cart";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import * as Animatable from "react-native-animatable";
import React, { useRef, useEffect } from "react";
import { View, TouchableWithoutFeedback, Text } from "react-native";

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
const BottomTabNavigation = () => {
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
        name="Home"
        component={Home}
        options={{
          tabBarShowLabel: false,
          title: "Chào mừng bạn",
          headerShown: false,

          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={20} />
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
              <View
                style={{
                  position: "absolute",
                  bottom: 16,
                  width: 10,
                  height: 10,
                  borderRadius: 8,
                  top: -3,
                  left: 12,
                  backgroundColor: "#3C3C3C",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 999,
                }}
              >
                <Text
                  style={{
                    fontSize: 5,
                    color: "#FFFFFF",
                  }}
                >
                  8
                </Text>
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
};

export default BottomTabNavigation;
