import { t } from './trpc';
import { isAuthed } from './middleware';

export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuthed);
export const router = t.router;
