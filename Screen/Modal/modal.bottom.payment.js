import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import { PaymentIcon } from "react-native-payment-icons";

export default function ModalBottom() {
  const [isDrawerVisible, setDrawerVisible] = useState(true);
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [cvv, setCVV] = useState("");

  const [nameError, setNameError] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [expireDateError, setExpireDateError] = useState("");
  const [cvvError, setCVVError] = useState("");

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const validateCardNumber = (number) => {
    return /^\d{16}$/.test(number);
  };

  const validateCVV = (cvv) => {
    return /^\d{3}$/.test(cvv);
  };

  const handleInputChange = (text, inputType) => {
    setNameError("");
    setCardNumberError("");
    setExpireDateError("");
    setCVVError("");

    switch (inputType) {
      case "name":
        setName(text.toUpperCase());
        break;
      case "cardNumber":
        setCardNumber(text);
        break;
      case "expireDate":
        setExpireDate(text);
        break;
      case "cvv":
        setCVV(text);
        break;
      default:
        break;
    }
  };

  const handleAddCard = () => {
    // Kiểm tra xem có lỗi nào không
    if (!validateCardNumber(cardNumber)) {
      setCardNumberError("Sai định dạng thẻ");
      return;
    }

    if (!validateCVV(cvv)) {
      setCVVError("Sai định dạng CVV");
      return;
    }

    if (name.length <= 1) {
      setNameError("Vui lòng nhập tên, tên phải lớn hơn 1 ký tự");
      return;
    }
    // Log thông tin đã nhập ra console
    console.log("Name:", name);
    console.log("Card Number:", cardNumber);
    console.log("Expire Date:", expireDate);
    console.log("CVV:", cvv);

    closeDrawer();
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDrawerVisible}
        onRequestClose={closeDrawer}
      >
        <Pressable
          style={styles.modalContainer}
          onPress={closeDrawer}
        ></Pressable>
        <View style={styles.drawer}>
          <Text
            style={{
              fontSize: 19,
              fontWeight: "bold",
              fontStyle: "normal",
              textAlign: "center",
            }}
          >
            Add new card
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Name on card"
            onChangeText={(text) => handleInputChange(text, "name")}
          />
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            onChangeText={(text) => handleInputChange(text, "cardNumber")}
          />
          {cardNumberError ? (
            <Text style={styles.errorText}>{cardNumberError}</Text>
          ) : (
            validateCardNumber(cardNumber) && (
              <PaymentIcon type="visa" width={50} />
            )
          )}
          <TextInput
            style={styles.input}
            placeholder="Expire Date"
            onChangeText={(text) => handleInputChange(text, "expireDate")}
          />
          <TextInput
            style={styles.input}
            placeholder="CVV"
            onChangeText={(text) => handleInputChange(text, "cvv")}
          />
          {cvvError && <Text style={styles.errorText}>{cvvError}</Text>}
          {nameError && <Text style={styles.errorText}>{nameError}</Text>}
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              height: 50,
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={closeDrawer}
              style={[
                styles.closeButton,
                { borderColor: "orange", backgroundColor: "white" },
              ]}
            >
              <Text style={[styles.txt, { color: "orange" }]}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleAddCard}
              style={[
                styles.closeButton,
                { borderColor: "white", backgroundColor: "orange" },
              ]}
            >
              <Text style={[styles.txt, { color: "white" }]}>Thêm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  drawer: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: 400,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    width: "80%",
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  closeButton: {
    width: "49%",
    borderRadius: 4,
    borderWidth: 1,
  },
  txt: {
    textAlign: "center",
    paddingTop: 13,
    fontSize: 19,
    fontWeight: "800",
    fontStyle: "normal",
  },
});
