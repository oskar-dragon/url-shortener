import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from 'next/head';
import { LinksHeader } from 'features/links';
import { Switch } from 'components';

function Dashboard() {
  // const { data } = trpc.shortLink.getAllForUser.useQuery();

  return (
    <>
      <Head>
        <title>Short.ly - Links</title>
      </Head>
      <div>
        <LinksHeader />
        <Switch size="md" label="Airplane mode" />
        {/* <FormModal
          isOpen={!!'test'}
          title="Add Link"
          description="Provide all necessary information to create a link"
          onSubmitText="Create Link"
          onCancelText="Cancel"
        >
          Testing
        </FormModal> */}
      </div>
    </>
  );
}

export default withPageAuthRequired(Dashboard);
