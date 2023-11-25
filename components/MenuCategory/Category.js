import { faL } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
const Category = ({ route }) => {
  const { categoryData } = route.params;
  const navigation = useNavigation();
  if (!categoryData || !categoryData.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>
          Danh mục này hiện chưa có sản phẩm nào
        </Text>
        <FontAwesomeIcon
          style={styles.iconn}
          icon={faTriangleExclamation}
          size={250}
          color="red"
        />
        <Pressable
          style={styles.pressText}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.goback}>Quay lại trang chủ</Text>
        </Pressable>
      </View>
    );
  }
  const handlePressDetailProduct = (item) => {
    // navigation.navigate("ProductDetail", { product: item });
    alert('Chức năng đang cập nhật')
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        handlePressDetailProduct();
      }}
    >
      <Image style={styles.thumbnail} source={{ uri: item.thumbnail }} />
      <Text style={styles.title}>Name: {item.name}</Text>
      <Text style={styles.price}>Price: {item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        data={categoryData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // Set the number of columns to 2
      />

      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.goBackButtonText}>Quay lại</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    width: "100%",
    backgroundColor: "yellow",
    position: "absolute",
    alignSelf: "center",
    top: 370,
  },
  iconn: {
    alignSelf: "center",
    marginTop: 25,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "column",
    margin: 8,
  },
  thumbnail: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  price: {
    fontSize: 14,
    color: "green",
    marginTop: 4,
  },
  description: {
    fontSize: 12,
    marginTop: 4,
  },
  goBackButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  goBackButtonText: {
    color: "white",
    fontSize: 16,
  },
  goback: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
    paddingTop: 10,
  },
  pressText: {
    alignSelf: "center",
    borderRadius: 5,
    width: "80%",
    height: 50,
    backgroundColor: "red",
  },
});

export default Category;
