import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { TRPCError } from '@trpc/server';
import { addDetailedLinkSchema } from 'features/links';
import { shortenerUrlOnly } from 'features/shortener';
import generateShortUrl from 'server/helpers/generateShortUrl/generateShortUrl';
import { prisma } from 'server/prisma';
import { router, publicProcedure, privateProcedure } from 'server/trpc';
import logger from 'server/utils/logger';
import { z } from 'zod';

export const shortLinkRouter = router({
  createRandom: publicProcedure.input(shortenerUrlOnly).mutation(async ({ input }) => {
    const { url } = input;

    try {
      const randomSlug = await generateShortUrl();

      const createdUrlWithRandomSlug = await prisma.url.create({
        data: { shortUrl: randomSlug, longUrl: url },
      });

      return createdUrlWithRandomSlug;
    } catch (err) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Something went wrong' });
    }
  }),
  create: privateProcedure.input(addDetailedLinkSchema).mutation(async ({ input, ctx }) => {
    const { user } = ctx.session;
    const { url, slug, name, categories } = input;

    let alias = slug as string;

    if (!slug) {
      alias = await generateShortUrl();
    }

    const urlInDB = await prisma.url.findUnique({
      where: {
        shortUrl: alias,
      },
    });

    if (urlInDB) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Already exists',
      });
    }

    const categoryIds = categories?.map(({ value: categoryId }) => ({
      categoryId,
    }));

    if (categoryIds) {
      const createdUrlWIthCategories = await prisma.url.create({
        data: {
          shortUrl: alias,
          longUrl: url,
          name,
          userId: user.email,
          categories: {
            createMany: {
              data: categoryIds,
            },
          },
        },
      });

      return createdUrlWIthCategories;
    }

    const createdUrlWithoutCategories = await prisma.url.create({
      data: {
        shortUrl: alias,
        longUrl: url,
        name,
        userId: user.email,
      },
    });

    return createdUrlWithoutCategories;
  }),
  getAllForUser: privateProcedure.query(async ({ ctx }) => {
    const { user } = ctx.session;

    try {
      const urls = await prisma.url.findMany({
        where: {
          userId: user.email,
        },
      });

      if (!urls) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'URLs not found' });
      }

      return urls;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new TRPCError({ code: 'NOT_FOUND', message: "URL doesn't exist" });
        }
      }

      return err;
    }
  }),
  removeOne: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { slug } = input;

      try {
        await prisma.url.delete({
          where: {
            shortUrl: slug,
          },
        });

        return;
      } catch (err) {
        logger.error(err);
        if (err instanceof PrismaClientKnownRequestError) {
          if (err.code === 'P2025') {
            throw new TRPCError({ code: 'NOT_FOUND', message: "URL doesn't exist" });
          }
        }

        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Something went wrong' });
      }
    }),
});
