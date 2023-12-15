import React, { useRef, useEffect } from "react";
import { TouchableWithoutFeedback } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Animatable from "react-native-animatable";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "../Screen/Home/Home";
import Cart from "../Screen/Cart/Cart";
import LikeProducts from "../Screen/Informations/LikeProducts";
import Notification from "../Screen/Notification";
import Profile from "../Screen/Informations/Profile";
import CartBadge from "../components/Cart/CartBadge";
import { View, Text, StyleSheet } from "react-native";
import { AuthStatus } from "../Services/AuthContext";

const Tab = createMaterialBottomTabNavigator();

const NotificationBadge = () => {
  const { state } = AuthStatus();
  const totalCartItems = state.infoCart[0]?.total_cart_items;

  return (
    <>
      {totalCartItems > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{totalCartItems}</Text>
        </View>
      )}
    </>
  );
};

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#e91e63"
      inactiveColor="#000000"
      barStyle={styles.tabBar}
      labeled={true}
      shifting={true}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="LikeProducts"
        component={LikeProducts}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: "Yêu thích",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: "Giỏ hàng",
          
          tabBarIcon: ({ color }) => (
            <View style={styles.iconWrapper}>
              <MaterialCommunityIcons name="shopping" color={color} size={24} />
              {/* <NotificationBadge /> */}
              <CartBadge />
            </View>
          ),
          tabBarButton: (props) => (
            <TabButton {...props}>
            
            </TabButton>
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: "Thông báo",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="bell-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarLabel: "Tôi",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#ffffff",
    paddingBottom: 5,
    height: 65,
  },
  badge: {
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: "red",
    borderRadius: 8.5,
    width: 17,
    height: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  iconWrapper: {
    width: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BottomTabNavigation;
