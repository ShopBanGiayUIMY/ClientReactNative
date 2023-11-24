import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function Product(props) {
  const { dataProd, handlePress } = props;
  const fun_handlePress = () => {
    handlePress ? handlePress(dataProd) : null;
  };

  let tensp =
    dataProd.name.length > 10
      ? dataProd.name.slice(0, 25) + "..."
      : dataProd.name;

  return (
    <TouchableOpacity onPress={fun_handlePress} style={styles.container}>
      <View style={styles.shadow}>
        <Image source={{ uri: dataProd.thumbnail }} style={styles.img} />
        <Text style={styles.tensp}>{tensp}</Text>
        <View style={styles.item_1}>
        <View style={styles.price}>
          <Text style={styles.kihieu}>$</Text>
          <Text style={styles.item_price}>{dataProd.price}</Text>
        </View>
        <View >
          <TouchableOpacity style={styles.addToCart} onPress={()=>{alert('Thêm vào giỏ hàng')}}>
            <FontAwesomeIcon
              style={styles.iconAddToCart}
              icon={faCartShopping}
              size={20}
              color="rgba(177, 177, 177, 0.72)"
            />
          </TouchableOpacity>
        </View>
        </View>
       
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    flex: 1,
    overflow: 'hidden',
  },
  
  shadow: {
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  item_1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginStart: 5,
    marginEnd: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  img: {
    aspectRatio: 1,
    width: '100%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  tensp: {
    fontSize: 15,
    marginBottom: 0,
    fontWeight: '600',
    marginVertical: 3,
    marginLeft: 10,
    height: 45,
  },
  price: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginStart: 5,
    marginEnd: 5,
    marginTop: 5,
    marginLeft: 11,
  },
  item_price: {
    color: '#F60000',
    fontStyle: 'normal',
    fontWeight: '400',
    marginRight: 5,
  },
  kihieu: {
    color: 'red',
    fontWeight: '400',
    fontSize: 15,
  },
  addToCart: {
    position: 'absolute',
    right: 5,
    bottom: -10,
    
    borderRadius: 50,
    borderWidth: 1,
    width: 25,
    height: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  iconAddToCart: {
    fontSize: 15,
    color: 'red',
  },
});
