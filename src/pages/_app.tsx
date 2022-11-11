/* eslint-disable react/no-unknown-property */
import '../styles/global.css';
import type { AppProps } from 'next/app';
import { Inter } from '@next/font/google';
import Layout from '../components/layout/Layout';
import { trpc } from '../utils/trpc';

const inter = Inter();

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default trpc.withTRPC(App);
