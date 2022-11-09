import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { prisma } from '../prisma';

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
});

export type AppRouter = typeof appRouter;
