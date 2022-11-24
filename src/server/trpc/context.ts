/* eslint-disable @typescript-eslint/return-await */
import { getSession } from '@auth0/nextjs-auth0';
import type { inferAsyncReturnType } from '@trpc/server';
import type * as trpcNext from '@trpc/server/adapters/next';

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext({ req, res }: trpcNext.CreateNextContextOptions) {
  const session = getSession(req, res);

  return {
    session,
  };
  // for API-response caching see https://trpc.io/docs/caching
}

export type Context = inferAsyncReturnType<typeof createContext>;
