import { trpc } from 'utils';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Button } from 'components/elements';
import Head from 'next/head';
import { LinksHeader } from 'features/links';

function Dashboard() {
  const { data } = trpc.shortLink.getAllForUser.useQuery();

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
