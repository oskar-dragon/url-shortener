import { TRPCError } from '@trpc/server';
import { generateSlug, shortenerValidation } from 'features/shortener';
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

    const newSlug = await generateShortUrl();

    const createdUrlWithRandomSlug = await prisma.url.create({
      data: { shortUrl: newSlug, longUrl: url },
    });

    return createdUrlWithRandomSlug;

    // Check if slug is provided
    // If it is, check if already exist in a DB
    // If it isn't, create
    // If it is, return an error

    // If slug is not provided
    // Generate a random one and check if it already exists
    // If it does, generate a new one and check again

    // Save in a database.
  }),
});
