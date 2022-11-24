import { trpc } from 'utils';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

function Dashboard() {
  const { data } = trpc.private.useQuery();

  return <div>dashboard</div>;
}

export default withPageAuthRequired(Dashboard);
