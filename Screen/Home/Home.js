
import React from "react";
import {View,Text } from "react-native";
import ListProduct from "../Products/ListProduct";
export default function Home({navigation}){  
        return(
            <ListProduct navigation={navigation}/>
        )

}