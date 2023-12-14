import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  Pressable,
 Image
} from "react-native";
import React from "react";
const Contact = () => {
  const membersData = [
    { id: "1", name: "Nguyễn Văn Huy - PH0000 " },
    { id: "2", name: "Trần Văn Trung - PH0000" },
    { id: "3", name: "Bùi Minh Chiến - PH0000" },
    { id: "4", name: "Phạm Thành Đạo - PH0000" },
    { id: "5", name: "Vũ Anh Tú - PH0000" },
    { id: "6", name: "Trần Minh - PH0000" },
  ];
  const handleMemberPress = (member) => {
    const downloadLink =
      "https://github.com/ShopBanGiayUIMY/ClientReactNative.git";
    Linking.openURL(downloadLink);
  };
  
  return (
    <View style={styles.container}>
     {/* <View>
          <Image   source={{
          uri: "https://www.internship.edu.vn/wp-content/uploads/363e98fedca7891c88adf55e8e90f992.jpg",
        }}
        style={ {
          width: 50,
          height: 50,
          backgroundColor:'blue'
        }}/>
     </View> */}
      <Text style={styles.heading}>Chào mừng đến với ứng dụng giày Nike!</Text>

      {/* Mô tả về ứng dụng */}
      <Text style={styles.description}>
        Ứng dụng chúng tôi mang đến cho bạn trải nghiệm mua sắm giày Nike tuyệt
        vời nhất. Khám phá và đặt mua ngay hôm nay!
      </Text>
      <Text style={styles.description}>
        Shop Quần Áo - React Native là một ứng dụng di động được xây dựng bằng
        React Native, nhằm cung cấp một giao diện dễ sử dụng và hấp dẫn cho việc
        mua sắm quần áo trực tuyến. Ứng dụng này cho phép người dùng duyệt qua
        danh sách sản phẩm, xem chi tiết và thêm vào giỏ hàng, cùng với các tính
        năng khác như tìm kiếm sản phẩm, đăng nhập và thanh toán.
      </Text>

      <Text>
        Tính năng của app:
        {"\n"}
        <Text style={styles.description}>
          Danh sách sản phẩm: hiển thị danh sách các sản phẩm quần áo. Xem chi
          tiết sản phẩm: cho phép xem thông tin chi tiết, hình ảnh và mô tả sản
          phẩm. Thêm vào giỏ hàng: cho phép người dùng thêm sản phẩm vào giỏ
          hàng. Tìm kiếm sản phẩm: hỗ trợ tìm kiếm sản phẩm theo tên, mô tả hoặc
          loại quần áo. Đăng nhập: cho phép người dùng đăng nhập vào tài khoản
          cá nhân. Thanh toán: cung cấp giao diện thanh toán đơn giản và an
          toàn.
        </Text>
      </Text>
      <Text>
        Cách cài đặt app: {"\n"}
        <Text style={styles.description}>
          Clone repository này về máy của bạn: git clone
          <Pressable onPress={() => handleMemberPress()}>
            <Text style={{fontSize:15, color:'black', textDecorationLine:'underline'}}>
              https://github.com/ShopBanGiayUIMY/ClientReactNative
            </Text>
          </Pressable>
          {"\n"}
          Cài đặt các dependencies cần thiết: npm install hoặc yarn install Chạy
          ứng dụng trên máy ảo hoặc thiết bị di động: Android: npx react-native
          run-android iOS: npx react-native run-ios
        </Text>
      </Text>
      <Text style={{fontSize:20, padding:15, color:'red'}}>
        Các công nghệ sử dụng: {"\n"}
        <Text style={styles.description}>
          {" "}
          React Native{"\n"} React Navigation{"\n"} Axios
        </Text>
      </Text>
      <Text style={{fontSize:20, padding:15, color:'red'}}>Các thành viên tham gia:</Text>
      <FlatList
        horizontal={false}
        numColumns={2} 
        style={{ width: "100%", flexWrap: "wrap-reverse" }}
        data={membersData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ width: "50%" }}>
            <Text style={[styles.description]}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ width: "100%", height: 8 }} /> 
        )}
      />
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#008080",
    width: "100%",
    height: 800,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "white",
  },
  description: {
    textAlign: "center",
    marginBottom: 15,
    fontSize: 16,
    color: "white",
    width: "100%",
  },
  membersHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  memberName: {
    fontSize: 16,
    marginBottom: 8,
  },
});
