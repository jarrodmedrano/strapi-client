import { NextUIProvider } from '@nextui-org/react';
import React from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextUIProvider>
        <div
          className="bgImage"
          style={{
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(255,255,255,0.5)',
              width: '100%',
            }}
          >
            <Component {...pageProps} />
          </div>
        </div>
      </NextUIProvider>
    </>
  );
}

export default MyApp;
