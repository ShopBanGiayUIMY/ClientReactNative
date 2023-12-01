import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
const Checkbox = ({
  text,
  onPress,
  isChecked,
  containerStyle,
  textStyle,
  checkboxStyle,
}) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const startAnimation = () => {
    const toValue = isChecked ? 0 : 30;
    Animated.timing(animatedWidth, {
      toValue: toValue,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[
          styles.checkbox,
          isChecked && styles.checkboxSelected,
          checkboxStyle,
        ]}
        onPress={()=>{
          startAnimation();
          onPress();
        }}
      >
        <Animated.View style={{ width: animatedWidth }}>
          <FontAwesomeIcon
            icon={faCheck}
            size={20}
            style={{ color: "white" }}
          />
        </Animated.View>
      </TouchableOpacity>
      <Text style={[styles.checkboxText, textStyle]}>{text}</Text>
    </View>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 5,
    height: 20,
    width: 20,
  },
  checkboxSelected: {
    backgroundColor: "green",
  },
  checkboxText: {
    fontSize: 16,
  },
});
