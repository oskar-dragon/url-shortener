import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from 'next/head';
import { LinksHeader } from 'features/links';
import createTableDummyData from 'features/links/helpers/createTableDummyData';
// import { trpc } from 'utils';

function Dashboard() {
  // const { data } = trpc.shortLink.getAllForUser.useQuery();
  const dummyData = createTableDummyData(10);

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
