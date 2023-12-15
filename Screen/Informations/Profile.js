import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import Information from "../Informations/Information";
import OrderInfo from "./OrderInfo";
import Repurchase from "../Informations/Repurchase";
import About from "../Informations/About";

export default Profile = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading delay (replace with your actual data fetching logic)
    setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Adjust the delay as needed
  }, []);

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <View style={styles.section}>
            <Information navigation={navigation} />
          </View>
          <View style={styles.section}>
            <OrderInfo navigation={navigation} />
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
