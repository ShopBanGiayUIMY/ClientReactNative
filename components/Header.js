import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import thư viện biểu tượng

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity style={{ width:25, height:25, alignSelf:'center'}}>
          <Icon  name="qrcode" size={25} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.center}>
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={{ width:25, height:25, alignSelf:'center'}}>
          <Icon name="search" size={25} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.right}>
        <TouchableOpacity style={{ width:25, height:25, alignSelf:'center'}}>
          <Icon name="shopping-cart" size={25} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={{ width:25, height:25, alignSelf:'center'}}>
          <Icon name="bell" size={25} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#4B9EFF",
    paddingHorizontal: 10,
    height: 90,
    elevation: 3,
    paddingTop:35
  },
  left: {
    flex: 1,
    alignItems: "flex-start",
  },
  center: {
    flex: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  right: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft:10
  },
};

export default Header;
