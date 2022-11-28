import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import type { Context } from './context';

export const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/v10/data-transformers
   */
  transformer: superjson,
  /**
   * @see https://trpc.io/docs/v10/error-formatting
   */
  errorFormatter({ shape }) {
    return shape;
  },
});

// TODO: Create private procedure
