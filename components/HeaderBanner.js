import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  ScrollView,
} from "react-native";

const { width } = Dimensions.get("window");

const images = [
  "https://1sneaker.vn/wp-content/uploads/2021/06/giay-Nike-Dep-14.jpg",
  "http://ordixi.com/wp-content/uploads/2020/01/giay-nike-air-force-1-low-shadow-se-spruce-aura-white-ck3172-0023.jpg",
  "https://bazaarvietnam.vn/wp-content/uploads/2020/11/giay-the-thao-nike-x-PEACEMINUSONE-para-noise-20-g-dragon-01-768x725.jpg",
  "https://ben.com.vn/tin-tuc/wp-content/uploads/2021/12/hinh-nen-nike-dep-cho-dien-thoai-1.jpg",
];

const Slideshow = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef();

  useEffect(() => {
    const timer = setInterval(() => {
      const newIndex = Math.floor(
        (scrollX._value + width) / width
      ) % images.length;

      scrollViewRef.current.scrollTo({
        x: newIndex * width,
        animated: true,
      });
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        ))}
      </ScrollView>
      <Animated.View
        style={[
          styles.pagination,
          {
            transform: [
              {
                translateX: Animated.divide(scrollX, width).interpolate({
                  inputRange: [0, 1, 2, 3],
                  outputRange: [0, 10, 20, 30],
                }),
              },
            ],
          },
        ]}
      >
        {images.map((_, i) => (
          <View key={i} style={styles.paginationDot} />
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width,
    height: 250,
  },
  image: {
    width,
    height: "100%",
    resizeMode: "cover",
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#333",
    margin: 5,
    opacity: 0, // Ẩn chấm tròn
  },
});

export default Slideshow;
