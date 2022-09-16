/* /context/AppContext.js */

import React, { ReactNode } from 'react';
// create auth context with default value

import { useState } from 'react';

export const useAppContext = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [user, setUser] = useState(false);
  const { items, total } = cart;

  const addItem = (item) => {
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

  const removeItem = (item) => {
    const foundItem = items.find((i) => i.id === item.id);
    const filteredCart = items.filter((item) => item.id !== foundItem.id);
    const newTotal = total - item.price;

    if (foundItem.quantity > 1) {
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
  };
};

interface User {
  id: number;
  username: string;
}

interface AppContextInterface {
  isAuthenticated: boolean;
  cart: {
    items: any[];
    total: number;
  };
  setCart: React.Dispatch<React.SetStateAction<any>>;
  addItem: (item: any) => void;
  removeItem: (item: any) => void;
  user: boolean;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = React.createContext<AppContextInterface | null>(
  {} as AppContextInterface
);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const value = useAppContext();

  return (
    <AppContext.Provider value={{ ...value }}>{children}</AppContext.Provider>
  );
};

export default AppContext;
