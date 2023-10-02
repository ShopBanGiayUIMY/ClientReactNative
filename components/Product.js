import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
export default function Product(props) {
  const { dataProd, handlePress } = props;
  const fun_handlePress = () => {
    handlePress ? handlePress(dataProd) : null;
  };
  let tensp =
    dataProd.nameproduct.length > 25
      ? dataProd.nameproduct.slice(0, 25) + "..."
      : dataProd.nameproduct;

  return (
    <View>
      <TouchableWithoutFeedback onPress={fun_handlePress} style={styles.all}>
        <View style={styles.shadow}>
          <View style={styles.container}>
            <Image source={{ uri: dataProd.image }} style={styles.img} />
            <Text style={styles.tensp}>{tensp}</Text>
            <View style={styles.price}>
              <Image style={styles.star} source={{ uri: "https://iili.io/Jdk4y5G.png"}}/>
              <Text style={styles.item_price}>
                {dataProd.discount}
                <Text style={styles.kihieu}>đ</Text>
              </Text>
              <Text style={styles.txtSales}>{dataProd.discount}<Text style={styles.txtSales}>%</Text></Text>
            </View>
            <View style={styles.info}>
              <View style={styles.star_sold_product}>
                <Image
                  style={styles.star}
                  source={{ uri: "https://iili.io/HgVbF2t.png" }}
                />
                <Text style={{color:"#686868"}}>{dataProd.rating} </Text>
                <Text style={{color:"#686868"}}>|</Text>
                <Text style={{color:"#686868"}} > {dataProd.sales}</Text>
                <Text style={{ marginLeft: 5 ,color:"#686868"}}>Đã bán</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
const styles = StyleSheet.create({
  all:{
    marginBottom: 10,
  borderRadius: 5,
  backgroundColor: "#FFFBF9", // Set a background color here
  flex: 1,
  },
  shadow: {
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    width: 180,
    height:270 ,

  },
  star_sold_product: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -5,
  },
  star: {
    height: 20,
    width: 30,
  },
  container: {
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#FFFBF9",
    flex:1
  },

  info: {
    padding: 8,
  },
  img: {
    height: 135,
    width: "100%",
    alignItems: "center",
    alignSelf: "center",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  imgsale: {
    height: 60,
    width: 63,
    position: "absolute",
    top: 0,
    right: 0,
  },
  textsale: {
    position: "absolute",
    right: 30,
    top: 34,
    color: "white",
    fontWeight: "bold",
  },
  tensp: {
    fontSize: 15,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  price: {
    flexDirection: "row",
    alignItems: "center",
    paddingStart: 5,
    paddingEnd: 5,
    width: "100%",
  },
  item_price: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
    color: "red",
    marginStart:10
  },
  kihieu: {
    fontSize: 16,
    color: "#FF4500",
    textDecorationLine: "underline",
    paddingLeft :5
  },
  txtSales:{
   width:'30%',
   backgroundColor:'#F6C7C0',
   textAlign:'center',
   borderRadius:5,
   marginLeft:5,
   color:'#FF4500',
   fontWeight:'800'
  }
});
// hi
