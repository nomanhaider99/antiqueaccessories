"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { CartItem } from "@/lib/cart";
import { getCart } from "@/lib/cart";

type CartContextType = {
  cart: CartItem[];
  refresh: () => void;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  refresh: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const refresh = () => {
    setCart(getCart());
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <CartContext.Provider value={{ cart, refresh }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
