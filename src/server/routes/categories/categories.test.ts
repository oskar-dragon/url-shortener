import type { PrismaClient } from '@prisma/client';
import { createContextInner } from 'server/trpc/context';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import { appRouter } from '../_app';

describe('Route => categories', () => {
  const prismaMock = mockDeep<PrismaClient>();

  beforeEach(() => {
    mockReset(prismaMock);
  });
  test('returns categories', async () => {
    const mockOutput: any = [{ id: '1', name: '1' }];

    prismaMock.category.findMany.mockResolvedValue(mockOutput);

    const ctx = createContextInner({ session: null, prisma: prismaMock });
    const caller = appRouter.createCaller(ctx);

    const categories = await caller.categories.getAllCategories();

    expect(categories).toMatchObject(mockOutput);
    expect(categories).toHaveLength(1);
  });

  test('throws an exception when no categories found', async () => {
    const mockOutput: any = [];

    prismaMock.category.findMany(mockOutput);

    const ctx = createContextInner({ session: null, prisma: prismaMock });
    const caller = appRouter.createCaller(ctx);

    await expect(caller.categories.getAllCategories()).rejects.toThrow('No categories');
  });
});
