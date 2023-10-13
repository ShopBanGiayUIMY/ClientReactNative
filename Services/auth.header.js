import AsyncStorage from "@react-native-async-storage/async-storage";

export default function authHeader() {
  return AsyncStorage.getItem('accesstoken')
    .then(userData => {
      if (userData) {
        const user = JSON.parse(userData);
        return { token: 'Bearer ' + user };
      } else {
        return {};
      }
    })
    .catch(error => {
      console.error("Error retrieving user data from AsyncStorage:", error);
      return {};
    });
}
