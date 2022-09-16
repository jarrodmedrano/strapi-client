import { createTheme, NextUIProvider } from '@nextui-org/react';
import React, { useContext, useState } from 'react';
import { Header } from '../components/Header';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import './index.css';
import AppContext, { AppContextProvider } from '../contexts/context';
import { SessionProvider } from 'next-auth/react';

import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

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

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
  console.log(`URL: ${API_URL}`);
  const [query, setQuery] = useState('');
  const link = new HttpLink({ uri: `${API_URL}/graphql` });
  const cache = new InMemoryCache();
  const client = new ApolloClient({ link, cache });

  return (
    <SessionProvider session={session}>
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
            <ApolloProvider client={client}>
              <div>
                <Header />
                <Component {...pageProps} />
              </div>
            </ApolloProvider>
          </NextUIProvider>
        </NextThemesProvider>
      </AppContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
