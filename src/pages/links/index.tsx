import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from 'next/head';
import { LinksHeader } from 'features/links';
import { MultiSelect, Switch } from 'components';
import { useState } from 'react';

const test = [
  { value: 123, label: 'test1' },
  { value: 'test2', label: 'test2' },
  { value: 'test3', label: 'test3' },
  { value: 'test4', label: 'test4' },
  { value: 'test5', label: 'test5' },
  { value: 'test6', label: 'test6' },
  { value: 'test8', label: 'test8' },
  { value: 'test9', label: 'test9' },
  { value: 'test410', label: 'test410' },
];

type Test = typeof test;

function Dashboard() {
  // const { data } = trpc.shortLink.getAllForUser.useQuery();
  const [selectedValues, setSelectedValues] = useState<Test>(test);

  console.log({ selectedValues });

  function handleSelect(data: Test) {
    setSelectedValues(data);
  }

  return (
    <>
      <Head>
        <title>Short.ly - Links</title>
      </Head>
      <div>
        <LinksHeader />
        <Switch size="md" label="Airplane mode" />
        <MultiSelect label="Category" options={test} onSelect={(data) => handleSelect(data)} />
      </div>
    </>
  );
}

export default withPageAuthRequired(Dashboard);
