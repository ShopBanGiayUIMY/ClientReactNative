import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Header from "../../components/Header";
import Payment from "../../components/AddtoCard";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ProductDetail = ({ route, navigation }) => {
  const { product } = route.params;
  const [expanded, setExpanded] = useState(false); // Trạng thái cho việc mở rộng văn bản

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  //tính % sale off của sản phẩm: Số-tiền-sau-khi-giảm-giá = Giá-tiền x [ (100 – %giảm-giá)/100]
  const saleOff = () => {
    const discountAmount = product.sales * [(100 - product.discount) / 100];
    // Làm tròn đến 2 chữ số thập phân
    const discountedPrice = discountAmount.toFixed(2);
    //Không  Làm tròn đến 2 chữ số thập phân
    // const discountedPrice = discountAmount;
    return discountedPrice;
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation}/>
      <ScrollView style={styles.scrollVieww}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <TouchableOpacity
            style={styles.iconn}
            onPress={() => {
              navigation.navigate("TabNavigator");
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} size={25} color="#ADD8E6" />
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.productDiscount}>
          <Text style={styles.txtDiscount}>
            {product.discount}%{"\n"} off
          </Text>
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.nameproduct}</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.viewUnderLine}></View>
            <Text style={styles.productPrice1}>{product.sales} đ </Text>
            <Text style={styles.productPrice}> - </Text>
            <Text style={styles.productPrice}>{saleOff()} đ</Text>
          </View>

          <Text style={styles.productDescription}>
            {expanded ? product.describe : product.describe.slice(0, 40)}
          </Text>
          {product.describe.length > 40 && (
            <TouchableOpacity onPress={toggleExpand}>
              <Text style={styles.toggleButton}>
                {expanded ? "Thu gọn" : "Xem thêm"}
              </Text>
            </TouchableOpacity>
          )}
          <View style={styles.productRow}>
            <Image style={styles.iconStar} source={{uri:"https://iili.io/HgVbF2t.png"}}/>
            <Text style={styles.productRating}>{product.rating}</Text>
          </View>
          <Text style={styles.productSales}>Đã bán: {product.sales}</Text>
          <View style={styles.productRow1}>
            <Text style={styles.productColor}>Màu: {product.color}</Text>
            <Text style={styles.productQuantity}>
            Số lượng: {product.quantity}
          </Text>
          </View>
          
        </View>
      </ScrollView>
      <View style={styles.viewPayment}>
        <Payment />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollVieww:{
    marginBottom:20
  },
  iconn: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  productImage: {
    width: "100%",
    height: 350, 
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  viewUnderLine: {
    borderBottomWidth: 3,
    borderColor: "red",
    position: "absolute",
    width: "14%",
    top: 15,
  },
  productPrice1: {
    fontSize: 24,
    color: "red",
    marginBottom: 16,
  },
  productPrice: {
    fontSize: 24,
    color: "red",
    marginBottom: 16,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 20, 
    color: "gray", 
  },
  toggleButton:{
    position:'relative',
    top:-20, color:'gray'
  },
  productRow: {
    flexDirection: "row",
    marginBottom: 10, 
  },
  productRow1: {
    flexDirection: "row",
    marginBottom: 10, 
    justifyContent:'space-between'
  },
  iconStar:{
    width:35,
    height:35,
  },
  productRating: {
    fontSize: 25, 
    color: "orange", 
    marginVertical:1
  },
  productSales: {
    fontSize: 18, 
    position:'relative',
    top:-40, 
    left:250
  },
  productColor: {
    fontSize: 18, 
  },
  productDiscount: {
    fontSize: 15,
    width: 45,
    height: 45,
    position: "absolute",
    alignItems: "center",
    top: 20,
    right: 20,
    paddingTop: 7,
    backgroundColor: "#C60C30",
    borderRadius: 45 / 2, 
  },
  txtDiscount: {
    color: "white",
  },
  productQuantity: {
    fontSize: 18, 
    marginBottom: 10, 
  },
  productSellNumber: {
    fontSize: 18, 
  },
  viewPayment: {
    width: "90%",
    height: 50,
    backgroundColor: "#f0f",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: -20,
    borderRadius: 5,
    
  },
});

export default ProductDetail;
