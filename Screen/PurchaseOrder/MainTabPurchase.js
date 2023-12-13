import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import ChoXacNhan from "./ChoXacNhan";
import DangXuLy from "./DangXuLy";
import ChoGiaoHang from "./ChoGiaoHang";
import DaGiaoHang from "./DaGiaoHang";
import DaHuy from "./DaHuy";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const renderScene = SceneMap({
  choXacNhan: ChoXacNhan,
  dangXuLy: DangXuLy,
  choGiaoHang: ChoGiaoHang,
  daGiaoHangGiao: DaGiaoHang,
  daHuy: DaHuy,
});

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "red" }}
    style={{ backgroundColor: "white", elevation: 0 }}
    labelStyle={{ color: "black", fontSize: 12 }}
    tabStyle={{ width: "auto" }}
    scrollEnabled={true}
    activeColor="red"
    inactiveColor="grey"
  />
);

const MainTabPurchase = ({ navigation }) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "choXacNhan", title: "Chờ xác nhận" },
    { key: "dangXuLy", title: "Đang xử lý" },
    { key: "choGiaoHang", title: "Chờ giao hàng" },
    { key: "daGiaoHangGiao", title: "Đã giao hàng" },
    { key: "daHuy", title: "Đã hủy" },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Cart");
          }}
        >
          <FontAwesome name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Đơn mua</Text>
        <View style={{ width: 24 }} />
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
   
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
  },
  headerText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
  },
});

export default MainTabPurchase;
