import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import ModalBottom from "../../Screen/Modal/modal.bottom.payment";
import { PaymentIcon } from "react-native-payment-icons";
import { Ionicons } from "@expo/vector-icons";
const CpnPaymentMethod = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={{ width: "100%", height: 680, backgroundColor: "white" }}>
      <Text
        style={{
          paddingTop: 15,
          paddingLeft: 15,
          fontSize: 19,
          fontWeight: "400",
          fontStyle: "normal",
        }}
      >
        Các tài khoản của bạn
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: 344,
            height: 216,
            backgroundColor: "#222222",
            alignSelf: "center",
            marginTop: 10,
            borderRadius: 6,
          }}
        >
          <View
            style={{
              borderColor: "#FFBA49",
              marginTop: 35,
              marginLeft: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Image
              source={{
                uri: "https://i.ibb.co/m8b9bZY/chip.png",
              }}
              style={{ width: 32, height: 24 }}
            />
            <PaymentIcon type="visa" width={50} style={{ marginRight: 20 }} />
          </View>
          <View
            style={{ width: 264, height: 22, marginTop: 20, marginLeft: 20 }}
          >
            <Text
              style={{
                fontSize: 24,
                color: "white",
                fontWeight: "400",
                fontStyle: "normal",
              }}
            >
              **** **** **** 2003
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              height: 100,
              marginTop: 20,
              marginLeft: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "49%" }}>
              <Text style={styles.txtname}>Tên chủ thẻ:</Text>
              <Text style={[styles.txtname, { fontSize: 20 }]}>
                TRAN VAN TRUNG
              </Text>
            </View>
            <View style={{ width: "49%" }}>
              <Text style={styles.txtname}>Có hạn đến:</Text>
              <Text style={[styles.txtname, { fontSize: 20 }]}>09/27</Text>
            </View>
          </View>
        </View>
        <View
          style={styles.checkboxContainer}
        >
          <Pressable
            style={[styles.checkboxBase, checked && styles.checkboxChecked]}
            onPress={() => setChecked(!checked)}
          >
            {checked && <Ionicons name="checkmark" size={24} color="pink"  />}
          </Pressable>
          <Text style={{marginLeft:10, fontWeight:'400', fontSize:18, fontStyle:'normal'}}>Sử dụng tài khoản này để thanh toán</Text>
        </View>
      </ScrollView>
      <Pressable
        style={{
          position: "absolute",
          right: 20,
          bottom: 20,
          borderRadius: 50,
          borderColor: "black",
          borderWidth: 3,
          width: 50,
          height: 50,
          backgroundColor: "white",
        }}
        onPress={toggleModal}
      >
        <Image
          source={{
            uri: "https://static.vecteezy.com/system/resources/previews/000/583/100/original/vector-button-plus-icon.jpg",
          }}
          style={{ width: 25, height: 25, alignSelf: "center", marginTop: 8 }}
        />
      </Pressable>
      {isModalVisible && (
        <ModalBottom openDrawer={isModalVisible} closeDrawer={toggleModal} />
      )}
    </View>
  );
};

export default CpnPaymentMethod;

const styles = StyleSheet.create({
  txtname: {
    color: "white",
  },
  checkboxBase: {
     width: 24,
     height: 24,
     justifyContent: 'center',
     alignItems: 'center',
     borderRadius: 4,
     borderWidth: 2,
     borderColor: 'coral',
     backgroundColor: 'transparent',
   },
   checkboxChecked: {
     backgroundColor: 'coral',
   },
   appContainer: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
   },
   appTitle: {
     marginVertical: 16,
     fontWeight: 'bold',
     fontSize: 24,
   },
   checkboxContainer: {
     flexDirection: 'row',
     alignItems: 'center',
     marginTop:20, 
     marginLeft:10
   },
   checkboxLabel: {
     marginLeft: 8,
     fontWeight: 500,
     fontSize: 18,
   },
});
