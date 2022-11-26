import { trpc } from 'utils';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Button } from 'components/elements';

function Dashboard() {
  const { data } = trpc.shortLink.getAllForUser.useQuery();
  const { mutate } = trpc.shortLink.removeOne.useMutation();

  console.log(data);

  return (
    <div>
      <Button className="btn-primary" onClick={() => mutate({ slug: 'rvs' })}>
        Remove
      </Button>
    </div>
  );
}

export default withPageAuthRequired(Dashboard);
