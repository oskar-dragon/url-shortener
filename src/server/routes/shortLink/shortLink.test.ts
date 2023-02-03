import type { PrismaClient } from '@prisma/client';
import { createContextInner } from 'server/trpc/context';
import { mockDeep, mockFn } from 'vitest-mock-extended';
import type generateShortUrl from 'server/helpers/generateShortUrl/generateShortUrl';
import type { inferProcedureInput } from '@trpc/server';
import type { AppRouter } from '../_app';
import { appRouter } from '../_app';

type CreateRandomInput = inferProcedureInput<AppRouter['shortLink']['createRandom']>;

describe('Route > shortLink', () => {
  const mocks = {
    prisma: mockDeep<PrismaClient>(),
    generateShortUrl: mockFn<typeof generateShortUrl>(),
  };
  const ctx = createContextInner({ session: null, prisma: mocks.prisma });
  const caller = appRouter.createCaller(ctx);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('createRandom > creates a random link ', async () => {
    const mockedOutput = 'rndmals';
    mocks.generateShortUrl.mockResolvedValue(mockedOutput);

    const mockedPrismaOutput = {
      shortUrl: 'test',
      active: true,
      dateCreated: 1 as any,
      longUrl: '',
      dateUpdated: 1 as any,
      name: null,
      numberOfVisits: 0,
      userId: null,
    };

    mocks.prisma.url.create.mockResolvedValue(mockedPrismaOutput);

    const input: CreateRandomInput = {
      url: 'http://google.com',
    };

    const result = await caller.shortLink.createRandom(input);
    expect(result).toStrictEqual(mockedPrismaOutput);
  });

  test('createRandom > throws an exception when slug already exists', async () => {
    const mockedOutput = 'rndmals';
    mocks.generateShortUrl.mockResolvedValue(mockedOutput);

    const mockedPrismaOutput = {
      shortUrl: 'test',
      active: true,
      dateCreated: 1 as any,
      longUrl: '',
      dateUpdated: 1 as any,
      name: null,
      numberOfVisits: 0,
      userId: null,
    };

    mocks.prisma.url.create.mockRejectedValue(mockedPrismaOutput);

    const input: CreateRandomInput = {
      url: 'http://google.com',
    };

    await expect(caller.shortLink.createRandom(input)).rejects.toThrow('Something went wrong');

    test.only('getAllForUser > returns categories', () => {
      
    });
  });
});
