import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ListProduct from "./Screen/ListProduct";
import Cart from './Screen/Cart';
import Register from './Screen/Register';
import Notification from './Screen/Notification';
import Information from './Screen/Information';
import Login from './Screen/Login';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import * as Animatable from 'react-native-animatable';
import React, { useRef, useEffect } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
function TabButton({ onPress, accessibilityState, children }) {
    const viewRef = useRef(null);
    useEffect(() => {
        if (accessibilityState.selected) {
            viewRef.current.animate({ 0: { scale: .5,rotate:'0deg' }, 1: { scale: 1.8,rotate:'360deg'  } });
        } else {
            viewRef.current.animate({0: { scale: .5,rotate:'360deg' }, 1: { scale: 1.5,rotate:'0deg'  } });
        }
    }, [accessibilityState.selected]);

    return (
        <TouchableWithoutFeedback onPress={onPress} style={{ flex: 1 }}>
            <Animatable.View ref={viewRef} duration={500} style={{ flex: 1 }}>
                {children}
            </Animatable.View>
        </TouchableWithoutFeedback>
    );
}

function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    height: 50,
                    position: 'absolute',
                    bottom: 10,
                    left: 10,
                    right: 10,
                    borderRadius: 50,
                   
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={ListProduct}
                options={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    title: 'Chào mừng bạn',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={20} />
                    ),
                    tabBarButton: (props) => <TabButton {...props} />
                }}

            />
            <Tab.Screen
                name="Notification"
                component={Notification}
                options={{
                    tabBarShowLabel: false,
                    title: 'Thông báo',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="bell" color={color} size={20} />
                    ),
                    tabBarButton: (props) => <TabButton {...props} />
                }}
            />
            <Tab.Screen
                name="Cart"
                component={Cart}
                options={{
                
                    tabBarShowLabel: false,
                    title: 'Cart',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="cart" color={color} size={20} />
                    ),
                    tabBarButton: (props) => <TabButton {...props} />
                }}
            />
            <Tab.Screen
                name="Information"
                component={Information}
                options={{
                    tabBarShowLabel: false,
                    title: 'Information',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={20} />
                    ),
                    tabBarButton: (props) => <TabButton {...props} />
                }}
            />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
        
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
