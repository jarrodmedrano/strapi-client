/* /context/AppContext.js */

import Cookie from 'js-cookie';
import localforage from 'localforage';
import React, { ReactNode, useEffect, useState } from 'react';
// create auth context with default value

import { User } from '../pages/api/auth/login';
import { Cart, CartItem } from '../schemas/cart';

export const useAppContext = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
  });
  const [user, setUser] = useState<User>();
  const { items, total } = cart;

  const addItem = async (item: CartItem) => {
    const foundItem: CartItem | undefined = items.find((i) => i.id === item.id);

    if (!foundItem) {
      const temp = JSON.parse(JSON.stringify(item));
      temp.quantity = 1;

      try {
        const result = await localforage.setItem('cart', {
          items: [...items, temp],
          total: total + 1,
        });
        setCart(result);
      } catch (err) {
        // This code runs if there were any errors.
      }
    } else {
      const filtered: CartItem[] = items.filter((i) => i.id !== item.id);
      const temp = JSON.parse(JSON.stringify(item));
      temp.quantity = foundItem.quantity + 1;
      const newCart = {
        items: [...filtered, temp],
        total: total + 1,
      };
      try {
        const result = await localforage.setItem('cart', newCart);
        setCart(result);
      } catch (err) {
        // This code runs if there were any errors.
      }
    }
  };

  const logout = () => {
    Cookie.remove('token');
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    delete window.__user;
    window.localStorage.setItem('logout', Date.now().toString());
    setUser(undefined);
  };

  const removeItem = async (item: CartItem) => {
    const foundItem = items.find((i: CartItem) => i?.id === item?.id);

    if (foundItem) {
      const filteredCart = items.filter(() => item?.id !== foundItem.id);
      const newTotal = total - item.price;

      if (foundItem?.quantity > 1) {
        const updatedItem = { ...foundItem };
        updatedItem.quantity -= 1;

        try {
          const newCart: Cart = {
            items: [...filteredCart, updatedItem],
            total: newTotal,
          };
          const result = await localforage.setItem('cart', newCart);
          setCart(result);
        } catch (err) {
          // This code runs if there were any errors.
        }
      } else {
        const result = await localforage.setItem('cart', {
          items: [...filteredCart],
          total: newTotal,
        });
        setCart(result);
      }
    }
  };

  const getCart: () => void = async () => {
    try {
      const result = await localforage.getItem('cart');
      if (!result) {
        setCart({
          items: [],
          total: 0,
        });
      } else {
        setCart(result as Cart);
      }
    } catch (err) {
      console.log('some error', err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const newCart = await getCart();
      console.log('new cart', newCart);
    };

    fetchData().catch(console.error);
  }, []);

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
    getCart,
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
  getCart: () => void;
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
