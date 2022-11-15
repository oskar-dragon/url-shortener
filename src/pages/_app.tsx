import '../styles/global.css';
import type { AppProps } from 'next/app';
import { Toaster } from 'components';
import Layout from '../components/layout/Layout';
import { trpc } from '../utils/trpc';

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Toaster />
    </Layout>
  );
}

export default trpc.withTRPC(App);
