import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import Head from 'next/head';
import { LinksHeader } from 'features/links';
import { SearchDropdown } from 'components';

function Dashboard() {
  // const { data } = trpc.shortLink.getAllForUser.useQuery();

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  return (
    <>
      <Head>
        <title>Short.ly - Links</title>
      </Head>
      <div>
        <LinksHeader />
        <SearchDropdown options={options} />
      </div>
    </>
  );
}

export default withPageAuthRequired(Dashboard);
