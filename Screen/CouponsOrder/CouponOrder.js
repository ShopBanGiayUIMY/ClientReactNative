import React, { useState, Component, useLayoutEffect, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
const windowWidth = Dimensions.get("window").width;
import ModalCouponOrder from "./modal.coupon.order";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CouponComponentOrder from "../../components/Coupon/CouponComponentOrder";
import useAuth from "../../Services/auth.services";
import { AuthStatus } from "../../Services/AuthContext";
import FlashMessage, {
  showMessage,
  renderMessage,
} from "react-native-flash-message";

export default function CouponOrder({ navigation }) {
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isclick, setIsClick] = useState(false);
  const { GetVoucher, search_voucher_and_add } = useAuth();
  const { state, dispatch } = AuthStatus();

  const fetchdata = () => {
    state.isLoggedIn
      ? GetVoucher()
          .then((result) => {
            setData(result);
          })
          .catch((error) => {
            console.error(error);
          })
      : null;
  };
  useEffect(() => {
    fetchdata();
  }, [refreshing]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Lựa chọn mã giảm giá",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 5, marginRight: 10 }}
        >
          <FontAwesome
            name="arrow-left"
            size={24}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
      ),
    });
  }, []);
  const fun_handlePress = (item) => {
    setIsClick(!isclick);
  };

  const handlePresSearch = () => {
    const time = setTimeout(() => {
      fetchdata();
    }, 1000);
  };
  useEffect(() => {
    if (state.UseVoucher && state.UseVoucher.length > 0) {
      setSelectedItems(state.UseVoucher);
    } else {
      setSelectedItems([]);
    }
  }, [state.UseVoucher]);
  const [selectedItems, setSelectedItems] = useState([]);

  const handlePresDetailProduct = (item) => {
    let newSelectedItems = [...selectedItems];
    const existingItem = newSelectedItems.find(
      (selectedItem) => selectedItem.reward_type === item.reward_type
    );

    if (existingItem) {
      if (existingItem.voucher_id !== item.voucher_id) {
        newSelectedItems = newSelectedItems.map((selectedItem) =>
          selectedItem.reward_type === item.reward_type ? item : selectedItem
        );
      } else {
        newSelectedItems = newSelectedItems.filter(
          (selectedItem) => selectedItem.voucher_id !== item.voucher_id
        );
        console.log("selectedItems after removal", newSelectedItems);
      }
    } else {
      newSelectedItems.push(item);
    }

    setSelectedItems(newSelectedItems);
    dispatch({ type: "USE_VOUCHER", payload: newSelectedItems });
  };
  return state.isLoggedIn ? (
    <ScrollView style={styles.container}>
      <View style={styles.modal}>
        <ModalCouponOrder
          check={isclick}
          handlePress={() => setIsClick(false)}
          fun_search={handlePresSearch}
        />
      </View>

      <View style={styles.header}>
        <Pressable style={styles.textHeader} onPress={fun_handlePress}>
          <Image
            source={{ uri: "https://iili.io/JqAuyDN.png" }}
            style={styles.img}
          />
          <Text style={styles.text}>Nhập mã voucher</Text>
        </Pressable>
      </View>

      <View>
        {data &&
          data.map((item, index) => (
            <CouponComponentOrder
              key={index}
              dataVouchers={item}
              handlePress={() => handlePresDetailProduct(item)}
              checkvoucher={selectedItems.some(
                (selectedItem) =>
                  selectedItem.voucher_id === item.voucher_id &&
                  selectedItem.reward_type === item.reward_type
              )}
            />
          ))}
      </View>
    </ScrollView>
  ) : (
    <View style={styles.error}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Bạn cần đăng nhập để xem !
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  error: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "rgba(216, 234, 245, 0.8)",
  },
  icon: {
    marginLeft: 5,
  },
  header: {
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 10,
    marginHorizontal: 30,
    marginRight: 40,
    borderRadius: 10,
  },
  textHeader: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    fontSize: 20,
    justifyContent: "center",
    alignContent: "center",
  },
  img: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
    color: "rgba(28, 28, 28, 1)",
  },
});
