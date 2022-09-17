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
    identifier: string;
  };
}

export const registerUser: (
  identifier: string,
  email: string,
  password: string
) => Promise<Response> = async (
  identifier: string,
  email: string,
  password: string
) => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    const { data } = await axios.post(`${API_URL}/auth/local/register`, {
      identifier,
      email,
      password,
    });
    Cookie.set('token', data.jwt);
    Router.push('/');
    return data;
  } catch (err) {}
};

export const login: (
  identifier: string,
  password: string
) => Promise<Response> = async (identifier: string, password: string) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const { data } = await axios.post(`${API_URL}/auth/local`, {
      identifier,
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
