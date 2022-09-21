import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';
import { CssBaseline } from '@nextui-org/react';
import Goog from '../components/Goog';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles]),
    };
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html lang="en">
        <Head>
          <Goog></Goog>
          {CssBaseline.flush()}
        </Head>
        <body>
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PVMDF6Q"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          ></noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
