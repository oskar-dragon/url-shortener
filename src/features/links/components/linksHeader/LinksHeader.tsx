import { Button } from 'components/elements';
import { PlusIcon } from '@heroicons/react/24/outline';

function LinksHeader() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between align-top">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold">Links</h1>
        <p className="text-base sm:text-xl text-neutral-500">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div>
        <Button variant="dark" leftIcon={<PlusIcon />}>
          Add
        </Button>
      </div>
    </div>
  );
}

export default LinksHeader;
