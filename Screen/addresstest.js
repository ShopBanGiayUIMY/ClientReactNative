import { SelectList } from "react-native-dropdown-select-list";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import axios from "axios";

const Notification = React.memo(() => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách tỉnh/thành phố
    axios
      .get("https://provinces.open-api.vn/api/p/")
      .then((response) => {
        // Cập nhật state với dữ liệu từ API
        setProvinces(response.data);
      })
      .catch((error) => {
        console.error("Error fetching province data:", error);
      });
  }, []);

  useEffect(() => {
    // Gọi API để lấy danh sách quận/huyện
    axios
      .get("https://provinces.open-api.vn/api/d/")
      .then((response) => {
        // Cập nhật state với dữ liệu từ API
        setDistricts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching district data:", error);
      });
  }, []);

  useEffect(() => {
    // Lọc danh sách quận/huyện theo tỉnh được chọn
    const filtered = districts.filter(
      (district) => district.province_code === selectedProvince
    );
    setFilteredDistricts(filtered);
  }, [selectedProvince, districts]);

  // Reset huyện khi chọn tỉnh khác
  useEffect(() => {
    setSelectedDistrict("");
  }, [selectedProvince]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <SelectList
        boxStyles={{ width: "100%", height: 60, marginBottom: 5 }}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 5,
          zIndex: 2, 
          position: "relative", 
        }}
        setSelected={(val) => setSelectedProvince(val)}
        data={provinces.map((province) => ({
          key: province.code,
          value: province.name,
        }))}
        save="key"
      />
      <SelectList
        boxStyles={{ width: "100%", height: 60, position: "relative", zIndex: 1 }}
        setSelected={(val) => setSelectedDistrict(val)}
        data={filteredDistricts.map((district) => ({
          key: district.code,
          value: district.name,
        }))}
        save="key"
      />
    </View>
  );
  
});

export default Notification;
