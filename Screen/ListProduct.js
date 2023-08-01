import React, { useState, useRef, useEffect } from "react";
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, TextInput, Text, Dimensions } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShoppingCart, faBell, faMagnifyingGlass, faQrcode, faMoneyBill1, faStar } from '@fortawesome/free-solid-svg-icons';
import banner from "../image/banner.png";
import banner1 from "../image/banner1.jpg";
import banner2 from "../image/banner2.jpg";
import products from "../image/products.png"

const images = [banner, banner1, banner2];

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function ListProduct() {
     const [imageActive, setImageActive] = useState(0);
     const scrollViewRef = useRef();
     const handleChangeImage = (event) => {
          const slideSize = WIDTH;
          const currentOffset = event.nativeEvent.contentOffset.x;
          const activeImage = Math.floor(currentOffset / slideSize);
          setImageActive(activeImage);
     };
     useEffect(() => {
          const interval = setInterval(() => {
               const activeImage = (imageActive + 1) % images.length;
               setImageActive(activeImage);
               if (scrollViewRef.current) {
                    scrollViewRef.current.scrollTo({ x: activeImage * WIDTH, animated: true });
               }
          }, 5000);

          return () => {
               clearInterval(interval);
          };
     }, [imageActive]);
     return (
          <View style={styles.container}>
               <View style={styles.searchs}>
                    <View style={styles.iconContainer}>
                         <TouchableOpacity style={styles.iconWrapper}>
                              <FontAwesomeIcon icon={faQrcode} size={25} />
                         </TouchableOpacity>
                         <View style={styles.inputContainer}>
                              <TextInput style={styles.inputt} placeholder="Enter something..." />
                              <FontAwesomeIcon style={styles.glass} icon={faMagnifyingGlass} />
                         </View>
                    </View>
                    <TouchableOpacity style={styles.iconWrapper}>
                         <FontAwesomeIcon icon={faShoppingCart} size={25} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconWrapper}>
                         <FontAwesomeIcon icon={faBell} size={25} color='white' />
                    </TouchableOpacity>
               </View>
               <View style={styles.viewBanner}>
                    <ScrollView
                         ref={scrollViewRef}
                         onScroll={handleChangeImage}
                         scrollEventThrottle={16}
                         showsHorizontalScrollIndicator={false}
                         showsVerticalScrollIndicator={false}
                         pagingEnabled
                         horizontal
                         style={styles.carousel}
                    >
                         {images.map((image, index) => (
                              <Image key={index} resizeMode="stretch" source={image} style={styles.image} />
                         ))}
                    </ScrollView>
                    <View style={styles.dot}>
                         {images.map((image, index) => (
                              <Text
                                   key={index}
                                   style={imageActive === index ? styles.activeDot : styles.inactiveDot}
                              ></Text>
                         ))}
                    </View>
               </View>
               <ScrollView contentContainerStyle={styles.viewProducts}>
                    <View style={styles.viewDetail}>
                    <Image style={styles.imageProducts} source={products} />
                         <View style={styles.viewContent}>
                              <Text style={styles.nameProducts}>
                                   Áo thun nữ ngắn ...
                              </Text>
                              <View style={styles.rowPayment}>
                                   <FontAwesomeIcon style={styles.payment} icon={faMoneyBill1} size={25} color="rgba(241, 209, 96, 1)" />
                                   <Text style={styles.price}>10.500</Text>
                                   <Text style={styles.giaTriDongTien}>đ</Text>
                                   <View style={styles.borDer}>
                                        <Text style={styles.newOrOld}>-90%</Text>
                                   </View>
                              </View>
                              <View style={styles.rowPayment}>
                                   <FontAwesomeIcon style={styles.star} icon={faStar} size={17} color="rgba(241, 209, 96, 1)" />
                                   <Text style={styles.danhGia}>4.9/5.0</Text>
                                   <View style={styles.lineVertiCal}></View>
                                   <Text style={styles.luotBan}>20Tr lượt bán</Text>
                              </View>
                         </View>
                    </View>
                    <View style={styles.viewDetail}>
                    <Image style={styles.imageProducts} source={products} />
                         <View style={styles.viewContent}>
                              <Text style={styles.nameProducts}>
                                   Áo thun nữ ngắn ...
                              </Text>
                              <View style={styles.rowPayment}>
                                   <FontAwesomeIcon style={styles.payment} icon={faMoneyBill1} size={25} color="rgba(241, 209, 96, 1)" />
                                   <Text style={styles.price}>10.500</Text>
                                   <Text style={styles.giaTriDongTien}>đ</Text>
                                   <View style={styles.borDer}>
                                        <Text style={styles.newOrOld}>-90%</Text>
                                   </View>
                              </View>
                              <View style={styles.rowPayment}>
                                   <FontAwesomeIcon style={styles.star} icon={faStar} size={17} color="rgba(241, 209, 96, 1)" />
                                   <Text style={styles.danhGia}>4.9/5.0</Text>
                                   <View style={styles.lineVertiCal}></View>
                                   <Text style={styles.luotBan}>20Tr lượt bán</Text>
                              </View>
                         </View>
                    </View>
                    <View style={styles.viewDetail}>
                    <Image style={styles.imageProducts} source={products} />
                         <View style={styles.viewContent}>
                              <Text style={styles.nameProducts}>
                                   Áo thun nữ ngắn ...
                              </Text>
                              <View style={styles.rowPayment}>
                                   <FontAwesomeIcon style={styles.payment} icon={faMoneyBill1} size={25} color="rgba(241, 209, 96, 1)" />
                                   <Text style={styles.price}>10.500</Text>
                                   <Text style={styles.giaTriDongTien}>đ</Text>
                                   <View style={styles.borDer}>
                                        <Text style={styles.newOrOld}>-90%</Text>
                                   </View>
                              </View>
                              <View style={styles.rowPayment}>
                                   <FontAwesomeIcon style={styles.star} icon={faStar} size={17} color="rgba(241, 209, 96, 1)" />
                                   <Text style={styles.danhGia}>4.9/5.0</Text>
                                   <View style={styles.lineVertiCal}></View>
                                   <Text style={styles.luotBan}>20Tr lượt bán</Text>
                              </View>
                         </View>
                    </View>
                    <View style={styles.viewDetail}>
                    <Image style={styles.imageProducts} source={products} />
                         <View style={styles.viewContent}>
                              <Text style={styles.nameProducts}>
                                   Áo thun nữ ngắn ...
                              </Text>
                              <View style={styles.rowPayment}>
                                   <FontAwesomeIcon style={styles.payment} icon={faMoneyBill1} size={25} color="rgba(241, 209, 96, 1)" />
                                   <Text style={styles.price}>10.500</Text>
                                   <Text style={styles.giaTriDongTien}>đ</Text>
                                   <View style={styles.borDer}>
                                        <Text style={styles.newOrOld}>-90%</Text>
                                   </View>
                              </View>
                              <View style={styles.rowPayment}>
                                   <FontAwesomeIcon style={styles.star} icon={faStar} size={17} color="rgba(241, 209, 96, 1)" />
                                   <Text style={styles.danhGia}>4.9/5.0</Text>
                                   <View style={styles.lineVertiCal}></View>
                                   <Text style={styles.luotBan}>20Tr lượt bán</Text>
                              </View>
                         </View>
                    </View>
                    <View style={styles.viewDetail}>
                    <Image style={styles.imageProducts} source={products} />
                         <View style={styles.viewContent}>
                              <Text style={styles.nameProducts}>
                                   Áo thun nữ ngắn ...
                              </Text>
                              <View style={styles.rowPayment}>
                                   <FontAwesomeIcon style={styles.payment} icon={faMoneyBill1} size={25} color="rgba(241, 209, 96, 1)" />
                                   <Text style={styles.price}>10.500</Text>
                                   <Text style={styles.giaTriDongTien}>đ</Text>
                                   <View style={styles.borDer}>
                                        <Text style={styles.newOrOld}>-90%</Text>
                                   </View>
                              </View>
                              <View style={styles.rowPayment}>
                                   <FontAwesomeIcon style={styles.star} icon={faStar} size={17} color="rgba(241, 209, 96, 1)" />
                                   <Text style={styles.danhGia}>4.9/5.0</Text>
                                   <View style={styles.lineVertiCal}></View>
                                   <Text style={styles.luotBan}>20Tr lượt bán</Text>
                              </View>
                         </View>
                    </View>

               </ScrollView>

          </View>
     );
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          alignItems: 'center',
          paddingTop: 50,
          paddingHorizontal: '5%',
          backgroundColor: '#BBDEF2'
     },
     searchs: {
          position: 'absolute',
          top: 50,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(75, 158, 255, 1)',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,
          height: 55,
     },
     viewBanner: {
          width: WIDTH,
          height: HEIGHT * 0.25,
          marginTop: 55
     },
     iconContainer: {
          flexDirection: 'row',
          alignItems: 'center',
     },
     iconWrapper: {
          marginLeft: 10,
     },
     inputContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 47.6,
          borderWidth: 1,
          borderColor: 'gray',
          marginLeft: 20,

     },
     inputt: {
          width: 200,
          height: 30,
          paddingLeft: 10,
          fontSize: 20,
          color:'white'
     },
     glass: {
          marginLeft: 10,
          marginRight: 5,
     },
     carousel: {
          width: WIDTH,
          height: HEIGHT * 0.25,
     },
     image: {
          width: WIDTH,
          height: HEIGHT * 0.25,
     },
     dot: {
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          alignSelf: 'center',
     },
     activeDot: {
          // Style for active dot
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: 'blue',
          margin: 5,
     },
     inactiveDot: {
          // Style for inactive dot
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: 'gray',
          margin: 5,
     },
     viewProducts: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          marginTop: 5
     },
     viewDetail: {
          width: '48%',
          marginBottom: 10,
          alignItems: 'center',
          backgroundColor: '#f2f2f2',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: 'white'
     },
     imageProducts: {
          width: "100%",
          height: 200,
          marginBottom: 100,

     },

     viewContent: {
          position: 'absolute',
          marginTop: 210,
          textAlign: 'center'


     },
     nameProducts: {
          fontWeight: '700',
          marginLeft: 10
     },
     payment: {
          width: 20,
          height: 20,
          marginLeft: 10
     },
     rowPayment: {
          flexDirection: 'row',
          marginTop: 10
     },
     price: {
          fontWeight: '700',
          marginTop: 1,
          marginLeft: 3,
          fontSize: 20,
          color: 'red'
     },
     giaTriDongTien: {
          textDecorationLine: 'underline',
          marginTop: 5
     },
     newOrOld: {
          fontWeight: 'bold',
          lineHeight: 15,
          marginTop: 5,
          marginLeft: 4,
          color: 'rgba(255, 55, 55, 1)'
     },
     borDer: {
          borderRadius: 10,
          borderWidth: 1,
          marginStart: 3,
          backgroundColor: 'yellow',
          width: 50,
          borderColor: 'yellow'
     },
     star: {
          marginStart: 7,
          marginTop: 5,
     },
     danhGia: {
          fontWeight: '400',
          marginTop: 5,
          fontSize: 15,
          lineHeight: 18
     },
     luotBan: {
          marginStart: 10,
          marginTop: 5,
          fontWeight: '400',
          fontSize: 15
     },
     lineVertiCal: {
          position: "absolute",
          top: 7,
          left: 78,
          transform: [{ translateX: -0.5 }],
          width: 1,
          height: 15,
          backgroundColor: "gray",

     },

});
