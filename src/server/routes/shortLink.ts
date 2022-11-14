import { TRPCError } from '@trpc/server';
import { shortenerValidation } from 'features/shortener';
import generateShortUrl from 'server/helpers/generateShortUrl/generateShortUrl';
import { prisma } from 'server/prisma';
import { router, publicProcedure } from 'server/trpc';

export const shortLinkRouter = router({
  create: publicProcedure.input(shortenerValidation).mutation(async ({ input }) => {
    const { url, slug } = input;

    if (slug) {
      const urlInDB = await prisma.url.findUnique({
        where: {
          shortUrl: input.slug,
        },
      });

      if (urlInDB) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Already exists',
        });
      }

      const createdUrlWIthDefinedSlug = await prisma.url.create({
        data: { shortUrl: slug, longUrl: url },
      });

      return createdUrlWIthDefinedSlug;
    }

    // TODO: Refactor this function so it makes only one DB call
    const newSlug = await generateShortUrl();

    const createdUrlWithRandomSlug = await prisma.url.create({
      data: { shortUrl: newSlug, longUrl: url },
    });

    return createdUrlWithRandomSlug;
  }),
});
