/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem('kelvornex_cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
      console.error("Error reading cart from localStorage:", e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kelvornex_cart', JSON.stringify(cart));
    } catch (e) {
      console.error("Error saving cart to localStorage:", e);
    }
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      // Avoid duplicate items in the cart
      const exists = prevCart.some((cartItem) => cartItem.id === item.id);
      if (exists) return prevCart;
      return [...prevCart, item];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.length;
  const cartTotal = cart.reduce((total, item) => total + (item.price || 0), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
