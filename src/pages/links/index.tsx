import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from 'next/head';
import { LinksHeader } from 'features/links';
// import { trpc } from 'utils';
import { Checkbox } from 'components';
import { useState } from 'react';

function Dashboard() {
  // const { data } = trpc.shortLink.getAllForUser.useQuery();

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
