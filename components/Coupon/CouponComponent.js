import React from "react";
import { useState, useEffect } from "react";
import { Pressable } from "react-native";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const { DateTime } = require("luxon");
const width = Dimensions.get("screen").width;

export default function CouponComponent(props) {
  const { dataVouchers, handlePress } = props;
  const [icon, seticon] = useState(null);
  const [value, setvalue] = useState();

  useEffect(() => {
    const intervalId = setInterval(() => {
      checkVoucherStatus();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  const checkVoucherStatus = () => {
    const startDateTimeInSeconds = parseFloat(dataVouchers.start_time);
    const endDateTimeInSeconds = parseFloat(dataVouchers.end_time);

    const startTime = DateTime.fromSeconds(startDateTimeInSeconds, {
      zone: "Asia/Ho_Chi_Minh",
    });
    const endTime = DateTime.fromSeconds(endDateTimeInSeconds, {
      zone: "Asia/Ho_Chi_Minh",
    });
    const timenow = DateTime.now({ zone: "Asia/Ho_Chi_Minh" });

    if (startTime.diff(timenow, "days").days === 1) {
      setvalue("Có hiệu lực sau 1 ngày");
    } else if (
      startTime.diff(timenow, "hours").hours < 24 &&
      startTime.diff(timenow, "hours").hours >= 1
    ) {
      setvalue(
        `Có hiệu lực sau ${Math.floor(
          startTime.diff(timenow, "hours").hours
        )} giờ`
      );
    } else if (
      startTime.diff(timenow, "minutes").minutes <= 60 &&
      startTime.diff(timenow, "minutes").minutes > 1
    ) {
      setvalue(
        `Có hiệu lực sau ${Math.floor(
          startTime.diff(timenow, "minutes").minutes
        )} phút`
      );
    } else if (
      startTime.diff(timenow, "seconds").seconds <= 60 &&
      startTime.diff(timenow, "seconds").seconds >= 1
    ) {
      setvalue(
        `Có hiệu lực sau ${Math.floor(
          startTime.diff(timenow, "seconds").seconds
        )} giây`
      );
    } else if (
      startTime.diff(timenow, "seconds").seconds <= 0 &&
      timenow.diff(endTime, "seconds").seconds <= 0
    ) {
      setvalue(`HSD ${endTime.toFormat("dd/MM/yyyy")}`);
    } else if (
      timenow.diff(startTime, "seconds").seconds < 0 &&
      endTime.diff(timenow, "seconds").seconds >= 0 &&
      endTime.diff(startTime, "seconds").seconds > 0
    ) {
      seticon("https://cdn-icons-png.flaticon.com/512/109/109613.png");
      setvalue(`Có hiệu lực từ ngày ${startTime.toFormat("dd/MM/yyyy")}`);
    }
  };
  const fun_handlePress = () => {
    handlePress ? handlePress(dataVouchers) : null;
  };

  let imgvoucher, widthvoucher, heightvoucher, voucher_bg, clock_icon;

  if (dataVouchers.reward_type == "2") {
    imgvoucher =
      "https://images.vexels.com/media/users/3/200093/isolated/preview/596f0d8cb733b17268752d044976f102-shopping-bag-icon.png";
    widthvoucher = "35%";
    heightvoucher = "35%";
    voucher_bg = "https://iili.io/JqhCJjt.png";
  } else if (dataVouchers.reward_type == "3") {
    imgvoucher = "https://iili.io/JqukDpR.png";
    widthvoucher = "40%";
    heightvoucher = "40%";
    voucher_bg = "https://iili.io/JqhCHuI.png";
  }
  let discount_amount;
  if (dataVouchers.reward_type == "1") {
    discount_amount = "đ" + dataVouchers.discount_amount + "k";
    dataVouchers.max_price != 0
      ? (discount_amount = "Giảm tối đa " + dataVouchers.max_price + "k")
      : (discount_amount = "Giảm " + discount_amount);
  } else if (dataVouchers.reward_type == "2") {
    discount_amount = dataVouchers.discount_amount + "%";
    dataVouchers.voucher_type == "1"
      ? (discount_amount = "Giảm " + discount_amount)
      : null;
  }

  return (
    <TouchableWithoutFeedback onPress={fun_handlePress}>
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: voucher_bg }}
          style={styles.wallet_page}
          resizeMode="contain"
        >
          <View style={styles.wallet_page_left}>
            <Image
              source={{ uri: imgvoucher }}
              resizeMode="cover"
              style={[
                styles.imgvoucher_image_page_left,
                { width: widthvoucher, height: heightvoucher },
              ]}
            />
            <Text style={styles.textvoucher_txt_page_left}>
              {dataVouchers.voucher_name}
            </Text>
          </View>
          <View style={styles.wallet_page_right}>
            <Text style={styles.namevoucher_txt_page_right}>
              {dataVouchers.voucher_name}
            </Text>
            <Text style={styles.code_txt_page_right}>
              {dataVouchers.voucher_code}
            </Text>
            <View style={styles.value_txt_page_right}>
              {icon ? (
                <Image source={{ uri: icon }} style={styles.icon} />
              ) : null}

              <Text style={styles.value}>{value}</Text>
            </View>
          </View>
          <Pressable style={styles.button_page_right}>
            <LinearGradient
              colors={["rgb(255, 147, 63)", "rgb(249, 55, 130)"]} // Màu với độ trong suốt
              start={{ x: 0.2, y: 0.5 }} // Vị trí bắt đầu (top left)
              end={{ x: 0.5, y: 1 }} // Vị trí kết thúc (bottom right)
              angle={130} // Góc màu chéo (tương đương với 130 độ)
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 15,
              }}
            >
              <Text
                style={{ color: "white", fontSize: 10, fontWeight: "bold" }}
              >
                Thu thập ngay
              </Text>
            </LinearGradient>
          </Pressable>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    width: width,
  },
  wallet_page: {
    height: 150,
    marginHorizontal: 8,
    position: "relative",
    justifyContent: "center",
    flexDirection: "row",
  },
  wallet_page_left: {
    width: width / 3.01,
    height: 140,
    position: "absolute",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    left: 0,
  },
  wallet_page_right: {
    width: width / 1.59,
    height: 140,
    position: "relative",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  textvoucher_txt_page_left: {
    color: "white",
    fontSize: 13,
    marginVertical: 10,
  },
  code_txt_page_right: {
    color: "black",
    fontSize: 16,
    marginVertical: 10,
    marginHorizontal: 10,
    position: "absolute",
    top: 40,
    left: 72,
  },
  value_txt_page_right: {
    position: "absolute",
    flexDirection: "row",
    top: 110,
    marginVertical: 10,
    left: 72,
    marginHorizontal: 10,
  },
  icon: {
    width: 15,
    height: 15,
    tintColor: "red",
    position: "absolute",
    left: -8,
  },
  value: {
    color: "red",
    fontSize: 11,
    position: "absolute",
    left: 13,
  },
  namevoucher_txt_page_right: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    marginHorizontal: 10,
    position: "absolute",
    top: 20,
  },
  button_page_right: {
    width: 100,
    height: 30,
    position: "absolute",
    right: 15,
    bottom: 35,
    justifyContent: "center",
  },
  imgvoucher_image_page_left: {
    marginTop: 20,
  },
});
