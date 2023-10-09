import React,{useEffect} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthStatus,AuthProvider } from './Services/AuthContext';
import AppNavigator from './AppNavigator';

const App = () => {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
};

const MainApp = () => {
  const { dispatch } = AuthStatus();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        if (isLoggedIn === 'true') {
          const user = await AsyncStorage.getItem('user_id');
          dispatch({ type: 'LOGIN', payload: JSON.parse(user) });
          alert('Trạng thái lưu tài khoản thành công');
        }
      } catch (error) {
        console.error('Error reading data from AsyncStorage:', error);
      }
    };

    checkLoginStatus();
  }, []); 

  return (
    <AppNavigator />
  );
};

export default App;
