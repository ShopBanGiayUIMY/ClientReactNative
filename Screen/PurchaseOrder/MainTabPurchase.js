import React, { useState, useEffect } from "react";
import {
  useWindowDimensions,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import ChoXacNhan from "./ChoXacNhan";
import DangXuLy from "./DangXuLy";
import ChoGiaoHang from "./ChoGiaoHang";
import DaGiaoHang from "./DaGiaoHang";
import DaXacNhan from "./DaXacNhan";
import DaHuy from "./DaHuy";

const MainTabPurchase = ({ navigation, route }) => {
  const initialTabIndex = route.params?.initialTabIndex ?? 0;
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(initialTabIndex);
  const [routes] = useState([
    { key: "choXacNhan", title: "Chờ xác nhận" },
    { key: "dangXuLy", title: "Đang xử lý" },
    { key: "choGiaoHang", title: "Chờ giao hàng" },
    { key: "daGiaoHangGiao", title: "Đã giao hàng" },
    { key: "daXacNhan", title: "Đã xác nhận" },
    { key: "daHuy", title: "Đã hủy" },
  ]);
  const [tabKeys, setTabKeys] = useState(
    routes.reduce((keys, route) => {
      keys[route.key] = 0;
      return keys;
    }, {})
  );
  useEffect(() => {
    setIndex(initialTabIndex);
  }, [initialTabIndex]);
  const updateTabKey = (tabKey) => {
    setTabKeys((prevKeys) => ({
      ...prevKeys,
      [tabKey]: prevKeys[tabKey] + 1,
    }));
  };

  const onIndexChange = (newIndex) => {
    const selectedRouteKey = routes[newIndex].key;
    updateTabKey(selectedRouteKey);
    setIndex(newIndex);
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "choXacNhan":
        return <ChoXacNhan key={tabKeys["choXacNhan"]} />;
      case "dangXuLy":
        return <DangXuLy key={tabKeys["dangXuLy"]} />;
      case "choGiaoHang":
        return <ChoGiaoHang key={tabKeys["choGiaoHang"]} />;
      case "daGiaoHangGiao":
        return <DaGiaoHang key={tabKeys["daGiaoHangGiao"]} />;
      case "daXacNhan":
        return <DaXacNhan key={tabKeys["daXacNhan"]} />;
      case "daHuy":
        return <DaHuy key={tabKeys["daHuy"]} />;
      default:
        return null;
    }
  };

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
        onIndexChange={onIndexChange}
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
