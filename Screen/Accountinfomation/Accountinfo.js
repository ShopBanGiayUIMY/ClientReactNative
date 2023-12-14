import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { AuthStatus } from "../../Services/AuthContext";
import Dialog from "react-native-dialog";
import useAuth from "../../Services/auth.services";
import RNPickerSelect from "react-native-picker-select";
const AccountInfo = ({ isVisible, navigation }) => {
  const { state, dispatch } = AuthStatus();
  const { UpdateInfoUser } = useAuth();

  const [info, setInfo] = useState(state.userInfo);
  const [visible, setVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [newGender, setNewGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");

  let date = new Date(info.date_of_birth);
  let formattedDate = date.toLocaleDateString("vi-VN");
  // khi cập nhật thông tin user thì phải cập nhật cả state vì nó lưu thông tin user_id
  // ví dụ cập nhật tên thì phải cập nhật cả state và database
  // UpdateInfoUser(formdata)
  // cập nhật theo user_id dùng mảng
  //lệnh cập nhật user  dispatch({ type: "USERINFO", payload: chứa formdata sau khi đã cập nhật lên database và phải thành công mới cập nhật state });
  //   // {
  //     "full_name":"Nguyễn Văn Huy",
  //     "phone":"0374786775",
  //     "gender":"nam",
  //     "date_of_birth":"2003-12-17"
  //  nhớ date phải đổi về dạng yyyy-mm-dd
  // }
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

  const handleChangeInfo = async () => {
    try {
      const users = [
        {
          address: info.address,
          cart_id: info.cart_id,
          date_of_birth: info.date_of_birth,
          email: info.email,
          full_name: info.full_name,
          gender: info.gender,
          phone: info.phone,
          total_cart_items: info.cart_id,
          user_id: info.user_id,
          username: info.username,
        },
      ];
      const userIndex = users.findIndex((user) => user.user_id);
      console.log(userIndex);
      console.log('Chỗ này không hiểu sao tôi sử dụng findIndex để lấy ra id của user cần sửa nó lại ra 0, trong khi  user_id này là 5  ');
      if (userIndex !== -1) {
        const formDataToUpdate = {
          full_name: newName,
          gender: newGender,
          phone,
          date_of_birth: birthday,
        };
        if (newName.trim() === "") {
          ToastAndroid.show("Vui lòng nhập tên đầy đủ", ToastAndroid.SHORT);
          return;
        } else if (newGender.length === 0) {
          ToastAndroid.show("Vui lòng chọn giới tính", ToastAndroid.SHORT);
          return;
        }
        if (
          typeof phone !== "string" ||
          phone.trim().length === 0 ||
          /^(0[2-9]|84[2-9])?[0-9]{8,9}$/.test(phone.replace(/\s/g, "")) === false
        ) {
          ToastAndroid.show(
            "Vui lòng nhập đúng định dạng số điện thoại",
            ToastAndroid.SHORT
          );
          return;
        }
        // Cập nhật đối tượng người dùng trong mảng bằng cách sao chép và ghi đè các thuộc tính
        users[userIndex] = {
          ...users[userIndex],
          ...formDataToUpdate,
        };
        // Lấy đối tượng người dùng đã cập nhật từ mảng
        const updatedUserInfo = users[userIndex];
        const { success } = await UpdateInfoUser(updatedUserInfo);
        if (success) {
          await dispatch({ type: "USERINFO", payload: updatedUserInfo });
          setVisible(false);
          ToastAndroid.show(
            "Cập nhật thông tin thành công",
            ToastAndroid.SHORT
          );
        } else {
          ToastAndroid.show("Lỗi cập nhật thông tin", ToastAndroid.SHORT);
        }
      }
    } catch (error) {
      console.error(error);
      ToastAndroid.show(
        `Có lỗi xảy ra, vui lòng thử lại: ${error.message}`,
        ToastAndroid.SHORT
      );
    }
  };
  

  useEffect(() => {
    setInfo(state.userInfo);
  }, [state.userInfo]);
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <TouchableOpacity
          onPress={() => {
            setVisible(true);
          }}
          style={styles.item}
        >
          <View style={styles.name}>
            <Text style={styles.itemText}>Tên</Text>
            <TouchableOpacity>
              <View style={styles.containeritemicon}>
                <Text style={styles.viewAllOrders}>{info.full_name}</Text>
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
        {visible && (
          <Dialog.Container visible={visible}>
            <Dialog.Title>Cập nhật thông tin tài khoản</Dialog.Title>
            <Dialog.Description>Nhập thông tin của bạn</Dialog.Description>
            <Dialog.Input
              label="Tên"
              value={newName}
              onChangeText={(value) => setNewName(value)}
            />
            <RNPickerSelect
              label="Giới tính"
              value={newGender}
              onValueChange={(value) => setNewGender(value)}
              items={[
                { label: "Nam", value: "nam" },
                { label: "Nữ", value: "nữ" },
                { label: "Khác", value: "khác" },
              ]}
            />
            <Dialog.Input
              label="Số điện thoại"
              value={phone}
              onChangeText={(value) => setPhone(value)}
            />
            <Dialog.Input
              label="Ngày sinh"
              value={birthday}
              onChangeText={(value) => setBirthday(value)}
            />
            <Dialog.Button label="Hủy" onPress={() => setVisible(false)} />
            <Dialog.Button
              label="Đồng ý"
              onPress={() => {
                handleChangeInfo();
              }}
            />
          </Dialog.Container>
        )}
        <TouchableOpacity style={styles.item}>
          <View style={styles.name}>
            <Text style={styles.itemText}>Giới tính</Text>
            <TouchableOpacity>
              <View style={styles.containeritemicon}>
                <Text style={styles.viewAllOrders}>
                  {" "}
                  {info.gender == null ? "Cập nhật ngay" : info.gender}{" "}
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
        <TouchableOpacity style={styles.item}>
          <View style={styles.name}>
            <Text style={styles.itemText}>Ngày sinh</Text>
            <TouchableOpacity>
              <View style={styles.containeritemicon}>
                <Text style={styles.viewAllOrders}>
                  {" "}
                  {formattedDate == null ? "Cập nhật ngay" : formattedDate}{" "}
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

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Address");
          }}
          style={styles.item}
        >
          <View style={styles.name}>
            <Text style={styles.itemText}>Sổ địa chỉ</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Address");
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
        <TouchableOpacity style={styles.item}>
          <View style={styles.name}>
            <Text style={styles.itemText}>Đổi mật khẩu</Text>
            <TouchableOpacity>
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
            <TouchableOpacity>
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

        <TouchableOpacity style={styles.item}>
          <View style={styles.name}>
            <Text style={styles.itemText}>Thay đổi số điện thoại</Text>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.containeritemicon}>
                <Text style={styles.viewAllOrders}>
                  {" "}
                  {info.phone == null ? "Cập nhật ngay" : info.phone}{" "}
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
        <TouchableOpacity onPress={() => {}} style={styles.item}>
          <View style={styles.name}>
            <Text style={styles.itemText}>Email</Text>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.containeritemicon}>
                <Text style={styles.viewAllOrders}>
                  {info.email == null ? "Chưa có email" : info.email}
                </Text>
                {/* <FontAwesome
                  name="chevron-right"
                  size={24}
                  color="black"
                  style={styles.iconitem}
                /> */}
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
    padding: 10,
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
