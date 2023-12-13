import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  ToastAndroid,
  Animated,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default ProductHorizontal = (props) => {
  const { item } = props;
  return (
    <View
      style={{
        marginRight: 2,
        marginHorizontal: 5,
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Details")}>
        <Image
          source={{ uri: item.thumbnail }}
          style={{
            height: 140,
            width: 120,
            borderRadius: 15,
          }}
          resizeMode="cover"
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Details")}>
        <Text
          style={{
            fontSize: 14,
            color: "black",
            fontWeight: "bold",
            paddingLeft: 5,
          }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
      <View style={styles.itemsolid}>
        <Text style={styles.daban}>Đã bán</Text>
        <Text style={styles.item_solid_quantity}>
          {item.total_quantity_sold}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View style={styles.price}>
          <Text style={styles.kihieu}>đ</Text>
          <Text style={styles.item_price}>
            {parseFloat(item.price).toLocaleString("vi-VN")}
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  itemsolid: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 5,
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
});
