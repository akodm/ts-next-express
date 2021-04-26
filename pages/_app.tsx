import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import Head from 'next/head';

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

// add redux or recoil etc..

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Next.Js</title>
        <meta name="Next.js" content="description" />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;