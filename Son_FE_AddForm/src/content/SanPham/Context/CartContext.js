import React, { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = useCallback((product) => {
    setCart(prevCart => [...prevCart, product]);
  }, []);

  const removeFromCart = useCallback((index) => {
    setCart(prevCart => {
      const updatedCart = [...prevCart];
      updatedCart.splice(index, 1);
      return updatedCart;
    });
  }, []);
  

  const toggleCart = useCallback(() => {
    setIsCartOpen(prevIsCartOpen => !prevIsCartOpen);
  }, [isCartOpen]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, isCartOpen, toggleCart, clearCart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
