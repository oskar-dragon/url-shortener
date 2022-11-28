import { TRPCError } from '@trpc/server';
import { t } from './trpc';
import logger from '../utils/logger';

export const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.session?.user?.email) {
    logger.error({ message: 'Unauthorized' });
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    });
  }

  return next({
    ctx: {
      session: ctx.session,
    },
  });
});
