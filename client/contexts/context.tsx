/* /context/AppContext.js */

import localforage from 'localforage';
import React, { ReactNode, useEffect, useState } from 'react';
import Cookie from 'js-cookie';
// create auth context with default value

import { User } from '../pages/api/auth/login';
import { Cart, CartItem } from '../schemas/cart';

export const useAppContext = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
  });
  const [user, setUser] = useState<User | undefined>();
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

  const logout = async () => {
    await localforage.setItem('logout', Date.now().toString());
    await localforage.setItem('user', null);
    Cookie.remove('token');
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

  const getCart: () => Promise<Cart | unknown> = async () => {
    const defaults = {
      items: [],
      total: 0,
    };
    try {
      const result = await localforage.getItem('cart');
      if (!result) {
        setCart(defaults);
      } else {
        setCart(result as Cart);
      }

      return result;
    } catch (err) {
      console.log('some error', err);
    }

    return defaults;
  };

  const getUser: () => Promise<User | unknown> = async () => {
    let defaults;
    try {
      const result = await localforage.getItem('user');
      if (!result) {
        setUser(defaults);
      } else {
        setUser(result as User);
      }

      return result;
    } catch (err) {
      console.log('some error', err);
    }

    return defaults;
  };

  useEffect(() => {
    const fetchData = async () => {
      const newCart = await getCart();

      return newCart;
    };

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const newUser = await getUser();

      return newUser;
    };

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await localforage.setItem('login', Date.now().toString());
      await localforage.setItem('user', user);
    };

    if (user) {
      fetchData().catch(console.error);
    }
  }, [user]);

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
    getUser,
  };
};

interface AppContextInterface {
  isAuthenticated: boolean;
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<any>>;
  addItem: (item: any) => void;
  removeItem: (item: any) => void;
  user?: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
  getCart: () => Promise<Cart | unknown>;
  getUser: () => Promise<User | unknown>;
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
