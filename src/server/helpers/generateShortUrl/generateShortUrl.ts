import { generateSlug } from 'features/shortener';
import { prisma } from 'server/prisma';

async function generateShortUrl(): Promise<string> {
  const slug = generateSlug();

  const slugAlreadyExists = await prisma.url.findUnique({
    where: {
      shortUrl: slug,
    },
  });

  if (slugAlreadyExists) {
    generateShortUrl();
  }

  return slug;
}

export default generateShortUrl;
