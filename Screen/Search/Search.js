import React, { useLayoutEffect } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Search({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => null,
      headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconBack}
          >
            <FontAwesome
              name="arrow-left"
              size={24}
              color="rgba(65, 154, 255, 0.8)"
            />
          </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Tìm kiếm...."
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={styles.iconsearch}
            onPress={() => {
              console.log("search");
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
  }, [navigation]);

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A9CDEE",
    alignItems: "center",
  },
  iconBack: {
    marginRight: 30,
  },
  inputWrapper: {
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 5,
    paddingHorizontal: 10,
    position: "relative",
    left: 20,
  },
  input: {
    flex: 1,
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
