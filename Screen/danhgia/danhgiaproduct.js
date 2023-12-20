import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Rating } from "react-native-ratings";
import useAuth from "../../Services/auth.services";
import { useNavigation } from "@react-navigation/native";

const DanhGiaProduct = (props) => {
  const [tempRating, setTempRating] = useState(5); // Default rating set to 5
  const [rating, setRating] = useState("Tuyệt vời"); // Default rating label
  const [comment, setComment] = useState(""); // State for the text input
  const navigation = useNavigation();

  const { data } = props.route.params;
  const { GuiDanhGia } = useAuth();
  console.log("data", data.OrderDetails[0].ProductDetail.Product.product_id);

  const ratingLabels = ["Tệ", "Không tốt", "Bình thường", "Tốt", "Tuyệt vời"];

  const ratingCompleted = (newRating) => {
    setTempRating(newRating);
    setRating(ratingLabels[newRating - 1]);
  };

  const handleSubmit = () => {
    // if (comment.trim() === "") {
    //   Alert.alert("Thông báo", "Vui lòng nhập nhận xét của bạn.");
    //   return;
    // }

    try {
      Alert.alert("Trạng thái", "Bạn có muốn đánh giá đơn hàng này không?", [
        {
          text: "Không",
          onPress: () => {},
        },
        {
          text: "Có",
          onPress: async () => {
            await GuiDanhGia(
              data.OrderDetails[0].ProductDetail.Product.product_id,
              tempRating
            );
            navigation.navigate("BottomTabNavigation");
          },
        },
      ]);
    } catch (error) {
      console.error("Cancellation failed:", error);
    }
    console.log("Rating is: " + tempRating + " (" + rating + ")");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Đánh giá sản phẩm</Text>

      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>Chất lượng sản phẩm</Text>
        <Text style={styles.ratingTextLabels}>{rating}</Text>
      </View>
      <Rating
        type="star"
        ratingCount={5}
        imageSize={30}
        onFinishRating={ratingCompleted}
        style={{ backgroundColor: "transparent", paddingVertical: 10 }}
        startingValue={5} // Default starting value set to 5
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Hãy chia sẻ nhận xét về sản phẩm này bạn nhé!"
        multiline
        numberOfLines={4}
        onChangeText={setComment}
        value={comment}
      /> */}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Gửi đánh giá</Text>
      </TouchableOpacity>

      {/* More components for additional functionality */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  ratingContainer: {
    flexDirection: "row",
    width: "100%",
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "400",
    marginRight: 10,
    width: "auto",
  },
  ratingTextLabels: {
    fontSize: 25,
    fontWeight: "400",
    marginHorizontal: 5,
    color: "rgba(235, 213, 0, 1)",
    paddingRight: 10,
  },
  input: {
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#f39c12",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold",
  },
  // ...other styles...
});

export default DanhGiaProduct;
