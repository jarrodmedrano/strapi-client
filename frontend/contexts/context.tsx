/* /context/AppContext.js */

import React, { ReactNode } from 'react';
// create auth context with default value

import { useState } from 'react';

export const useAppContext = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [user, setUser] = useState(false);

  const addItem = (item) => {
    const { items, total } = cart;
    const foundItem = items.find((i) => i.id === item.id);

    if (!foundItem) {
      let temp = JSON.parse(JSON.stringify(item));
      temp.quantity = 1;
      var newCart = {
        items: [...items, temp],
        total: total + item.price,
      };
      setCart(newCart);
      console.log(`Total items: ${JSON.stringify(newCart)}`);
    }
  };

  const removeItem = () => {};

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

interface AppContextInterface {
  isAuthenticated: boolean;
  cart: {
    items: any[];
    total: number;
  };
  setCart: React.Dispatch<React.SetStateAction<any>>;
  addItem: (item: any) => void;
  removeItem: () => void;
  user: boolean;
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
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
