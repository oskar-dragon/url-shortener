/* eslint-disable @typescript-eslint/return-await */
import type * as trpc from '@trpc/server';

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner() {
  return {};
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(): Promise<Context> {
  // for API-response caching see https://trpc.io/docs/caching

  return await createContextInner();
}
