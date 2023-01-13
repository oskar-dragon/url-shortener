import { faker } from '@faker-js/faker';
import { formatDate } from 'utils';

export type UrlData = {
  id: string;
  urlName: string;
  slug: string;
  status: 'active' | 'inactive';
  numberOfVisits: number;
  dateCreated: string;
  dateUpdated: string;
  categories: Array<string>;
};

function createTableDummyData(max: number): UrlData[] {
  return new Array(max).fill(null).map(() => ({
    id: faker.datatype.uuid(),
    urlName: faker.company.name(),
    slug: faker.lorem.word(5),
    status: faker.helpers.arrayElement(['active', 'inactive']),
    numberOfVisits: faker.datatype.number({ min: 10, max: 100000 }),
    dateCreated: formatDate(faker.date.past(), { dateStyle: 'medium' }),
    dateUpdated: formatDate(faker.date.past(), { dateStyle: 'medium' }),
    categories: faker.helpers.arrayElements(['Design', 'Personal', 'Test', 'Test2']),
  }));
}

export default createTableDummyData;
