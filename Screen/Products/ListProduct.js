import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  ToastAndroid,
  Animated,
} from "react-native";

import loading from "../../images/loading.gif";
import Header from "../../components/Header/Header";
import HeaderBanner from "../../components/Header/HeaderBanner";
import MenuCategory from "../../components/MenuCategory/MenuCategory";
import Product from "../../components/Product/Product";
import { FlatGrid } from "react-native-super-grid";
import NetInfo from "@react-native-community/netinfo";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import Config from "../../Api/Config";
export default function ListProduct({ navigation }) {
  const [data, setData] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [visibleItems, setVisibleItems] = useState(4);
  const [isConnected, setIsConnected] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true); 
  const checkInternetConnection = async () => {
    const netInfoState = await NetInfo.fetch();
    if (netInfoState.isConnected) {
      return true;
    } else {
      return false;
    }
  };
  const scrollY = new Animated.Value(0);
  const backgroundColor = scrollY.interpolate({
    inputRange: [0, 300],
    outputRange: ["rgba(234, 235, 236, 0.72)", "rgba(255, 0, 0, 0.7)"],
    extrapolate: "clamp",
  });

  const fetchData = () => {
    // Define the API URL huy
    if (checkInternetConnection()) {
      const apiUrl = `${Config.API_BASE_URL}/products`;
      // Make the GET request using fetch
      fetch(apiUrl)
        .then((response) => response.json())
        .then((responseData) => {
          // Handle the retrieved data by updating the state
          const first10Items = responseData.slice(0, visibleItems);
          if (first10Items.length == responseData.length) {
            setHasMoreData(false);
          }else{
            setHasMoreData(true);
          }
          setData(first10Items);
          setIsLoading(false);
          setRefreshing(false);
        })
        .catch((error) => {
          console.error("Đang gặp lỗi vui lòng chờ đợi trong giây lát:");
          setRefreshing(false);
          setTimeout(() => {
            setIsConnected(false);
            setIsLoading(false);

            ToastAndroid.show("Không có kết nối internet", ToastAndroid.SHORT);
          }, 5000);
        });
    }
  };

  useEffect(() => {
    if (!refreshing) {
      fetchData();
    }
  }, [refreshing]);

  useEffect(() => {
    if (visibleItems > 4)
      setTimeout(() => {
        setRefreshing(true);
        fetchData();
      }, 1000);
  }, [visibleItems]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const contentHeight = event.nativeEvent.contentSize.height;
        const height = event.nativeEvent.layoutMeasurement.height;
        
          if (offsetY + height >= contentHeight - 20&& hasMoreData) {
            setVisibleItems(visibleItems + 4);
        
        }
      },
    }
  );
  const handlePressDetailProduct = (item) => {
    navigation.navigate("ProductDetail", { product: item });
  };

  const handleRefresh = () => {
    if (checkInternetConnection()) {
      setIsLoading(true);
      setVisibleItems(4);
      setTimeout(() => {
        setRefreshing(true);
        fetchData();
        setIsConnected(true);
        ToastAndroid.show("Đang tải lại dữ liệu", ToastAndroid.SHORT);
      }, 1700);
    } else {
      setTimeout(() => {
        setIsConnected(false);
        setIsLoading(false);
        setRefreshing(false);
        ToastAndroid.show("Không có kết nối internet", ToastAndroid.SHORT);
      }, 5000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View  style={{ backgroundColor, ...styles.viewBanner }}>
        <Header navigation={navigation} />
      </Animated.View>
      {isloading ? (
        { isConnected } ? (
          <ScrollView
            contentContainerStyle={styles.viewProductsContainer}
            showsVerticalScrollIndicator={false}
            onScroll={handleScroll}
            removeClippedSubviews={true}
            maximumZoomScale={1}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={["#9Bd35A", "#689F38"]}
              />
            }
            nestedScrollEnabled={true}
            style={{ flex: 0 }}
          >
            <Image source={loading} style={styles.loadingImage} />
          </ScrollView>
        ) : null
      ) : (
        <ScrollView
          contentContainerStyle={styles.viewProductsContainer}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          removeClippedSubviews={true}
          maximumZoomScale={1}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={["#9Bd35A", "#689F38"]}
            />
          }
          nestedScrollEnabled={true}
          style={{ flex: 0 }}
        >
          {/* banner */}

          <HeaderBanner />
          <MenuCategory />

          <View style={styles.productList}>
            <FlatGrid
              itemDimension={WIDTH / 3}
              scrollEnabled={false}
              data={data}
              renderItem={({ item }) => (
                <Product
                  dataProd={item}
                  handlePress={handlePressDetailProduct}
                />
              )}
            />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    flex: 1,
    paddingBottom: 50,
    alignItems: "center",
    alignContent: "center",
    height: HEIGHT,
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
    paddingTop: StatusBar.currentHeight,
  },
  viewProductsContainer: {
    flexGrow: 1,
  },
  productList: {
    // flexDirection: "row",
    // flexWrap: "wrap",
    // justifyContent: "space-around",
    // marginTop: 12,
    // alignSelf: "center",
    // width: WIDTH-10,
    // borderColor: "red",
    // borderWidth: 1,
  },
  loadingImage: {
    width: 100,
    height: 100,
    marginTop: 100,
    alignSelf: "center",
  },
});
