import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import CpnProductDetail from "../../components/Product/CpnProductDetail";

const ProductDetail = ({ route, navigation }) => {
  const { product } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <CpnProductDetail product={product} navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ProductDetail;
