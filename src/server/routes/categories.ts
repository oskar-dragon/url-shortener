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

    return categories;
  }),
});
