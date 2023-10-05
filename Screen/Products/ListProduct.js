import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  RefreshControl,
} from "react-native";

import loading from "../../images/loading.gif";
import Header from "../../components/Header";
import HeaderBanner from "../../components/HeaderBanner";
import MenuCategory from "../../components/MenuCategory";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import Product from "../../components/Product";
export default function ListProduct({ navigation }) {
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isloading, setIsloading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  useEffect(() => {
    // Define the API URL
    const apiUrl = "https://64e6e269b0fd9648b78f008b.mockapi.io/api/shopquanao";

    // Make the GET request using fetch
    fetch(apiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        // Handle the retrieved data by updating the state
        setData(responseData);
        setIsloading(false);
        console.log("đã load dữ liệu thành công");
      })
      .catch((error) => {
        console.error("Đang gặp lỗi vui lòng chờ đợi trong giây lát:");
      });
  }, [isRefreshing]);
    
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const newOpacity = Math.min(scrollY / 100, 1);
    setBackgroundOpacity(newOpacity);
  };

  const handlePresDetailProduct = (item) => {
    navigation.navigate("ProductDetail", { product: item });
  
  };
 const handleRefresh = () => {
    setIsloading(true);
    setIsRefreshing(!isRefreshing);
    setTimeout(() => {
      setIsloading(false);
    }, 3500);
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          height: 90,
        }}
      >
        <Header backgroundOpacity={backgroundOpacity} />
      </View>
      {isloading ? (
        <Image
          source={loading}
          style={styles.loadingImage}
        />
      ) : (
        <ScrollView
          contentContainerStyle={styles.viewProductsContainer}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={["#9Bd35A", "#689F38"]}
            />
          }
        >
          {/* banner */}
          <View style={styles.viewBanner}>
            <HeaderBanner />
            <MenuCategory />
          </View>
         
          <View style={styles.productList}>
            {data &&
              data.map((product, index) => (
                <Product
                  key={index}
                  dataProd={product}
                  handlePress={handlePresDetailProduct}
                />
              ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A9CDEE",
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
    height: 300,
    paddingHorizontal: 3,
    paddingVertical: 3,
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
    marginTop: 12,
    paddingHorizontal: 13,
  },
  loadingImage: {
    width: 100,
    height: 100,
    marginTop: 100,
    alignSelf: "center",
  },
});
