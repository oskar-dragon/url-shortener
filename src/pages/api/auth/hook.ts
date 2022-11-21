import { prisma } from 'server/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, secret } = req.body;

  console.log(req.body);
  // 1.
  if (req.method !== 'POST') {
    return res.status(403).json({ message: 'Method not allowed' });
  }

  // 2.
  if (secret !== process.env.AUTH0_HOOK_SECRET) {
    console.log('???');
    return res.status(403).json({ message: `You must provide the secret 🤫` });
  }

  console.log('fail');

  if (email && typeof email === 'string') {
    console.log(email);
    await prisma.user.create({
      data: { email },
    });

    return res.status(200).json({
      message: `User with email: ${email} has been created successfully!`,
    });
  }

  return res.status(500).json({
    message: `Something went wrong!`,
  });
}

export default handler;
