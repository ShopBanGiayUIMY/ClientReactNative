import React, { useState } from "react";
import {View, Text, StyleSheet} from 'react-native';
import ModalBottom from "./Modal/modal.bottom";
import Discount from "../Screen/Discount/Discount"
export default function Category(){
return(
     // <ModalBottom/>
     <View style={style.container}>
          {/* <Discount/> */}
     </View>
)
}


const style = StyleSheet.create({
     container:{
          flex:1,
          justifyContent:'center',
          alignItems:'center',
          backgroundColor:'#A9CDEE',
          
     }
})

