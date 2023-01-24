import { TRPCError } from '@trpc/server';
import { prisma } from 'server/prisma';
import { privateProcedure, router } from 'server/trpc';

export const categoriesRouter = router({
  getAllCategories: privateProcedure.query(async () => {
    const categories = await prisma.category.findMany({
      select: {
        name: true,
        id: true,
      },
    });

    if (!categories) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'No categories' });
    }

    return categories;
  }),
});
