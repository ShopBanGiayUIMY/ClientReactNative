import React, { useState } from "react";
import {View, Text, StyleSheet} from 'react-native';


export default function Category(){
     const [count, setCoung] = useState(0);
return(
     <View style={style.container}>
          <View >

          </View>
          <Text>This is screen Cart</Text>
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

