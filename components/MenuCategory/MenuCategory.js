import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import config from "../../Api/Config";
const MenuCategory = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  const getCategories = async () => {
    try {
      console.log(config.API_BASE_URL);
      const response = await fetch(config.API_BASE_URL + "/categories");
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
      const response = await fetch(`${config.API_BASE_URL}/categories/${id}`);
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
        <ScrollView
          contentContainerStyle={styles.container}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {data.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Pressable
                onPress={() => getProducts(item?.category_id)}
                style={styles.pressableContainer}
              >
                <View style={styles.khunganh}>
                  <Image style={styles.image} source={{ uri: item.image }} />
                </View>
              </Pressable>
              <Text style={styles.text}>{item?.name}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 10,
  },
  itemContainer: {
    width: "20%", // 1/5 of the width
    borderRadius: 15,
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  khunganh: {
    width: 50,
    height: 50,
    borderRadius: 18,
    borderWidth: 1,
    backgroundColor: "#fff",
    borderColor: "rgba(205, 205, 205, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  pressableContainer: {
    width: 50,
    height: 50,
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  text: {
    textAlign: "center",
    fontSize: 11,
    fontWeight: "500",
    marginTop: 0,
    flex: 1,
  },
});
export default MenuCategory;
