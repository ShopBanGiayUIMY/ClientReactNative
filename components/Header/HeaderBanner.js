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
const { height } = Dimensions.get("window");

const images = [
  "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/7307e562514417.5a931ab904cad.gif",
  "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/hk7hv22ezuxx0qvadlt9/air-jordan-legacy-312-low-shoes-6Vd4Xl.png",
  "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/6c220fb9-a08c-437a-ae82-9b59bc700394/jordan-one-take-4-pf-shoes-v5trdl.png",
  "https://iili.io/JuGdGOQ.png",
  "https://giaysneaker.store/media/wysiwyg/slidershow/home-12/banner_NIKE.jpg",
  "https://chiinstore.com/media/news/9_banner_nike.jpg",
  "https://i.pinimg.com/originals/84/e0/54/84e0549407ac340872460e040456b59d.gif",
  "https://cdn.dribbble.com/users/2198140/screenshots/4377526/nike_shoe.gif",
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
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, isSwiping]);
  const handleScrollBegin = () => {
    setIsSwiping(true);
  };

  const handleScrollEnd = () => {
    setIsSwiping(false);
  };
  const handleBannerPress = (index) => {
    
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
    flex: 0.05,
    marginHorizontal: 10,
    width: width,
  
  },
  scrollViewContent: {
    paddingHorizontal: 0, // Thêm giá trị padding cho ScrollView\
  },
  imageContainer: {
    width: width,
    height: 180,
    position: "relative",
  },
  image: {
    width: "95%",
    height: "100%",
    borderRadius: 5,
    resizeMode: "cover",
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    top: 150,
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
