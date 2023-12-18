import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ToastAndroid,
} from "react-native";
import axios from "axios";

const AddressConfirm = (props) => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWards, setSelectedWards] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const { sendDataAddress } = props;

  useEffect(() => {
    GetProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince && selectedDistrict && selectedWards) {
      console.log("Selected items:", {
        province: selectedProvince,
        district: selectedDistrict,
        wards: selectedWards,
      });
      sendDataAddress({
        province: selectedProvince,
        district: selectedDistrict,
        wards: selectedWards,
      });
    }
  }, [selectedProvince, selectedDistrict, selectedWards]);

  const GetProvinces = () => {
    axios
      .get("https://provinces.open-api.vn/api/p/")
      .then((response) => {
        setProvinces(response.data);
      })
      .catch((error) => {
        console.error("Error fetching province data:", error);
      });
  };

  const handleProvinceSelection = (value, name) => {
    try {
      setDistricts([]); // Clear districts when province changes
      setWards([]); // Clear wards when province changes
      setSelectedProvince(name);
      setCurrentStep(1);
      GetDistricts(value);
    } catch (error) {
      console.error("Error fetching province search data:", error);
    }
  };

  const handleDistrictSelection = (value, name) => {
    try {
      setWards([]); // Clear wards when district changes
      setSelectedDistrict(name);
      setCurrentStep(2);
      GetWards(value);
    } catch (error) {
      console.error("Error fetching district search data:", error);
    }
  };
  const handleWardsSelection = (value, name) => {
    try {
      setCurrentStep(3);
      setSelectedWards(name);
    } catch (error) {
      console.error("Error fetching district search data:", error);
    }
  };

  const GetDistricts = (code) => {
    axios
      .get(`https://provinces.open-api.vn/api/p/${code}?depth=2`)
      .then((response) => {
        setDistricts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching district data:", error);
      });
  };

  const GetWards = (code) => {
    axios
      .get(`https://provinces.open-api.vn/api/p/${code}?depth=3`)
      .then((response) => {
        setWards(response.data.districts[0].wards);
      })
      .catch((error) => {
        ToastAndroid.show(
          "Có lỗi lấy phường tại địa chỉ này",
          ToastAndroid.SHORT
        );
      });
  };

  const renderSelectedItems = () => {
    return (
      <View style={{ flexDirection: "column", flexWrap: "wrap" }}>
        {selectedProvince && (
          <TouchableOpacity
            style={styles.selectedItem}
            onPress={() => {
              setCurrentStep(0);
              setSelectedDistrict("");
              setSelectedWards("");
            }}
          >
            <View style={styles.itemContainer}>
              <Text style={styles.selectedItemText}>{selectedProvince}</Text>
              <Image
                source={{
                  uri: "https://cdn.icon-icons.com/icons2/67/PNG/512/next_13716.png",
                }}
                style={styles.nextIcon}
              />
            </View>
          </TouchableOpacity>
        )}
        {selectedDistrict && (
          <TouchableOpacity
            style={styles.selectedItem}
            onPress={() => {
              setCurrentStep(1);
              setSelectedWards("");
            }}
          >
            <View style={styles.itemContainer}>
              <Text style={styles.selectedItemText}>{selectedDistrict}</Text>
              <Image
                source={{
                  uri: "https://cdn.icon-icons.com/icons2/67/PNG/512/next_13716.png",
                }}
                style={styles.nextIcon}
              />
            </View>
          </TouchableOpacity>
        )}
        {selectedWards && (
          <TouchableOpacity
            style={styles.selectedItem}
            onPress={() => setCurrentStep(2)}
          >
            <View style={styles.itemContainer}>
              <Text style={styles.selectedItemText}>{selectedWards}</Text>
              <Image
                source={{
                  uri: "https://cdn.icon-icons.com/icons2/67/PNG/512/next_13716.png",
                }}
                style={styles.nextIcon}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderSelectableItems = () => {
    switch (currentStep) {
      case 0:
        return (
          <ScrollView>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 200,
                  backgroundColor: "rgba(55, 255, 6, 0.8)",
                  marginRight: 5,
                  borderWidth: 1,
                  borderColor: "white",
                  padding: 10,
                }}
              />
              <Text>Chọn Tỉnh/Thành phố</Text>
            </View>

            {provinces.map((province) => (
              <TouchableOpacity
                key={province.code}
                style={styles.selectableItem}
                onPress={() =>
                  handleProvinceSelection(province.code, province.name)
                }
              >
                <Text>{province.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        );
      case 1:
        return (
          <ScrollView>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 200,
                  backgroundColor: "rgba(55, 255, 6, 0.8)",
                  marginRight: 5,
                  borderWidth: 1,
                  borderColor: "white",
                  padding: 10,
                }}
              />
              <Text>Chọn Quận/Huyện</Text>
            </View>

            {districts.districts &&
              districts.districts.map((district) => (
                <TouchableOpacity
                  key={district.code}
                  style={styles.selectableItem}
                  onPress={() =>
                    handleDistrictSelection(district.code, district.name)
                  }
                >
                  <Text>{district.name}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        );
      case 2:
        return (
          <ScrollView>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 200,
                  backgroundColor: "rgba(55, 255, 6, 0.8)",
                  marginRight: 5,
                  borderWidth: 1,
                  borderColor: "white",
                  padding: 10,
                }}
              />
              <Text>Chọn Phường/Xã</Text>
            </View>

            {wards &&
              wards.map((ward) => (
                <TouchableOpacity
                  key={ward.code}
                  style={styles.selectableItem}
                  onPress={() => handleWardsSelection(ward.code, ward.name)}
                >
                  <Text>{ward.name}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        );
      default:
        return null;
    }
  };
  return (
    <View style={{ flex: 1 }}>
      {renderSelectedItems()}
      {renderSelectableItems()}
    </View>
  );
};

const styles = StyleSheet.create({
  selectedItem: {
    borderRadius: 5,
    backgroundColor: "rgba(39, 217, 245, 0.8)",
    margin: 5,
    padding: 10,
    width: "97%",
  },
  selectedItemText: {
    fontSize: 16,
    color: "rgba(255, 93, 0, 0.8)",
    paddingHorizontal: 30,
  },
  selectableItem: {
    padding: 10,
    margin: 5,
    backgroundColor: "rgba(39, 217, 245, 0.8)",
    borderRadius: 5,
    width: 300,
    height: 50,
  },

  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  nextIcon: {
    width: 30,
    height: 10,
    marginLeft: 20,
    position: "absolute",
    left: "80%",
  },
});
export default AddressConfirm;
