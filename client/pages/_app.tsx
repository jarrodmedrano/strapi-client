import { createTheme, Grid, NextUIProvider } from '@nextui-org/react';
import React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import './index.css';
import { SessionProvider } from 'next-auth/react';

import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { Session } from 'next-auth';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AppContextProvider } from '../contexts/context';
import { Header } from '../components/Header';

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

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: {
  Component: React.FC;
  pageProps: { session: Session };
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';
  const link = new HttpLink({ uri: `${API_URL}/graphql` });
  const cache = new InMemoryCache();
  const client = new ApolloClient({ link, cache });
  const stripePromise = loadStripe('pk_test_sxCvm0SIbCpjRfffcuCf2CFH');

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
                <Grid.Container gap={2} justify="center">
                  <Grid xs={12} md={6}>
                    <Elements stripe={stripePromise}>
                      <Component {...pageProps} />
                    </Elements>
                  </Grid>
                </Grid.Container>
              </div>
            </ApolloProvider>
          </NextUIProvider>
        </NextThemesProvider>
      </AppContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
