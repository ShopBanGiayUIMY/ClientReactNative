import { faL } from "@fortawesome/free-solid-svg-icons";
import React, { useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const WIDTH = Dimensions.get("window").width;
const Category = ({ route }) => {
  const { categoryData, categoryName } = route.params;
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Danh mục " + categoryName,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 5, marginRight: 10 }}
        >
          <FontAwesome
            name="arrow-left"
            size={24}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
      ),
    });
  }, []);
  if (!categoryData || !categoryData.length) {
    return (
      <View style={styles.container}>
        <Image
          style={styles.iconn}
          width={200}
          height={200}
          source={{
            uri: "https://iili.io/JuxEicg.png",
          }}
        />
      </View>
    );
  }
  const handlePressDetailProduct = (item) => {
    console.log("item", item);
    navigation.navigate("ProductDetail", { product: item });
  };
  const renderItem = ({ item }) => {
    let tensp =
      item.name.length > 10 ? item.name.slice(0, 25) + "..." : item.name;
    let totalQuantitySold = item.total_quantity_sold;
    if (totalQuantitySold === null) {
      totalQuantitySold = 0;
    } else {
      totalQuantitySold = parseInt(totalQuantitySold);
    }

    return (
      <TouchableOpacity
        onPress={() => handlePressDetailProduct(item)}
        style={styles.container}
      >
        <View style={styles.shadow}>
          <Image source={{ uri: item.thumbnail }} style={styles.img} />
          <Text style={styles.tensp}>{tensp}</Text>

          <View style={styles.itemsolid}>
            <Text style={styles.daban}>Đã bán</Text>
            <Text style={styles.item_solid_quantity}>{totalQuantitySold}</Text>
          </View>
          <View style={styles.item_1}>
            <View style={styles.price}>
              <Text style={styles.kihieu}>đ</Text>
              <Text style={styles.item_price}>
                {parseFloat(item.price).toLocaleString("vi-VN")}
              </Text>
            </View>
            <View></View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatGrid
        scrollEnabled={true}
        data={categoryData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        itemDimension={WIDTH / 3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flex: 1,
    overflow: "hidden",
    alignItems: "center",
  },

  shadow: {
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "rgba(255, 255, 255, 0.72)",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  item_1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginStart: 5,
    marginEnd: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  img: {
    aspectRatio: 1,
    width: "100%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  tensp: {
    fontSize: 15,
    marginBottom: 0,
    fontWeight: "600",
    marginVertical: 3,
    marginLeft: 10,
    height: 45,
  },
  price: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginStart: 5,
    marginEnd: 5,
    marginLeft: 11,
  },
  item_price: {
    color: "#F60000",
    fontStyle: "normal",
    fontWeight: "600",

    fontSize: 15,
  },
  kihieu: {
    color: "red",
    fontWeight: "600",
    fontSize: 15,
    textDecorationLine: "underline",
    paddingRight: 3,
  },
  addToCart: {
    position: "absolute",
    right: 5,
    bottom: -10,

    borderRadius: 50,
    borderWidth: 1,
    width: 25,
    height: 25,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  iconAddToCart: {
    fontSize: 15,
    color: "red",
  },
  itemsolid: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginStart: 10,
    marginEnd: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  daban: {
    fontSize: 12,
    color: "rgba(0, 0, 0, 0.72)",
    fontWeight: "600",
    marginEnd: 5,
  },
  item_solid_quantity: {
    fontSize: 12,
    color: "rgba(0, 0, 0, 0.72)",
    fontWeight: "600",
    marginEnd: 5,
  },
});

export default Category;
