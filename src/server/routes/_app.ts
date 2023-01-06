import { router } from '../trpc';
import { categoriesRouter } from './categories';
import { shortLinkRouter } from './shortLink';

// TODO: Add routes here
export const appRouter = router({
  shortLink: shortLinkRouter,
  categories: categoriesRouter,
});

export type AppRouter = typeof appRouter;
