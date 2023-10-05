import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  RefreshControl,
} from "react-native";
import loading from "../../images/loading.gif";
import Discountcpn from "../../components/Discountcpn"
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const apiUrl = "https://64e6e269b0fd9648b78f008b.mockapi.io/api/magiamgia";

const Discount = () => {
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isloading, setIsloading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      const responseData = await response.json();
      setData(responseData);
      setIsloading(false);
      console.log("Đã load dữ liệu thành công");
    } catch (error) {
      console.error("Đang gặp lỗi vui lòng chờ đợi trong giây lát:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshing]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
    setTimeout(() => {
      setRefreshing(false);
    }, 3500);
  };

  return (
    <View>
      {isloading ? (
        <Image source={loading} style={styles.loadingImage} />
      ) : (
        <ScrollView
        horizontal={true} 
        showsHorizontalScrollIndicator={false} 
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={["#9Bd35A", "#689F38"]}
            />
          }
        >
          {data && data.map((discount, index) => (
            <Discountcpn key={index} dataProd={discount} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingImage:{
    width: 100,
    height: 100,
    marginTop: 100,
    alignSelf: "center",
  }
})

export default Discount;
