
import React from 'react'
import {
    View,
    ScrollView,
    StyleSheet,
    Image,
    Text,
    Pressable,
  } from "react-native";
export default MenuCategory = ({navigation}) => {
    const list = [
        {
          id: "0",
          image: "https://png.pngtree.com/png-vector/20210114/ourlarge/pngtree-promotion-vector-icon-png-image_2742739.png",
          name: "Deals",
        },
        {
          id: "1",
          image:
            "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg",
          name: "Deals",
        },
        {
          id: "3",
          image:
            "https://bizweb.dktcdn.net/thumb/grande/100/453/330/products/image-1667360212198.png?v=1694449388200",
          name: "Thương hiệu",
        },
        {
            id: "4",
            image:
              "https://cdn-icons-png.flaticon.com/512/600/600176.png",
            name: "Giá sốc",
          },
        {
          id: "5",
          image:
            "https://2c3698e1213f692c1f30-e875ca96b66c757445b3b9b63d20195d.ssl.cf3.rackcdn.com/files/cf2afee48a9b5ef017e9356157a6d1aa.png",
          name: "Mã giảm giá",
        },
       
          {
            id: "6",
            image:
              "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg",
            name: "Mobiles",
          },
    ];
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item, index) => (
                <View key={index}>
              <Pressable
              onPress={() => alert("đã ấn menu "+item?.id)}
                key={index}
                style={{
                    width: 50,
                    height: 50,
                  margin: 10,
                  borderRadius: 15,
                  borderWidth: 1,
                  padding: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",

                }}
              >
                <Image
                  style={{ width: 40, height: 40, resizeMode: "contain" }}
                  source={{ uri: item.image }}
                />

               
              </Pressable>
              <Text
                  style={{
                    textAlign: "center",
                    fontSize: 11,
                    fontWeight: "500",
                    marginTop: 0,
                  }}
                >
                  {item?.name}
                </Text>
                </View>
              
              
            ))}
          </ScrollView>
  )
}

