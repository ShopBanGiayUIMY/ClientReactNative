import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthStatus, AuthProvider } from "./Services/AuthContext";
import AppNavigator from "./AppNavigator";
import useAuth from "./Services/auth.services";
import { Provider } from "react-redux";
import { store } from "./Services/Redux/store";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </Provider>
  );
};

const MainApp = () => {

  const { InfoAuth, getTotalCart } = useAuth();
  const { dispatch } = AuthStatus();
  
  const fetchData = async () => {
    try {
      const data = await InfoAuth();
      const result = await getTotalCart();
  
      //

      if (result) {
        dispatch({ type: "INFOCART", payload: result });
      }
      if (data) {
        dispatch({ type: "USERINFO", payload: data });
      }
    } catch (error) {
      console.error("Error fetching data1:", error);
    }
  };
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
        if (isLoggedIn === "true") {
          fetchData();
          const user = await AsyncStorage.getItem("user_id");
          dispatch({ type: "LOGIN", payload: JSON.parse(user) });
        }
      } catch (error) {
        console.error("Error reading data from AsyncStorage:", error);
      }
    };

    checkLoginStatus();
  }, []);

  return <AppNavigator />;
};

export default App;
