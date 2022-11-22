import type { Session } from '@auth0/nextjs-auth0';
import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import { Prisma } from '@prisma/client';
import { prisma } from 'server/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import logger from 'server/utils/logger';

const afterCallback = async (req: NextApiRequest, res: NextApiResponse, session: Session) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { email, name, updated_at } = session.user;

  if (email && typeof email === 'string') {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        await prisma.user.create({
          data: { email, name, updatedAt: updated_at },
        });
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          logger.info(
            'There is a unique constraint violation, a new user cannot be created with this email',
          );
        }
      }
    }
  }

  logger.info(`User with email: ${email} has been created successfully!`);

  return session;
};

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error.message);
      }
    }
  },
});
