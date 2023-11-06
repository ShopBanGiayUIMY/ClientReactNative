import React, { useRef, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");

const images = [
  "https://1sneaker.vn/wp-content/uploads/2021/06/giay-Nike-Dep-14.jpg",
  "http://ordixi.com/wp-content/uploads/2020/01/giay-nike-air-force-1-low-shadow-se-spruce-aura-white-ck3172-0023.jpg",
  "https://bazaarvietnam.vn/wp-content/uploads/2020/11/giay-the-thao-nike-x-PEACEMINUSONE-para-noise-20-g-dragon-01-768x725.jpg",
  "https://ben.com.vn/tin-tuc/wp-content/uploads/2021/12/hinh-nen-nike-dep-cho-dien-thoai-1.jpg",
  "https://ben.com.vn/tin-tuc/wp-content/uploads/2021/12/hinh-nen-nike-dep-cho-dien-thoai-1.jpg",
  "https://ben.com.vn/tin-tuc/wp-content/uploads/2021/12/hinh-nen-nike-dep-cho-dien-thoai-1.jpg",
];

const Slideshow = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef();
  const contentOffsetX = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const handleMomentumScrollEnd = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffset / width);
    setCurrentIndex(newIndex);

    // Chỉ cập nhật giá trị contentOffset khi cần thiết
    if (contentOffset !== contentOffsetX.current) {
      contentOffsetX.current = contentOffset;
      const newScrollX = newIndex * width;

      // Scroll đến vị trí mới mà không có animation
      scrollViewRef.current.scrollTo({
        x: newScrollX,
        animated: false,
      });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isSwiping) {
        const newIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(newIndex);
        scrollViewRef.current.scrollTo({
          x: newIndex * width,
          animated: true,
        });
      }
    }, 2500);
    return () => clearInterval(timer);
  }, [currentIndex, isSwiping]);
  const handleScrollBegin = () => {
    setIsSwiping(true);
  };

  const handleScrollEnd = () => {
    setIsSwiping(false);
  };
  const handleBannerPress = (index) => {
    alert(`Bạn đã ấn vào banner số ${index + 1}`);
  };
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
        onMomentumScrollEnd={handleMomentumScrollEnd}
        onScrollBeginDrag={handleScrollBegin}
        onScrollEndDrag={handleScrollEnd}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollViewContent}
        decelerationRate="fast" // Giảm tốc nhanh hơn
        overScrollMode="never" // Ngăn không cho overscroll
      >
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            style={styles.imageContainer}
            onPress={() => {
              scrollViewRef.current.scrollTo({
                x: index * width,
                animated: true,
              });
              handleBannerPress(index);
              setCurrentIndex(index);
            }}
          >
            <Image source={{ uri: image }} resizeMode="contain" style={styles.image} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.pagination}>
        {images.map((_, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.paginationDot,
              i === currentIndex && styles.activeDot,
            ]}
            onPress={() => {
              scrollViewRef.current.scrollTo({
                x: i * width,
                animated: true,
              });
              setCurrentIndex(i);
            }}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 0, // Thêm giá trị padding cho ScrollView\
  },
  imageContainer: {
    width: width,
    height: 150,
   
  
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
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
    borderColor: "#fff",
    borderWidth: 1,
    margin: 5,
  },
  activeDot: {
    backgroundColor: "#66B2FF",
    width: 12,
    height: 12,
    borderRadius: 10,
    borderWidth: 1,
    position: "relative",
    top: -2,
  },
});

export default Slideshow;
