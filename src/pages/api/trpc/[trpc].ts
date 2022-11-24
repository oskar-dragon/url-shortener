import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '../../../server/routes/_app';
import { createContext } from 'server/trpc';
import logger from 'server/utils/logger';
// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  onError({ error }) {
    logger.error('Error:', error);
  },
});
