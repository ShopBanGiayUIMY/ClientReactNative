import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  RefreshControl,
  Image,
  FlatList,
} from "react-native";
import loading from "../images/loading.gif";
import ProductInCart from "../components/Cart/ProductInCart";
import { AuthStatus } from "../Services/AuthContext";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
export default function Category({ navigation }) {
  const [data, setData] = useState([]);
  const apiURL = "https://654cec0077200d6ba859b242.mockapi.io/api/v1/addtocart";
  const [isloading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);
  const { state ,dispatch} = AuthStatus();
  const fetchData = async () => {
    try {
      const response = await fetch(apiURL);
      const data = await response.json();
      setData(data);
      setIsLoading(false);
      setRefreshing(false);
      console.log("====================================");
      console.log(data);
      console.log("====================================");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  
   
  useEffect(() => {
    state.isLoggedIn ? fetchData() :navigation.navigate("Login");
    
  }, [navigation]);

  const handleRefresh = () => {
    setIsLoading(true);
    setRefreshing(true);
    fetchData();
  };

  const renderProductItem = ({ item }) => (
    <ProductInCart dataProd={item} handlePress={handlePressItem} />
  );

  const handlePressItem = (dataProd) => {
    navigation.navigate("ProductDetail", { product: dataProd });
  };

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const newOpacity = Math.min(scrollY / 100, 1);
    setBackgroundOpacity(newOpacity);
  };

  return (
    <View style={style.container}>
      <ProductInCart />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A9CDEE",
  }
});
