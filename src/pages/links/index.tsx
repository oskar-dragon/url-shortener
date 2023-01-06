import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from 'next/head';
import { LinksHeader } from 'features/links';

function Dashboard() {
  return (
    <>
      <Head>
        <title>Short.ly - Links</title>
      </Head>
      <div>
        <LinksHeader />
      </div>
    </>
  );
}

export default withPageAuthRequired(Dashboard);
