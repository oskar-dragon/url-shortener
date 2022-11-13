import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { prisma } from '../prisma';
import { shortLinkRouter } from './shortLink';

// TODO: Add routes here
export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string().nullish(),
      }),
    )
    .query(async ({ input }) => {
      const test = await prisma.url.findMany();

      return {
        greeting: `hello ${input?.text ?? 'world'}`,
        urls: test,
      };
    }),
  shortLink: shortLinkRouter,
});

export type AppRouter = typeof appRouter;
