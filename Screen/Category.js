import React from "react";
import {View, Text, StyleSheet} from 'react-native';


export default function Category(){
return(
     <View style={style.container}>
          <Text>This is screen Category</Text>
     </View>
)
}


const style = StyleSheet.create({
     container:{
          flex:1,
          justifyContent:'center',
          alignItems:'center'
     }
})

