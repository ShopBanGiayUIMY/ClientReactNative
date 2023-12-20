import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import Information from "../Informations/Information";
import OrderInfo from "./OrderInfo";
import Repurchase from "../Informations/Repurchase";
import About from "../Informations/About";
import Notification from "../Notification/Notification";

const Profile = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Thêm refreshing
  const [refreshCounter, setRefreshCounter] = useState(0);
  useEffect(() => {
    // Simulate data loading delay (replace with your actual data fetching logic)
    setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Điều chỉnh thời gian đợi theo nhu cầu của bạn
  }, []);

  const handleRefresh = () => {
    setRefreshing(true); // Bắt đầu làm mới
    // Thực hiện logic làm mới ở đây
    setRefreshCounter((prevCounter) => prevCounter + 1);
    setTimeout(() => {
      // Sau khi làm mới xong, đánh dấu hoàn thành làm mới

      setIsLoading(false);
      setRefreshing(false);
    }, 1500); // Điều chỉnh thời gian làm mới theo nhu cầu của bạn
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor="#4882C2" // Màu của tiến trình làm mới
        />
      }
    >
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="rgba(152, 209, 255, 0.8)" />
        </View>
      ) : (
        <>
          <View style={styles.section}>
            <Information
              key={`information-${refreshCounter}`}
              navigation={navigation}
            />
          </View>
          <View style={styles.section}>
            <OrderInfo
              key={`orderInfo-${refreshCounter}`}
              navigation={navigation}
            />
          </View>
          <View style={styles.section}>
            <Repurchase navigation={navigation} />
          </View>
          <View style={styles.section}>
            <About navigation={navigation} />
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
