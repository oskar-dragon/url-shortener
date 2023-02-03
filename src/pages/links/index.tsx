import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from 'next/head';
import {
  DeleteLinkConfirmationModal,
  EditLinkFormModal,
  LinksHeader,
  LinksTable,
} from 'features/links';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { appRouter } from 'server/routes/_app';
import { createContext } from 'server/trpc';
import SuperJSON from 'superjson';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import type { GetServerSidePropsContext } from 'next';

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const ssgHelper = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContext({ req, res } as CreateNextContextOptions),
    transformer: SuperJSON,
  });

  await ssgHelper.shortLink.getAllForUser.prefetch();

  return { props: { trpcState: ssgHelper.dehydrate() } };
}

function Dashboard() {
  return (
    <>
      <Head>
        <title>Short.ly - Links</title>
      </Head>
      <div>
        <LinksHeader />
        <LinksTable />
        <EditLinkFormModal />
        <DeleteLinkConfirmationModal />
      </div>
    </>
  );
}

export default withPageAuthRequired(Dashboard);
