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

export default function ModalBottom() {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const openDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openDrawer} style={styles.button}>
        <Text>Show Drawer</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isDrawerVisible}
        onRequestClose={closeDrawer}
      >
        <Pressable style={styles.modalContainer} onPress={closeDrawer} ></Pressable>
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
    height: 200,
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