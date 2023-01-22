import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from 'next/head';
import { LinksHeader, LinksTable } from 'features/links';

function Dashboard() {
  return (
    <>
      <Head>
        <title>Short.ly - Links</title>
      </Head>
      <div>
        <LinksHeader />

        <LinksTable />
      </div>
    </>
  );
}

export default withPageAuthRequired(Dashboard);
