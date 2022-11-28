import { router } from '../trpc';
import { shortLinkRouter } from './shortLink';

// TODO: Add routes here
export const appRouter = router({
  shortLink: shortLinkRouter,
});

export type AppRouter = typeof appRouter;
