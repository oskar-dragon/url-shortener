import '../styles/global.css';
import type { AppProps } from 'next/app';
import { Toaster } from 'components';
import Providers from 'providers/Providers';
import Layout from '../components/layout/Layout';
import { trpc } from '../utils/trpc';

function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </Providers>
  );
}

export default trpc.withTRPC(App);
