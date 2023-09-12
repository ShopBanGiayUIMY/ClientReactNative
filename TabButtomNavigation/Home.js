import React from "react";
import { View, Text } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListProduct from "../Screen/ListProduct";
import Login from "../Screen/Login";
import Register from "../Screen/Register";
import Information from "../Screen/Information";
import { faHouse, faUserTie, faCartShopping, faCat } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ListProduct"
        component={ListProduct}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <FontAwesomeIcon icon={faHouse} color={focused ? '#e32f45' : '#748c94'} size={15} />
              <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 15 }}>
                ListProduct
              </Text>
            </View>
          ),
          tabBarLabel: '', 
        }}
      />
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <FontAwesomeIcon icon={faCat} color={focused ? '#e32f45' : '#748c94'} size={15} />
              <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 15 }}>
                Login
              </Text>
            </View>
          ),
          tabBarLabel: '', 
        }}
      />
       <Tab.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <FontAwesomeIcon icon={faCartShopping} color={focused ? '#e32f45' : '#748c94'} size={15} />
              <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 15 }}>
              Register
              </Text>
            </View>
          ),
          tabBarLabel: '', 
        }}
      />
           <Tab.Screen
        name="Information"
        component={Information}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <FontAwesomeIcon icon={faUserTie} color={focused ? '#e32f45' : '#748c94'} size={15} />
              <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 15 }}>
              Information
              </Text>
            </View>
          ),
          tabBarLabel: '', 
        }}
      />
      
    </Tab.Navigator>
  );
}
