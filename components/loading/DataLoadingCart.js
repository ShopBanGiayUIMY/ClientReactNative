import React, { useState, useEffect } from "react";
import useAuth from "../../Services/auth.services";
import { AuthStatus } from "../../Services/AuthContext";
const DataLoadingCart = () => {
  const { getTotalCart } = useAuth();
  const { dispatch } = AuthStatus();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getTotalCart();

        if (result) {
          dispatch({ type: "INFOCART", payload: result });
        }
      } catch (error) {
        console.error("Error fetching data2:", error);
      }
    };
    fetchData();
  }, []);

  return null;
};

export default DataLoadingCart;
