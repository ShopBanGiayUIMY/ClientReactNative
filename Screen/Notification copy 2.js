import React, { useRef ,useState,useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import FlashMessage, { showMessage, renderMessage } from 'react-native-flash-message';

const Notification = () => {
  const itemPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const cartPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const [progress] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: false,
    }).start();
  }, []);

  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });


  const handleAddToCart = () => {
    // Hiển thị flash message với nút tùy chỉnh
    showMessage({
      message: 'Sản phẩm đã được thêm vào giỏ hàng!',
      type: 'success',
      duration: 2000,
      renderCustomContent: () => (
        <View style={styles.customMessageContainer}>
          <TouchableOpacity onPress={() => alert("hfjdfhj")}>
            <View style={styles.customButton}>
              <Text style={styles.customButtonText}>Nút Tùy Chỉnhd</Text>
            </View>
          </TouchableOpacity>
        </View>
      ),
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.item, { transform: itemPosition.getTranslateTransform() }]}>
        <Text style={styles.itemText}>Item</Text>
      </Animated.View>
      <TouchableOpacity onPressIn={handleAddToCart}>
        <View style={styles.cartButton}>
          <Text style={styles.buttonText}>Giỏ hàng</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.progressBarContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: width,
            },
          ]}
        />
      </View>
      <Text>{Math.round(progress.__getValue() * 100)}%</Text>
      {/* Hiển thị component FlashMessage */}
      <FlashMessage position="top" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarContainer: {
    width: 200,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3498db', // Màu sắc của thanh tiến trình
  },
  item: {
    width: 50,
    height: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cartButton: {
    marginTop: 20,
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  customMessageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  messageText: {
    marginBottom: 10,
    fontSize: 16,
  },
  customButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
  },
  customButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Notification;
