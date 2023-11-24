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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faArrowLeft,
  faShareNodes,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import DropDownPicker from "react-native-dropdown-picker";

export default function ModalBottom(props) {
  const [inputValue, setInputValue] = useState("");
  const { closeDrawer, openDrawer } = props;
  const [openSize, setOpenSize] = useState(false);
  const [valueSize, setValueSize] = useState("");
  const [itemsSize, setSizeItems] = useState([
    { label: "M", value: "1" },
    { label: "L", value: "2" },
    { label: "XL", value: "3" },
    { label: "XXL", value: "4" },
  ]);

  const [openColor, setOpenColor] = useState(false);
  const [valueColor, setValueColor] = useState("");
  const [colorItems, setColorItems] = useState([
    { label: "Màu đỏ", value: "1" },
    { label: "Màu đen", value: "2" },
    { label: "Màu xanh", value: "3" },
    { label: "Màu tím", value: "4" },
  ]);

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const ConfirmDrawer = () => {
    if (!valueSize || !valueColor) {
      alert("Vui lòng chọn Size và chọn màu");
    } else {
      const selectedSize = itemsSize.find((item) => item.value === valueSize);
      const selectedColor = colorItems.find(
        (item) => item.value === valueColor
      );

      alert(`Đã chọn Size: ${selectedSize.label}, Màu: ${selectedColor.label}`);
      console.log("====================================");
      console.log(
        `Đã chọn Size: ${selectedSize.label}, Màu: ${selectedColor.label}`
      );
      console.log("====================================");
    }
    closeDrawer;
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openDrawer}
        onRequestClose={closeDrawer}
      >
        <Pressable
          style={styles.modalContainer}
          onPress={closeDrawer}
        ></Pressable>

        <View style={styles.drawer}>
          <View
            style={{
              flexDirection: "row",
              width: "90%",
              height: 55,
              justifyContent: "space-between",
              alignSelf: "center",
              paddingTop: 3,
            }}
          >
            <View style={{ width: "49%" }}>
              <DropDownPicker
                open={openSize}
                value={valueSize}
                items={itemsSize}
                setOpen={setOpenSize}
                setValue={setValueSize}
                setItems={setSizeItems}
                autoScroll={true}
                style={{ width: "100%", height: 40, borderColor: "white" }}
              />
            </View>
            <View style={{ width: "49%" }}>
              <DropDownPicker
                open={openColor}
                value={valueColor}
                items={colorItems}
                setOpen={setOpenColor}
                setValue={setValueColor}
                setItems={setColorItems}
                autoScroll={true}
                style={{ width: "100%", height: 40, borderColor: "white" }}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "50%",
              justifyContent: "space-between",
              alignSelf: "center",
            }}
          >
           
            <TouchableOpacity
              onPress={ConfirmDrawer}
              style={styles.closeButton}
            >
              <Text style={styles.txtLuachon}>Đồng ý</Text>
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
  button: {
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  drawer: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: 250,
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
  closeButton: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 5,
    width: 75,
  },
  txtLuachon: {
    textAlign: "center",
    fontSize: 16,
  },
});
