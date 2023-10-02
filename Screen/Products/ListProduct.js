import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
} from "react-native";

import Header from "../../components/Header";
import HeaderBanner from "../../components/HeaderBanner";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import Product from "../../components/Product";
export default function ListProduct({navigation}) {
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    // Define the API URL
    const apiUrl = "https://64e6e269b0fd9648b78f008b.mockapi.io/api/shopquanao";

    // Make the GET request using fetch
    fetch(apiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        // Handle the retrieved data by updating the state
        setData(responseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  ///
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    // Điều chỉnh giá trị opacity tùy thuộc vào vị trí cuộn của trang
    const newOpacity = Math.min(scrollY / 100, 1);
    setBackgroundOpacity(newOpacity);
  };

  const handlePresDetailProduct =(item)=>{
    navigation.navigate('ProductDetail',{product:item})
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          height:90
        }}
      >
        <Header navigation={navigation}/>
      </View>
      <ScrollView
        contentContainerStyle={styles.viewProductsContainer}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={this.handleRefresh}
            colors={["#9Bd35A", "#689F38"]}
          />
        }
      >
        {/* banner */}
        <HeaderBanner />
        <View style={styles.productList}>
          {data &&
            data.map((product, index) => (
             <Product key={index} dataProd={product} handlePress={handlePresDetailProduct} />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BBDEF2",
    paddingBottom: 50,
    
  },
  searchs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 75,
    backgroundColor: "rgba(75, 158, 255, 1)",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 47.6,
    borderWidth: 1,
    borderColor: "gray",
    marginLeft: 20,
  },
  inputt: {
    width: 200,
    height: 30,
    paddingLeft: 10,
    fontSize: 20,
    color: "white",
  },
  glass: {
    marginLeft: 10,
    marginRight: 5,
  },
  viewBanner: {
    width: WIDTH,
    height: HEIGHT * 0.25,
  },
  image: {
    width: WIDTH,
    height: HEIGHT * 0.25,
  },
  viewProductsContainer: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  productList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 5,
    paddingHorizontal: 10,
  },
  
});
