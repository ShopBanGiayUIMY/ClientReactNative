import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Image, Text, Pressable, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import config from '../../Api/Config'
const MenuCategory = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  const getCategories = async () => {
    try {
      console.log(config.API_BASE_URL);
      const response = await fetch(config.API_BASE_URL+'/categories');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getProducts = async (id) => {
    try {
      const response = await fetch(`${config.API_BASE_URL}+'/categories'/${id}`);
      const json = await response.json();
      // Choose the first object from the array as an example
      const product = json;
      navigation.navigate("Category", { categoryData: product });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#56F3F9" />
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data.map((item, index) => (
            <View key={index}>
              <Pressable
                onPress={() => getProducts(item?.category_id)}
                style={{
                  width: 50,
                  height: 50,
                  margin: 10,
                  borderRadius: 15,
                  borderWidth: 1,
                  padding: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                }}
              >
                <Image style={{ width: 40, height: 40, resizeMode: "contain" }} source={{ uri: item.image }} />
              </Pressable>
              <Text style={{ textAlign: "center", fontSize: 11, fontWeight: "500", marginTop: 0 }}>
                {item?.name}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default MenuCategory;
