import React from "react";
import { View, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ListProduct from "../Screen/ListProduct";
import Cart from "../Screen/Cart"
import Information from "../Screen/Information";
import Category from "../Screen/Category";
import { faHouse, faUserTie, faCartShopping, faCat, faHouseChimney, faList } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const Tab = createBottomTabNavigator();

  const getTabBarIcon = (focused, routeName) => {
    let icon;
    if (routeName === "ListProduct" && focused) {
      icon = faHouseChimney; 
    } else if (routeName === "ListProduct" && !focused) {
      icon = faHouse; 
    } else if (routeName === "Category" && !focused) {
      icon = faList;
    } else if (routeName === "Category") {
      icon = faCat;
    } else if (routeName === "Cart") {
      icon = faCartShopping;
    } else if (routeName === "Information") {
      icon = faUserTie;
    }
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          top: 10,
          paddingBottom:10,
          width:'100%',
          height:70,
          borderRadius:10,
          padding:5
        }}
      >
        <FontAwesomeIcon
          icon={icon}
          color={focused ? "#e32f45" : "#748c94"}
          size={15}
        />
        <Text
          style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 15 }}
        >
          {routeName}
        </Text>
      </View>
    );
  };

  return (
    <Tab.Navigator initialRouteName="Login" tabBarOptions={{ showLabel: false }}>
      <Tab.Screen
        name="ListProduct"
        component={ListProduct}
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => getTabBarIcon(focused, route.name),
        })}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => getTabBarIcon(focused, route.name),
        })}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => getTabBarIcon(focused, route.name),
        })}
      />
      <Tab.Screen
        name="Information"
        component={Information}
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => getTabBarIcon(focused, route.name),
        })}
      />
    </Tab.Navigator>
  );
}
