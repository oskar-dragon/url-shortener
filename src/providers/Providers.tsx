import { UserProvider } from '@auth0/nextjs-auth0';
import type { ReactNode } from 'react';

type ProvidersProps = {
  children: ReactNode;
};

function Providers({ children }: ProvidersProps) {
  return <UserProvider>{children}</UserProvider>;
}

export default Providers;
