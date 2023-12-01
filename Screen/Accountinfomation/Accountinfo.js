import React, { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const AccountInfo = ({ isVisible, navigation }) => {
  const handleNavigation = (screenName) => {
    navigation.replace(screenName);
  };
  const handleTaiKhoanThanhToan = () => {
    navigation.navigate("PaymentMethod");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Thông tin tài khoản",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.replace("Setting")}
          style={{ marginLeft: 5, marginRight: 10 }}
        >
          <FontAwesome
            name="chevron-left"
            size={24}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <TouchableOpacity
          onPress={() => {
            alert("đổi tên");
          }}
          style={styles.item}
        >
          <View style={styles.name}>
            <Text style={styles.itemText}>Tên</Text>
            <TouchableOpacity
              onPress={() => {
                alert("đổi tên");
              }}
            >
              <View style={styles.containeritemicon}>
                <Text style={styles.viewAllOrders}>Nguyễn Văn Huy </Text>
                <FontAwesome
                  name="chevron-right"
                  size={24}
                  color="black"
                  style={styles.iconitem}
                />
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            alert("đổi tên");
          }}
          style={styles.item}
        >
          <View style={styles.name}>
            <Text style={styles.itemText}>Giới tính</Text>
            <TouchableOpacity
              onPress={() => {
                alert("đổi tên");
              }}
            >
              <View style={styles.containeritemicon}>
                <Text style={styles.viewAllOrders}>Nam</Text>
                <FontAwesome
                  name="chevron-right"
                  size={24}
                  color="black"
                  style={styles.iconitem}
                />
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            alert("đổi tên");
          }}
          style={styles.item}
        >
          <View style={styles.name}>
            <Text style={styles.itemText}>Ngày sinh</Text>
            <TouchableOpacity
              onPress={() => {
                alert("đổi tên");
              }}
            >
              <View style={styles.containeritemicon}>
                <Text style={styles.viewAllOrders}>17/12/2003</Text>
                <FontAwesome
                  name="chevron-right"
                  size={24}
                  color="black"
                  style={styles.iconitem}
                />
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            alert("đổi tên");
          }}
          style={styles.item}
        >
          <View style={styles.name}>
            <Text style={styles.itemText}>Sổ địa chỉ</Text>
            <TouchableOpacity
              onPress={() => {
                alert("đổi tên");
              }}
            >
              <View style={styles.containeritemicon}>
                <FontAwesome
                  name="chevron-right"
                  size={24}
                  color="black"
                  style={styles.iconitem}
                />
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.auth}>
        <TouchableOpacity
          onPress={() => {
            alert("đổi tên");
          }}
          style={styles.item}
        >
          <View style={styles.name}>
            <Text style={styles.itemText}>Đổi mật khẩu</Text>
            <TouchableOpacity
              onPress={() => {
                alert("đổi tên");
              }}
            >
              <View style={styles.containeritemicon}>
                <FontAwesome
                  name="chevron-right"
                  size={24}
                  color="black"
                  style={styles.iconitem}
                />
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleNavigation("ResetPassword");
          }}
          style={styles.item}
        >
          <View style={styles.name}>
            <Text style={styles.itemText}>Đặt lại mật khẩu</Text>
            <TouchableOpacity
              onPress={() => {
                alert("đổi tên");
              }}
            >
              <View style={styles.containeritemicon}>
                <FontAwesome
                  name="chevron-right"
                  size={24}
                  color="black"
                  style={styles.iconitem}
                />
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            alert("đổi tên");
          }}
          style={styles.item}
        >
          <View style={styles.name}>
            <Text style={styles.itemText}>Thay đổi số điện thoại</Text>
            <TouchableOpacity
              onPress={() => {
                alert("đổi tên");
              }}
            >
              <View style={styles.containeritemicon}>
                <Text style={styles.viewAllOrders}>0374786775 </Text>
                <FontAwesome
                  name="chevron-right"
                  size={24}
                  color="black"
                  style={styles.iconitem}
                />
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            alert("đổi tên");
          }}
          style={styles.item}
        >
          <View style={styles.name}>
            <Text style={styles.itemText}>Thay đổi email</Text>
            <TouchableOpacity
              onPress={() => {
                alert("đổi tên");
              }}
            >
              <View style={styles.containeritemicon}>
                <Text style={styles.viewAllOrders}>
                  huynvph20687@fpt.edu.vn
                </Text>
                <FontAwesome
                  name="chevron-right"
                  size={24}
                  color="black"
                  style={styles.iconitem}
                />
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          handleTaiKhoanThanhToan();
        }}
        style={styles.item}
      >
        <View style={styles.name}>
          <Text style={styles.itemText}>Tài khoản Thanh toán</Text>
          <TouchableOpacity
            onPress={() => {
              alert("đổi tên");
            }}
          >
            <View style={styles.containeritemicon}>
              <FontAwesome
                name="chevron-right"
                size={24}
                color="black"
                style={styles.iconitem}
              />
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#D8D8F7",
    paddingTop: 10,
  },
  item: {
    padding: 15,
    backgroundColor: "#E6F1F3",
    width: "100%",
    marginTop: 3,
  },
  itemText: {
    fontSize: 18,
    paddingLeft: 10,
    width: 160,
  },
  name: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    fontSize: 20,
    color: "#BCBCBC",
    marginTop: 3,
  },
  containeritemicon: {
    flexDirection: "row",
  },
  iconitem: {
    fontSize: 15,
    color: "#BCBCBC",
    marginTop: 3,
    marginLeft: 10,
    borderColor: "#BCBCBC",
  },
  info: {
    width: "100%",

    marginBottom: 10,
  },
  auth: {
    width: "100%",
    marginBottom: 10,
  },
});

export default AccountInfo;
