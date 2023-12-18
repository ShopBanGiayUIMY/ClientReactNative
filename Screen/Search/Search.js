import React, { useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Text,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../Services/auth.services";

const exampleData = [
  { id: 1, name: "Product 1" },
  { id: 2, name: "Product 2" },
  { id: 3, name: "Product 3" },
  // Add more example items as needed
];

export default function Search({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const { SearchProduct } = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Tìm kiếm sản phẩm"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <TouchableOpacity
            style={styles.iconsearch}
            onPress={() => {
              iconclicksearch(searchQuery);
            }}
          >
            <FontAwesomeIcon
              icon={faSearch}
              size={18}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, searchQuery]);

  const iconclicksearch = async (searchQuery) => {
    SearchProduct(searchQuery).then((data) => {
      setFilteredResults(data);
    });
  };
  const handleSearch = async (query) => {
    setSearchQuery(query);

    try {
      SearchProduct(query).then((data) => {
        setFilteredResults(data);
        console.log("data", data[0]);
      });
    } catch (error) {
      // Handle regex syntax error, if any
      console.error("Invalid regex pattern:", error.message);
      setFilteredResults([]);
    }
  };

  const handleItemClick = (item) => {
    console.log("Clicked item:", item.product_id);
    // You can perform additional actions when an item is clicked
    navigation.navigate("ProductDetail", { product: item });
  };
  return (
    <View style={styles.container}>
      {searchQuery !== "" && (
        <FlatList
          data={filteredResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleItemClick(item)}>
              <View style={styles.resultItem}>
                <Text>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A9CDEE",

    width: "100%",
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  inputWrapper: {
    width: "93%",
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 5,
    paddingHorizontal: 10,
    position: "relative",
    right: 30,
  },
  input: {
    height: 35,
    color: "rgba(249, 50, 0, 0.8)",
  },
  iconsearch: {
    position: "absolute",
    right: 0,
    backgroundColor: "rgba(249, 50, 0, 0.8)",
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },
  searchIcon: {
    color: "white",
  },
});
