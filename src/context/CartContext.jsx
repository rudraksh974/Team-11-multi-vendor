import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const sameRest = prev.length === 0 || prev[0].restaurantId === item.restaurantId;
      if (!sameRest) return prev;
      const idx = prev.findIndex((i) => i.id === item.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx].quantity += 1;
        return copy;
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => setCartItems((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setCartItems([]);
  const updateQty = (id, qty) =>
    setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));

  const total = cartItems.reduce((s, it) => s + it.price * it.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, updateQty, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
