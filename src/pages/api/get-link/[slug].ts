import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query.slug;

  if (!slug || typeof slug !== 'string') {
    res.status(404).json({ message: 'please provide a correct slug' });
    return;
  }

  const data = await prisma.url.findFirst({
    where: {
      shortUrl: {
        equals: slug,
      },
    },
  });

  if (!data) {
    res.status(404).json({ message: 'short link not found' });
    return;
  }

  await prisma.url.update({
    where: {
      shortUrl: slug,
    },
    data: { numberOfVisits: data.numberOfVisits + 1 },
  });

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=1000000000, stale-while-revalidate');

  res.json(data);
};
