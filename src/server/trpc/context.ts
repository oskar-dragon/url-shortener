import { getSession, type Session } from '@auth0/nextjs-auth0';
import type { PrismaClient } from '@prisma/client';
import { prisma } from 'server/prisma';
import type { inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */

type CreateContextOptions = {
  session: Session | null | undefined;
  prisma: PrismaClient;
};

export function createContextInner(opts: CreateContextOptions) {
  return opts;
}

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext({ req, res }: CreateNextContextOptions) {
  const session = getSession(req, res);

  return createContextInner({
    session,
    prisma,
  });
  // for API-response caching see https://trpc.io/docs/caching
}

export type Context = inferAsyncReturnType<typeof createContext>;
