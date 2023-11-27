import React, { useState, useEffect, useMemo } from "react";
import { Pressable } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import FlashMessage, {
  showMessage,
  renderMessage,
} from "react-native-flash-message";
import useAuth from "../../Services/auth.services";
export default function ModalCoupon(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { search_voucher_and_add } = useAuth();
  const { check, handlePress, fun_search, value } = props;
  useEffect(() => {
    if (check) {
      toggleModal();
      setInputValue("");
    }
  }, [check]);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    handlePress();
  };
  const search = () => {
    console.log("value", inputValue);
    fun_search();
    if (inputValue == "") {
      showMessage({
        message: "Bạn chưa nhập mã giảm giá!",
        type: "danger",
        duration: 10000,
      });
      return;
    } else {
      search_voucher_and_add(inputValue.toLocaleLowerCase()).then((result) => {
        console.log("result", result);
        if (result && result.success) {
          showMessage({
            message: result.message,
            type: "danger",
            duration: 10000,
          });
        } else {
          showMessage({
            message: result,
            type: "success",
            duration: 10000,
          });
        }
      });
    }
  };
  const handleInputChange = (text) => {
    setInputValue(text);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <Pressable
          style={styles.modalContainer}
          onPress={toggleModal}
        ></Pressable>
        <View style={styles.modalContent}>
          <TextInput
            value={inputValue}
            style={styles.input}
            placeholder="Nhập mã giảm giá..."
            onChangeText={handleInputChange}
            autoCapitalize="none"
          />
          <FlashMessage position="top" style={{ marginTop: "16%" }} />
          <Pressable style={styles.Click_tvc} onPress={search}>
            <Text style={styles.text_tvc}>Áp dụng</Text>
          </Pressable>
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
    width: "100%",
  },
  modalContainer: {
    justifyContent: "flex-start",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: "100%",
    marginTop: "14%",
    position: "relative",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 60,
    width: "100%",
    position: "absolute",
    marginTop: "14%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    width: "70%",
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: "rgba(222, 228, 243, 1)",
  },
  Click_tvc: {
    backgroundColor: "rgba(181, 190, 217, 1)",
    padding: 10,
    borderRadius: 5,
    width: "20%",
  },
  text_tvc: {
    fontSize: 12,
    textAlign: "center",
    color: "rgba(255, 255, 255, 1)",
  },
});
