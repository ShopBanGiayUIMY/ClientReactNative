import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function Product(props) {
  const { dataProd, handlePress } = props;
  const fun_handlePress = () => {
    handlePress ? handlePress(dataProd) : null;
  };

  let tensp =
    dataProd.product_name.length > 25
      ? dataProd.product_name.slice(0, 25) + "..."
      : dataProd.product_name;

  return (
    <TouchableWithoutFeedback onPress={fun_handlePress}>
      <View style={styles.container}>
        <View style={styles.shadow}>
          <Image source={{ uri: dataProd.thumbnail }} style={styles.img} />
          <Text style={styles.tensp}>{tensp}</Text>
          <View style={styles.price}>
            <Text style={styles.item_price}>{dataProd.product_price}</Text>
            <Text style={styles.kihieu}>$</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              alert("Ối dồi ôi!");
            }}
            style={styles.addToCart}
          >
            <FontAwesomeIcon
              style={styles.iconAddToCart}
              icon={faCartShopping}
              size={15}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#FFFBF9",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    width: 168,
    height: 280,
  },

  img: {
    height: 200,
    width: "100%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  tensp: {
    fontSize: 15,
    marginBottom: 0,
    fontWeight: "600",
    marginVertical: 3,
    marginLeft: 5,
  },
  price: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginStart: 5,
    marginEnd: 5,
    marginTop:10
  },
  item_price: {
    color: "#F60000",
    fontStyle: "normal",
    fontWeight: "600",
    marginRight: 5,
  },
  kihieu: {
    color: "red",
  },
  addToCart: {
    position: "absolute",
    right: 10,
    top: 235,
    borderRadius: 50,
    borderWidth: 1,
    width: 20,
    height: 20,
  },
  iconAddToCart: {
    alignItems: "center",
    alignSelf: "center",
    top: 2,
  },
});
