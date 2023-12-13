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
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

import loading from "../../images/loading.gif";
import Header from "../../components/Header/Header";
import HeaderBanner from "../../components/Header/HeaderBanner";
import MenuCategory from "../../components/MenuCategory/MenuCategory";
import Product from "../../components/Product/Product";
import ProductHorizontal from "../../components/Product/productHorizontal";
import { FlatGrid } from "react-native-super-grid";
import NetInfo from "@react-native-community/netinfo";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
import { useFocusEffect } from "@react-navigation/native";
import { soluonggiohang } from "../../Services/Redux/action/Actions";
import { useDispatch, useSelector } from "react-redux";

import useAuth from "../../Services/auth.services";
const latestList = [
  {
    id: "1",
    image:
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/2eff461f-f3ac-4285-9c6a-2f22173aac42/custom-nike-air-force-1-low-by-you.png",
    name: "Tech Fleece",
    category: "Men's Pullover Hoodie",
    oldPrice: 110,
    price: 110,
  },
  {
    id: "2",
    image:
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/fdded470-0ac5-4bd7-b41b-1bb63e161438/custom-nike-air-force-1-mid-by-you-shoes.png",
    name: "Indy Luxe",
    category: "Women's light support",
    oldPrice: 50,
    price: 30,
  },
  {
    id: "7",
    image:
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/2eff461f-f3ac-4285-9c6a-2f22173aac42/custom-nike-air-force-1-low-by-you.png",
    name: "Space Hippi",
    category: "Women's light support",
    oldPrice: 130,
    price: 130,
  },
  {
    id: "3",
    image:
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/2eff461f-f3ac-4285-9c6a-2f22173aac42/custom-nike-air-force-1-low-by-you.png",
    name: "Space Hippi",
    category: "Women's light support",
    oldPrice: 130,
    price: 130,
  },
  {
    id: "5",
    image:
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/2eff461f-f3ac-4285-9c6a-2f22173aac42/custom-nike-air-force-1-low-by-you.png",
    name: "Space Hippi",
    category: "Women's light support",
    oldPrice: 130,
    price: 130,
  },
  {
    id: "4",
    image:
      "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/2eff461f-f3ac-4285-9c6a-2f22173aac42/custom-nike-air-force-1-low-by-you.png",
    name: "Space Hippi",
    category: "Women's light support",
    oldPrice: 130,
    price: 130,
  },
];
import Config from "../../Api/Config";
export default function ListProduct({ navigation }) {
  const [data, setData] = useState([]);
  const [datafull, setDatafull] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [visibleItems, setVisibleItems] = useState(4);
  const [isConnected, setIsConnected] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [key, setKey] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const dispatchRedux = useDispatch();
  const { getTotalCart } = useAuth();

  useFocusEffect(
    React.useCallback(() => {
      setKey((prevKey) => prevKey + 1);
    }, [])
  );

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
    outputRange: ["rgba(234, 235, 236, 0.72)", "#00BCD4"],
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
          setDatafull(responseData);
          const first10Items = responseData.slice(0, visibleItems);
          if (first10Items.length == responseData.length) {
            setHasMoreData(false);
          } else {
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
      getTotalCart().then((res) => {
        console.log("res[0].total_cart_items");
        dispatchRedux(soluonggiohang(res[0].total_cart_items));
      });
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

        if (offsetY + height >= contentHeight - 20 && hasMoreData) {
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
  const filteredtotalQuantitySold = () => {
    const filteredProducts = datafull.filter(
      (product) =>
        product.total_quantity_sold !== null &&
        parseInt(product.total_quantity_sold) >= 7
    );
    // Sắp xếp mảng theo thứ tự giảm dần của total_quantity_sold
    filteredProducts.sort(
      (a, b) =>
        parseInt(b.total_quantity_sold) - parseInt(a.total_quantity_sold)
    );
    return filteredProducts;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={{ backgroundColor, ...styles.viewBanner }}>
        <Header navigation={navigation} key={key} />
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
          {filteredtotalQuantitySold().length > 0 ? (
            <SafeAreaView
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                paddingBottom: 10,
              }}
            >
              <View
                style={{
                  marginTop: 12,
                }}
              >
                <View style={{}}>
                  <Text
                    style={{
                      fontSize: 18,
                      marginVertical: 2,
                      paddingLeft: 10,
                      fontWeight: "bold",
                    }}
                  >
                    Sản phẩm được bán nhiều
                  </Text>
                  <FlatList
                    horizontal={true}
                    data={filteredtotalQuantitySold()}
                    keyExtractor={(item) => item.id}
                    style={{ marginHorizontal: 5 }}
                    renderItem={({ item, index }) => (
                      <ProductHorizontal item={item} index={index} />
                    )}
                  />
                </View>
              </View>
            </SafeAreaView>
          ) : null}

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
