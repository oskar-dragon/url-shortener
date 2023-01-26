import React from 'react';
import toast from 'react-hot-toast';
import type { UserProfile } from '@auth0/nextjs-auth0';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Button } from 'components/elements';

type ProfileProps = { user: UserProfile };

export default function Profile({ user }: ProfileProps): React.ReactElement {
  return (
    <>
      <h1>Profile</h1>

      <Button onClick={() => toast.loading('Loading')}>Loading</Button>
      <Button onClick={() => toast.success('Success Long Text')}>Success</Button>
      <Button onClick={() => toast.error('Error Long text')}>Error</Button>
      <Button onClick={() => toast('Default Long Text')}>Default</Button>

      <div>
        <h4>Profile (server rendered)</h4>
        <pre data-testid="profile">{JSON.stringify(user, null, 2)}</pre>
      </div>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired();
