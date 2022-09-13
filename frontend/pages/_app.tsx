import { createTheme, NextUIProvider } from '@nextui-org/react';
import React, { useContext, useState } from 'react';
import { Header } from '../components/Header';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import './index.css';
import AppContext, { AppContextProvider } from '../contexts/context';

const lightTheme = createTheme({
  type: 'light',
});

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      heroColor: '#ff4ecd',
      link: '#ff4ecd',
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <NextThemesProvider
        defaultTheme="system"
        attribute="class"
        value={{
          light: lightTheme.className,
          dark: darkTheme.className,
        }}
      >
        <NextUIProvider theme={darkTheme}>
          <div>
            <Header />
            <Component {...pageProps} />
          </div>
        </NextUIProvider>
      </NextThemesProvider>
    </AppContextProvider>
  );
}

export default MyApp;
