import { SelectList } from 'react-native-dropdown-select-list';
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const Notification = React.memo(() => {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách tỉnh/thành phố
    axios.get('https://provinces.open-api.vn/api/p/')
      .then(response => {
        // Cập nhật state với dữ liệu từ API
        setProvinces(response.data);
      })
      .catch(error => {
        console.error('Error fetching province data:', error);
      });
  }, []); 

  useEffect(() => {
    // Gọi API để lấy danh sách quận/huyện
    axios.get('https://provinces.open-api.vn/api/d/')
      .then(response => {
        // Cập nhật state với dữ liệu từ API
        setDistricts(response.data);
      })
      .catch(error => {
        console.error('Error fetching district data:', error);
      });
  }, []); 

  return (
    <View>
      <SelectList
        setSelected={(val) => setSelectedProvince(val)}
        data={provinces.map((province) => ({ key: province.code, value: province.name }))}
        save="value"
      />
      <Text>Tỉnh/ Thành Phố: {selectedProvince}</Text>
      <SelectList
        setSelected={(val) => setSelectedDistrict(val)}
        data={districts.map((district) => ({ key: district.code, value: district.name }))}
        save="value"
      />
      <Text>Quận/ Huyện: {selectedDistrict}</Text>
    </View>
  );
});

export default Notification;
