import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable
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
  const { closeDrawer,openDrawer, } = props;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    { label: "M", value: "1" },
    { label: "L", value: "2" },
    { label: "XL", value: "3" },
    { label: "XXL", value: "4" },
  ]);
  const handleInputChange = (text) => {
    setInputValue(text);
  };

  return (
    <View style={styles.container}>

      <Modal
        animationType="slide"
        transparent={true}
        visible={openDrawer}
        onRequestClose={closeDrawer}
      >
        <Pressable style={styles.modalContainer} onPress={closeDrawer} ></Pressable>
        <View style={styles.dropdownContainer}>
            <View style={styles.dropdown}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                multiple={true}
                min={1}
                max={1}
                autoScroll={true}
                style={{ width: "100%", height: 40 }}
                zIndex={9999}
              />
            </View>
            <View style={styles.dropdown}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                multiple={true}
                min={1}
                max={5}
                autoScroll={true}
                style={{ width: "100%", height: 40 }}
              />
            </View>
          </View>
        <View style={styles.drawer}>
            <TextInput
              style={styles.input}
              placeholder="Enter text..."
              onChangeText={handleInputChange}
            />
            <TouchableOpacity onPress={closeDrawer} style={styles.closeButton}>
              <Text>Close</Text>
            </TouchableOpacity>
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
    height: 350,
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
  },
});
