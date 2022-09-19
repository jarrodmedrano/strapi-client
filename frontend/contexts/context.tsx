/* /context/AppContext.js */

// import { useEffect } from 'react';
import Router from 'next/router';
import Cookie from 'js-cookie';
import axios from 'axios';

import React, { ReactNode, SetStateAction } from 'react';
// create auth context with default value

import { useState } from 'react';
import { User } from '../pages/api/auth/login';
import { CartItem } from '../schemas/cart';

export const useAppContext = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState<{ items: CartItem[]; total: number }>({
    items: [],
    total: 0,
  });
  const [user, setUser] = useState<User>();
  const { items, total } = cart;

  const addItem = (item: CartItem) => {
    const foundItem = items.find((i) => i.id === item.id);

    if (!foundItem) {
      let temp = JSON.parse(JSON.stringify(item));
      temp.quantity = 1;
      var newCart = {
        items: [...items, temp],
        total: total + item.price,
      };
      setCart(newCart);
    }
  };

  const logout = () => {
    Cookie.remove('token');
    //@ts-ignore
    delete window.__user;
    window.localStorage.setItem('logout', Date.now().toString());
    setUser(undefined);
  };

  const removeItem = (item: CartItem) => {
    const foundItem = items.find((i: CartItem) => i.id === item.id);

    if (foundItem) {
      const filteredCart = items.filter(
        (item: CartItem) => item.id !== foundItem.id
      );
      const newTotal = total - item.price;

      if (foundItem?.quantity > 1) {
        const updatedItem = { ...foundItem };
        updatedItem.quantity = updatedItem.quantity - 1;

        setCart({
          items: [...filteredCart, updatedItem],
          total: newTotal,
        });
      } else {
        setCart({
          items: [...filteredCart],
          total: newTotal,
        });
      }
    }
  };

  return {
    isAuthenticated,
    setIsAuthenticated,
    cart,
    setCart,
    user,
    setUser,
    addItem,
    removeItem,
    logout,
  };
};

interface AppContextInterface {
  isAuthenticated: boolean;
  cart: {
    items: any[];
    total: number;
  };
  setCart: React.Dispatch<React.SetStateAction<any>>;
  addItem: (item: any) => void;
  removeItem: (item: any) => void;
  user?: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
}

const AppContext = React.createContext<AppContextInterface>(
  {} as AppContextInterface
);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const value = useAppContext();

  return (
    <AppContext.Provider value={{ ...value }}>{children}</AppContext.Provider>
  );
};

export default AppContext;
