import { TRPCError } from '@trpc/server';
import { prisma } from 'server/prisma';
import { router, publicProcedure } from 'server/trpc';
import { z } from 'zod';

export const shortLinkRouter = router({
  create: publicProcedure
    .input(
      z.object({
        url: z.string().url(),
        slug: z.string().max(7),
      }),
    )
    .mutation(async ({ input }) => {
      const url = await prisma.url.findUnique({
        where: {
          shortUrl: input.slug,
        },
      });

      if (url) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Already exists',
        });
      }

      console.log(input.slug, input.url);

      const createdUrl = await prisma.url.create({
        data: { shortUrl: input.slug, longUrl: input.url },
      });

      return createdUrl;
    }),
});
