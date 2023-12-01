import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import moment from "moment/moment";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import Svg, { Path } from "react-native-svg";
const CpnOrder = ({ navigation }) => {
  const hanldeBackHome = () => {
    navigation.navigate("Home");
  };
  const time = moment().format("l");
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{}}>
        <View style={styles.vOrder}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{}}>
              <Text style={styles.txtContent}>
                Đơn hàng của bạn đang trên đường đến với bạn
              </Text>
              <Text style={styles.txtContent}>
                Đơn hàng sẽ được giao đến vào ngày: {time}
              </Text>
            </View>
            <FontAwesomeIcon
              style={styles.iconn}
              icon={faBox}
              size={45}
              color="white"
            />
          </View>
        </View>

        <View style={styles.inforShipping}>
          <View style={styles.linhtinh}>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 196 124"
              fill="none"
            >
              <Path
                d="M146.406 69.306C142.946 68.7757 142.035 67.3796 141.725 63.9337C141.312 59.3603 140.597 54.8107 140.013 50.2557C139.835 49.2628 139.715 48.2603 139.653 47.2535C139.636 45.4814 140.941 43.3384 142.507 43.1225C146.058 42.6335 149.763 42.0521 152.52 45.278C155.288 48.5151 157.994 51.8058 160.677 55.1144C162.044 56.7511 163.323 58.4602 164.507 60.2341C167.277 64.5219 164.942 69.3381 159.84 69.8409C155.355 69.9374 150.869 69.7589 146.406 69.306ZM146.544 48.2973L145.792 48.7276C146.891 53.4493 147.989 58.1712 149.14 63.1062L157.202 62.7312C153.482 57.3847 150.519 52.4663 146.544 48.2973Z"
                fill="black"
              />
              <Path
                d="M194.857 87.5828C193.877 79.9922 197.351 73.0547 191.849 67.5861C185.582 62.0798 178.648 54.6523 172.796 48.3108C166.216 41.2085 159.651 34.0832 152.273 27.6531C146.865 22.894 138.53 27.3339 131.899 27.1278C124.712 0.978675 121.725 0.290909 95.3643 0.488466C70.7005 0.699151 49.2723 3.29031 25.4945 5.34531C3.91079 7.81185 0.766955 5.93621 1.48565 29.9221C1.569 53.123 1.55849 73.0678 2.11835 95.5973C2.04877 113.156 22.793 108.969 34.8283 110.55C36.7001 127.241 61.1034 127.226 66.0043 112.667C92.9018 110.587 119.299 111.826 146.153 107.38C149.172 123.304 173.995 123.329 176.199 106.975C195.303 105.727 195.464 108.077 194.857 87.5828ZM8.97767 79.0176C8.79456 59.5779 7.30274 39.1398 8.01949 19.4995C8.37719 14.9806 8.76837 14.5493 13.3142 13.7892C22.26 12.2337 29.1437 11.8905 37.6814 11.0373C63.3809 9.00264 86.6442 5.38686 113.488 7.921C127.701 9.49621 129.05 67.2002 129.56 77.2461C88.3481 77.1522 50.1065 81.0811 9.49822 82.7219C9.09673 81.53 8.92024 80.2738 8.97767 79.0176ZM56.6935 113.71C47.0053 123.879 33.3587 109.134 43.7912 102.399C45.7176 101.947 47.9359 101.788 50.0638 101.489C55.8382 102.342 62.044 108.27 56.6935 113.71ZM128.234 101.361C118.762 102.564 78.3475 104.38 66.4775 105.234C61.6252 89.8281 40.6644 91.8332 36.1889 103.979C29.1693 103.429 22.1058 103.647 15.1604 102.509C7.38675 101.787 9.04731 93.4445 9.40699 87.8204C50.2811 87.0439 88.7288 83.7104 130.001 84.0792C129.412 88.4373 134.334 100.072 128.236 101.361H128.234ZM166.827 108.564C161.064 116.33 147.546 107.669 155.457 99.3095C157.075 97.6845 161.506 98.3047 163.28 99.1783C165.996 101.284 168.6 105.568 166.827 108.564ZM175.136 100.721C172.069 92.3077 159.408 88.2929 152.631 93.7806C151.617 94.5774 148.908 96.5372 147.643 99.8189C146.934 101.25 137.791 102.583 137.918 99.0641C137.082 76.2892 136.03 54.6687 133.541 32.5042C138.358 32.6945 146.154 30.6183 149.556 34.7158C154.303 39.5786 159.389 44.9272 165.546 51.5569C172.166 59.5065 180.818 66.5215 186.299 75.2508C186.831 81.6272 187.176 92.0084 187.64 98.7753L175.136 100.721Z"
                fill="black"
              />
            </Svg>
            <Text
              style={{
                width: 200,
                paddingTop: 5,
                paddingLeft: 10,
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              Thông tin đơn hàng
            </Text>
            <Pressable
              style={{ width: 120, height: 40 }}
              onPress={() => setShowDetails(!showDetails)}
            >
              <Text
                style={{
                  textAlign: "right",
                  fontSize: 18,
                  fontWeight: "800",
                  paddingRight: 10,
                  paddingTop: 5,
                }}
              >
                Xem chi tiết
              </Text>
            </Pressable>
          </View>
          {showDetails && (
            <View style={{ width: "100%", height: 220 }}>
              <Text
                style={{
                  fontStyle: "normal",
                  fontWeight: "300",
                  fontSize: 18,
                  paddingTop: 10,
                  paddingLeft: 10,
                }}
              >
                Mã đơn hàng: ABCABCALOALO113
              </Text>
              <View style={{ paddingLeft: 10, paddingTop: 5 }}>
                <Text style={styles.txtInfor}>
                  Đơn hàng được đặt vào ngày: {time}
                </Text>
              </View>
              <View
                style={{
                  paddingTop: 15,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="35"
                  viewBox="0 0 102 162"
                  fill="none"
                >
                  <Path
                    d="M27.5958 120.849C20.9996 122.189 12.5714 124.547 5.89444 130.952C2.54712 134.168 0.878113 138.021 1.20169 141.806C1.51148 145.436 3.66617 148.776 7.26881 151.209C11.1302 153.83 15.3871 155.815 19.8772 157.089C29.6068 159.807 39.6601 161.191 49.7622 161.207C57.3009 161.203 64.8192 160.424 72.1982 158.881C79.3523 157.39 87.632 155.139 94.7599 149.757C98.2037 147.158 100.23 143.963 100.621 140.516C101.015 137.037 99.7388 133.431 96.9271 130.08C93.0042 125.403 87.8171 122.195 81.0693 120.272C78.5444 119.55 75.921 119.068 73.3842 118.6C72.5507 118.446 71.7178 118.293 70.8849 118.13C71.9055 116.539 72.9307 114.954 73.9605 113.376C76.5622 109.372 79.2532 105.231 81.7302 101.058C89.1364 88.5795 97.8591 71.7897 99.5826 52.5642C101.399 32.303 95.0145 17.7991 80.0638 8.22578C69.6937 1.58496 58.122 -0.648498 45.6752 1.59158C26.8567 4.97632 14.5588 15.9805 9.12306 34.2989C5.88275 45.2216 7.06875 56.2665 8.46672 64.6696C10.756 78.4575 15.9286 92.2543 25.2401 109.405C26.6919 112.08 28.2257 114.63 29.8501 117.329C30.4159 118.268 30.983 119.214 31.5514 120.168L30.8295 120.285C29.7019 120.466 28.6426 120.637 27.5958 120.849ZM51.7895 127.563C51.3568 128.123 50.9212 128.686 50.4828 129.255C41.7279 121.787 36.1235 112.24 31.3723 103.015C25.2578 91.1438 18.7232 76.8586 16.6217 60.9068C14.8246 47.255 16.1694 37.1774 20.983 28.221C26.9629 17.0955 38.8498 10.0695 52.7806 9.42563C53.4627 9.39413 54.1411 9.37824 54.8153 9.37824C67.6341 9.37824 78.9684 15.0413 85.4208 24.7656C89.5275 30.9582 91.341 38.1747 91.131 47.475C90.8947 57.8307 88.0317 68.5074 82.1214 81.0723C75.4517 95.2564 66.7415 108.917 55.4939 122.834C54.239 124.385 53.0491 125.928 51.7895 127.563ZM34.7451 125.964C35.4474 125.995 36.1163 126.272 36.6354 126.747C40.5985 131.286 45.5055 134.904 51.0132 137.349C53.4239 138.412 55.5707 137.76 57.3888 135.412L58.6273 133.808C60.3049 131.63 62.0403 129.378 63.8472 127.264C64.3824 126.598 65.1522 126.161 65.9987 126.045C72.1936 126.548 78.7071 127.494 84.3654 130.981C86.7506 132.502 88.8876 134.381 90.7011 136.553C91.0949 136.944 91.404 137.412 91.6107 137.928C91.8175 138.443 91.9173 138.995 91.9035 139.55C91.8083 140.115 91.5989 140.655 91.2885 141.136C90.978 141.618 90.5731 142.032 90.0979 142.353C87.9549 144.058 85.6053 145.486 83.1033 146.602C73.7131 150.772 62.8882 152.85 49.0395 153.14C38.9923 152.77 29.2043 152.177 19.9158 149.047C16.8881 148.059 14.0059 146.671 11.3454 144.921C9.48011 143.663 8.44762 142.193 8.36033 140.668C8.27763 139.231 9.05342 137.771 10.603 136.446C13.9412 133.59 17.6803 131.24 21.7011 129.47C24.9119 128.071 28.4949 127.296 31.9603 126.547C32.809 126.364 33.6577 126.18 34.5004 125.987C34.5809 125.971 34.6629 125.963 34.7451 125.964Z"
                    fill="black"
                  />
                  <Path
                    d="M71.6559 44.1069C71.6559 43.927 71.6631 43.7473 71.6677 43.5681C71.6999 42.7805 71.6894 41.9917 71.6349 41.2053C71.4085 38.1778 70.4226 35.2566 68.7674 32.7113C67.1127 30.1662 64.8425 28.0794 62.1672 26.6444C59.5673 25.2742 56.6602 24.5922 53.7222 24.6635C50.7844 24.7349 47.9135 25.5573 45.3833 27.0521C39.4106 30.4401 35.6617 36.1457 34.5433 43.5518C33.0908 53.1685 39.9252 62.579 49.7769 64.529C51.1036 64.7941 52.453 64.9289 53.8061 64.9318C62.0976 64.9318 68.8665 59.6438 70.9274 51.0923C71.2463 49.6527 71.4885 48.197 71.6526 46.7316C71.7393 46.072 71.8246 45.4125 71.925 44.7562C71.9388 44.6664 71.9342 44.5746 71.9112 44.4866C71.8889 44.3987 71.8489 44.3162 71.7937 44.244C71.7543 44.1921 71.7077 44.1459 71.6559 44.1069ZM64.2051 44.9052L64.1913 45.1802C64.1775 45.4768 64.1585 45.8771 64.1257 46.2775C63.7812 50.4453 62.2557 53.6883 59.7144 55.6547C57.4546 57.4038 54.4993 58.0227 51.1625 57.4477C49.4206 57.0842 47.7699 56.3732 46.3093 55.357C44.8486 54.3408 43.6079 53.0401 42.6614 51.5333C41.7984 50.1604 41.244 48.6166 41.0368 47.0082C40.8296 45.3998 40.9747 43.7654 41.4617 42.2187C42.7186 37.9282 44.5755 33.7833 49.6102 32.5139C50.8258 32.2002 52.0755 32.0378 53.3309 32.0303C55.7094 31.9733 58.0361 32.7298 59.9263 34.1746C62.7512 36.4088 64.2707 40.22 64.2051 44.9023V44.9052Z"
                    fill="black"
                  />
                </Svg>
                <Text style={{ fontSize: 18, width: 150, paddingTop: 5 }}>
                  Địa chỉ đặt hàng
                </Text>
                <Pressable style={{ width: 150, height: 40 }}>
                  <Text
                    style={{
                      textAlign: "right",
                      paddingRight: 15,
                      paddingTop: 10,
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    Copy
                  </Text>
                </Pressable>
              </View>
              <View
                style={{
                  paddingTop: 10,
                  paddingLeft: 10,
                  borderRadius: 3,
                }}
              >
                <Pressable style={{ position: "absolute", right: 15, top: 10 }}>
                  <Text
                    style={{
                      color: "red",
                      fontSize: 18,
                      fontStyle: "normal",
                      fontWeight: "400",
                    }}
                  >
                    Đổi
                  </Text>
                </Pressable>
                <Text style={styles.txtInfor}>Họ và tên: Trần Văn Trung</Text>
                <Text style={styles.txtInfor}>
                  Số điện thoại: 0123456789JQK
                </Text>
                <Text style={styles.txtInfor}>
                  Địa chỉ: số nhà ABC, đường: XYZ, huyện: JQK, tỉnh: QKA
                </Text>
              </View>
            </View>
          )}
          <ScrollView
            style={{ width: "100%", height: 500, marginTop: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                marginTop: 15,
                width: "100%",
                height: 110,
                backgroundColor: "#CCCCCC",
                flexDirection: "row",
                borderRadius: 5,
              }}
            >
              <Image
                source={{
                  uri: "https://s.meta.com.vn/img/thumb.ashx/Data/image/2015/04/10/giay-nike-511881-023.jpg",
                }}
                style={{
                  width: 104,
                  height: 110,
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                }}
              />
              <View>
                <Text style={styles.inforProduct}>
                  Giầy thể thao Nike Roshe nam 511881-023
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <View style={{ width: "25%" }}>
                    <Text style={styles.inforProduct}>Màu: Xám</Text>
                    <Text style={styles.inforProduct}>Kích cỡ: L</Text>
                    <Text style={styles.inforProduct}>Số lượng: 100K</Text>
                  </View>
                  <View style={{ width: "75%", paddingTop: 5 }}>
                    <Text style={styles.inforProduct}>
                      Thành tiền: 700.000 đ
                    </Text>
                    <Text style={styles.inforProduct}>
                      Tổng tiền phải trả: 700.000 đ
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 15,
                width: "100%",
                height: 110,
                backgroundColor: "#CCCCCC",
                flexDirection: "row",
                borderRadius: 5,
              }}
            >
              <Image
                source={{
                  uri: "https://s.meta.com.vn/img/thumb.ashx/Data/image/2015/04/10/giay-nike-511881-023.jpg",
                }}
                style={{
                  width: 104,
                  height: 110,
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                }}
              />
              <View>
                <Text style={styles.inforProduct}>
                  Giầy thể thao Nike Roshe nam 511881-023
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <View style={{ width: "25%" }}>
                    <Text style={styles.inforProduct}>Màu: Xám</Text>
                    <Text style={styles.inforProduct}>Kích cỡ: L</Text>
                    <Text style={styles.inforProduct}>Số lượng: 100K</Text>
                  </View>
                  <View style={{ width: "75%", paddingTop: 5 }}>
                    <Text style={styles.inforProduct}>
                      Thành tiền: 700.000 đ
                    </Text>
                    <Text style={styles.inforProduct}>
                      Tổng tiền phải trả: 700.000 đ
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      <View
        style={{
          width: "100%",
          height: 50,
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          position: "relative",
          top: -10,
        }}
      >
        <Pressable
          onPress={() => {
            hanldeBackHome();
          }}
          style={[styles.border, { borderColor: "orange", height: 50 }]}
        >
          <Text
            style={[styles.txt, { backgroundColor: "white", color: "orange" }]}
          >
            Quay lại
          </Text>
        </Pressable>
        <Pressable style={[styles.border, { borderColor: "gray" }]}>
          <Text
            style={[styles.txt, { backgroundColor: "orange", color: "white" }]}
          >
            Xác nhận
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CpnOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: 750,
  },
  vOrder: {
    width: "100%",
    height: 150,
    backgroundColor: "#00CC99",
  },
  txtContent: {
    color: "white",
    paddingStart: 10,
    paddingTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    width: "55%",
  },
  iconn: {
    position: "absolute",
    right: 25,
    top: 45,
  },
  inforShipping: {
    width: "100%",
    height: 500,
  },
  linhtinh: {
    paddingStart: 10,
    flexDirection: "row",
  },
  txtInfor: {
    width: "100%",
    height: 35,
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "300",
  },
  inforProduct: {
    width: 300,
    paddingTop: 5,
    paddingLeft: 4,
    fontStyle: "normal",
    fontWeight: "400",
    color: "black",
  },
  border: {
    borderWidth: 1,
    width: "49%",
  },
  txt: {
    textAlign: "center",
    paddingTop: 15,
    fontSize: 19,
    width: "100%",
    height: "100%",
  },
});
