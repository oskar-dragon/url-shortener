import { TRPCError } from '@trpc/server';
import { publicProcedure, router } from 'server/trpc';

export const categoriesRouter = router({
  getAllCategories: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.prisma.category.findMany({
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
