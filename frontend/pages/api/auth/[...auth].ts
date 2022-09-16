/* /lib/auth.js */

// import { useEffect } from 'react';
import Router from 'next/router';
import Cookie from 'js-cookie';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';

interface Response {
  jwt: string;
  user: {
    id: number;
    username: string;
  };
}

export const registerUser: (
  username: string,
  email: string,
  password: string
) => Promise<Response> = async (
  username: string,
  email: string,
  password: string
) => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    const { data } = await axios.post(`${API_URL}/auth/local/register`, {
      username,
      email,
      password,
    });
    Cookie.set('token', data.jwt);
    Router.push('/');
    return data;
  } catch (err) {}
};

export const login: (
  username: string,
  password: string
) => Promise<Response> = async (username: string, password: string) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const { data } = await axios.post(`${API_URL}/auth/local`, {
      username,
      password,
    });
    Cookie.set('token', data.jwt);
    Router.push('/');

    return data;
  } catch (err) {}
};

export const logout = () => {
  Cookie.remove('token');
  delete window['__user'];
  window.localStorage.setItem('logout', Date.now().toString());
  Router.push('/');
};
