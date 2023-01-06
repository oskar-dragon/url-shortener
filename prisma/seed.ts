import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  'Design',
  'Product',
  'Marketing',
  'Personal',
  'Work',
  'Programming',
  'Movies',
  'Other',
].map((category) => ({
  name: category,
}));

async function main() {
  const result = await prisma.category.createMany({
    data: categories,
    skipDuplicates: true,
  });

  console.log(result);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
