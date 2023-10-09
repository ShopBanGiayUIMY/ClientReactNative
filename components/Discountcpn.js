import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const Discountcpn = (props) => {
  const { dataProd, handlePress } = props;
  const thoiHanSuDungDate = new Date(dataProd.thoihansudung);
  const [day, setDay] = useState(thoiHanSuDungDate.getDay());
  const [month, setMonth] = useState(thoiHanSuDungDate.getMonth());
  const [year, setYear] = useState(thoiHanSuDungDate.getFullYear());
  const [hour, setHour] = useState(thoiHanSuDungDate.getHours());
  const [minute, setMinute] = useState(thoiHanSuDungDate.getMinutes());
  const [seconds, setSeconds] = useState(thoiHanSuDungDate.getSeconds());
  const [isExpired, setIsExpired] = useState(false);
  const [soLuongPhieu, setSoLuongPhieu] = useState(dataProd.solansudung);
  const [isHidden, setIsHidden] = useState(false);
  
  const handleThuThapDiscount = () => {
    if (isExpired) {
      alert("Thu  thập mã giảm giá thành công");
    } else {
      setIsExpired(true);
      // Trừ đi 1 đơn vị từ soluotsudung
      setSoLuongPhieu(soLuongPhieu - 1);
      // Kiểm tra nếu soluotsudung bằng 0 thì ẩn item
      if (soLuongPhieu === 0) {
        setIsHidden(true);
      }
    }
  };
// thời gian đếm ngược
  useEffect(() => {
    const timer = setInterval(() => {
      if (hour === 0 && minute === 0 && seconds === 0) {
        setIsExpired(true);
        clearInterval(timer);
      } else {
        if (seconds === 0) {
          if (minute === 0) {
            setHour(hour - 1);
            setMinute(59);
          } else {
            setMinute(minute - 1);
          }
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [hour, minute, seconds]);

  // Kiểm tra nếu soluotsudung bằng 0 thì ẩn item
  useEffect(() => {
    if (soLuongPhieu === 0) {
      setIsHidden(true);
    }
  }, [soLuongPhieu]);

  // Nếu mục đã bị ẩn, không hiển thị nó
  if (isHidden) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        marginStart: 10,
        marginEnd: 10,
        height: 110,
        width: Dimensions.get("window").width,
        marginTop: 50,
        backgroundColor: "#A9CDEE",
        borderRadius: 10,
      }}
    >
      <View
        style={{
          borderRadius: 10,
          borderWidth: 0.5,
          width: "38%",
          paddingHorizontal: 4,
          paddingTop: 20,
          borderStyle: "dashed",
          backgroundColor: "#7FFFD4",
        }}
      >
        <Text
          style={{
            fontSize: 13,
            fontStyle: "normal",
            fontWeight: "800",
            textAlign: "center",
            paddingTop: 5,
            color: "#008B8B",
          }}
        >
          Free Ship {"\n"}
          <Text>
            Còn lại: {soLuongPhieu}
            {"\n"}lượt sử dụng
          </Text>
        </Text>
      </View>
      <View
        style={{
          borderRadius: 10,
          borderWidth: 0.5,
          width: "62%",
          borderStyle: "dotted",
          backgroundColor: "#7FFFD4",
        }}
      >
        <Text
          style={{
            fontSize: 13,
            fontStyle: "normal",
            fontWeight: "800",
            paddingTop: 5,
            color: "#008B8B",
            paddingStart: 10,
          }}
        >
          {dataProd.gioihansotien} $
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontStyle: "normal",
            fontWeight: "800",
            paddingTop: 5,
            color: "#20B2AA",
            paddingStart: 10,
          }}
        >
         Áp dụng cho đơn hàng từ: {dataProd.dieukienapdung} $
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontStyle: "normal",
            fontWeight: "800",
            paddingTop: 5,
            color: isExpired ? "red" : "#20B2AA",
            paddingStart: 10,
          }}
        >
          {isExpired
            ? "Thu thập thành công"
            : `${day}d - ${month}m - ${year} - ${hour}h:${minute}p:${seconds}s`}
        </Text>
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 10,
            top: 70,
            borderRadius: 10,
            backgroundColor: isExpired ? "gray" : "#00CED1",
            width: 65,
          }}
          onPress={isExpired ? null : handleThuThapDiscount}
          disabled={isExpired}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: "600",
              textAlign: "center",
              color: isExpired ? "#fff" : "#000",
            }}
          >
            {isExpired ? "Đã thu thập" : "Thu thập"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Discountcpn;
