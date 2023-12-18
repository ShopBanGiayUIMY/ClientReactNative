import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

const UploadImage = () => {
  const [imageUri, setImageUri] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const pickImage = async () => {
    // Request permission to access the photo library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Required",
        "Camera roll permissions are required to select a photo!"
      );
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (
      pickerResult.canceled === true ||
      (pickerResult.assets && pickerResult.assets.length === 0)
    ) {
      // Handle the cancellation
      return;
    }

    const selectedImage = pickerResult.assets[0];
    setImageUri(selectedImage.uri);
    uploadImage(selectedImage.uri);
  };

  const uploadImage = async (uri) => {
    const formData = new FormData();
    formData.append("image", {
      name: "upload.jpg", // You can name the file whatever you want
      type: "image/jpeg",
      uri: uri,
    });
    formData.append("key", "58c02cce0237a8eff7addbdac9787595"); // Replace with your ImgBB API Key

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImageUrl(response.data.data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Upload Error", "There was an error uploading the image.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Text>Pick an Image</Text>
      </TouchableOpacity>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
      )}
      {imageUrl ? <Text>Image URL: {imageUrl}</Text> : null}
    </View>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
