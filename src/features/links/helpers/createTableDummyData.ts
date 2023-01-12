import { faker } from '@faker-js/faker';

type UrlData = {
  id: string;
  urlName: string;
  slug: string;
  status: 'active' | 'inactive';
  numberOfVisits: number;
  dateCreated: Date;
  dateUpdated: Date;
};

function createTableDummyData(max: number): UrlData[] {
  return new Array(max).fill(null).map(() => ({
    id: faker.datatype.uuid(),
    urlName: faker.company.name(),
    slug: faker.lorem.word(5),
    status: faker.helpers.arrayElement(['active', 'inactive']),
    numberOfVisits: faker.datatype.number({ min: 10, max: 100000 }),
    dateCreated: faker.date.past(),
    dateUpdated: faker.date.past(),
  }));
}

export default createTableDummyData;
