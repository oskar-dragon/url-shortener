import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { TRPCError } from '@trpc/server';
import { addDetailedLinkSchema } from 'features/links';
import { shortenerUrlOnly } from 'features/shortener';
import generateShortUrl from 'server/helpers/generateShortUrl/generateShortUrl';
import { prisma } from 'server/prisma';
import { updateDetailedLinkSchema } from 'server/schema';
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
    } catch (error) {
      logger.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Slug already exists. Please try a different one',
          });
        }
      }
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Something went wrong' });
    }
  }),
  create: privateProcedure.input(addDetailedLinkSchema).mutation(async ({ input, ctx }) => {
    const { user } = ctx.session;
    const { url, slug, name, categories } = input;

    try {
      let alias = slug as string;

      if (!slug) {
        alias = await generateShortUrl();
      }

      const categoryIds = categories?.map(({ value: categoryId }) => ({
        categoryId,
      }));

      if (categoryIds) {
        return await prisma.url.create({
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
      }

      return await prisma.url.create({
        data: {
          shortUrl: alias,
          longUrl: url,
          name,
          userId: user.email,
        },
      });
    } catch (error) {
      logger.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Slug already exists. Please try a different one',
          });
        }
      }
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Something went wrong' });
    }
  }),
  getAllForUser: privateProcedure.query(async ({ ctx }) => {
    const { user } = ctx.session;

    const urls = await prisma.url.findMany({
      where: {
        userId: user.email,
      },
      include: {
        categories: {
          include: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!urls) {
      return [];
    }

    const parsedUrls = urls.map((url) => {
      const { categories, userId, ...rest } = url;

      return {
        ...rest,
        categories: categories.map((category) => category.category.name),
      };
    });

    return parsedUrls;
  }),

  getOneForUser: privateProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input, ctx }) => {
      const { user } = ctx.session;

      const url = await prisma.url.findFirst({
        where: {
          shortUrl: input.slug,
          userId: user.email,
        },
        include: {
          categories: {
            include: {
              category: {
                select: {
                  name: true,
                  id: true,
                },
              },
            },
          },
        },
      });

      if (!url) {
        logger.error('Url not found');
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Url not found' });
      }

      return url;
    }),

  updateOne: privateProcedure.input(updateDetailedLinkSchema).mutation(async ({ input }) => {
    const { slug, name, active, categories } = input;

    const categoryIds = categories?.map(({ value: categoryId }) => ({
      categoryId,
    }));

    try {
      if (categoryIds) {
        await prisma.url.update({
          where: {
            shortUrl: slug,
          },
          data: {
            name,
            active,
            categories: {
              deleteMany: {
                urlId: slug,
              },
              createMany: {
                data: categoryIds,
              },
            },
          },
        });
      } else {
        await prisma.url.update({
          where: {
            shortUrl: slug,
          },
          data: {
            name,
            active,
          },
        });
      }
    } catch (error) {
      logger.error(error);
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Could not update a url' });
    }
  }),

  deleteOne: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { slug } = input;

      try {
        await prisma.categoriesOnUrls.deleteMany({
          where: {
            urlId: slug,
          },
        });

        await prisma.url.delete({
          where: {
            shortUrl: slug,
          },
        });
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
