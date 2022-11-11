/* eslint-disable react/no-unknown-property */
import '../styles/global.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout/Layout';
import { trpc } from '../utils/trpc';

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default trpc.withTRPC(App);
