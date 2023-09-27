import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import avatar from "../image/avatar.png";
import background from "../image/backgroundprofile.png";
import change from "../image/ReChange.png";
import wait from "../image/2.png";
import ship from "../image/3.png";
import mess from "../image/4.png";
import pay from "../image/5.png";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
export default function Information() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Image style={{ height: 270 }} source={background} />
        </View>
        <View
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 50,
          }}
        >
          <TouchableOpacity>
            <Image style={styles.avatar} source={avatar} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchGear}>
            <FontAwesomeIcon icon={faGear} size={30} />
          </TouchableOpacity>
          <Text style={styles.userName}>Trần Văn Trung</Text>
          <Text style={styles.userEmail}>tranvantrung@example.com</Text>
          <TouchableOpacity>
            <Text style={styles.saleOffUser}>100 Phiếu giảm giá</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>Đơn hàng của tôi</Text>
        <TouchableOpacity style={{ height: 20 }}>
          <Text style={styles.value}>Xem tất cả đơn hàng</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "column", top: -75 }}>
        <View style={styles.roww}>
          <TouchableOpacity>
            <Image style={styles.images} source={wait} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.images} source={ship} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.images} source={mess} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.images} source={pay} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.images} source={change} />
          </TouchableOpacity>
        </View>
        <View style={styles.roww}>
          <Text style={styles.txtcenter}>Chờ Thanh {"\n"}Toán</Text>
          <Text style={styles.txtcenter}>Chờ Vận {"\n"}Chuyển </Text>
          <Text style={styles.txtcenter}>Chờ Giao {"\n"} Hàng</Text>
          <Text style={styles.txtcenter}>Đơn đã đổi {"\n"} trả & hủy đơn</Text>
          <Text style={styles.txtcenter}>Phản hồi{"\n"}Về Sản Phẩm</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  saleOffUser: {
    fontSize: 15,
    padding: 10,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#ccc",
    paddingVertical: 10,
    marginStart: 10,
    marginEnd: 10,
    height: 150,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
  },
  value: {
    fontSize: 15,
    color: "#333",
    lineHeight: 20,
    textDecorationLine: "underline",
  },
  touchGear: {
    position: "absolute",
    left: 250,
    top: 10,
  },
  roww: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginStart: 10,
    alignItems: "center", // Center content vertically
  },

  images: {
    width: 35,
    height: 35,
  },

  viewContent: {
    flexDirection: "column", // Arrange text vertically
    justifyContent: "center", // Center text horizontally
    alignItems: "center", // Center text vertically
  },
  txtcenter: {
    fontSize:10,
    marginLeft:10,
    textAlign:'center',
    marginTop:10
   
  },
});
