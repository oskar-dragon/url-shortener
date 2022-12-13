import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Input } from 'components/elements';
import Head from 'next/head';
import { LinksHeader } from 'features/links';

function Dashboard() {
  // const { data } = trpc.shortLink.getAllForUser.useQuery();

  return (
    <>
      <Head>
        <title>Short.ly - Links</title>
      </Head>
      <div>
        <LinksHeader />
        <Input leftAddon="test" rightAddon="test" placeholder="text" name="test" id="test" />
      </div>
    </>
  );
}

export default withPageAuthRequired(Dashboard);
