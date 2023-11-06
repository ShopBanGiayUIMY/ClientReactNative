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

export default function ModalCoupon(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { check, handlePress,fun_search } = props;

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
    fun_search?fun_search(inputValue):null;
   }
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
          />
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
    fontSize: 15,
    textAlign: "center",
    color: "rgba(255, 255, 255, 1)",
  },
});
