import React, { createContext, useState, useContext, useEffect } from "react";
import SummaryApi from "../common/API";

const CartContext = createContext();

export const CartProvider = ({ children, userId }) => {
  const [cartCount, setCartCount] = useState(0);

  const countCartProducts = async () => {
    if (userId) {
      const apiResponse = await fetch(`${SummaryApi.countCart.url}/${userId}`, {
        method: SummaryApi.countCart.method,
        credentials: "include",
      });

      const responseData = await apiResponse.json();

      if (responseData.success) {
        setCartCount(responseData.data.length);
      }
    }
  };

  useEffect(() => {
    countCartProducts();
  }, [userId]);

  return (
    <CartContext.Provider value={{ cartCount, countCartProducts }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
