import { useUser } from '@auth0/nextjs-auth0';
import type { ReactNode } from 'react';

type PrivateProps = {
  publicComponenet?: ReactNode;
  privateComponent: ReactNode;
};

function Private({ privateComponent, publicComponenet }: PrivateProps) {
  const { user, isLoading } = useUser();

  const publicComp = publicComponenet || null;

  if (isLoading) return null;

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!user) return <>{publicComp}</>;

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{privateComponent}</>;
}

Private.defaultProps = {
  publicComponenet: null,
};

export default Private;
