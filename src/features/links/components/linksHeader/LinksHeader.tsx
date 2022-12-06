import { Button } from 'components/elements';
import { PlusIcon } from '@heroicons/react/24/outline';

function LinksHeader() {
  return (
    <div>
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold">Links</h1>
        <p className="text-base sm:text-xl text-neutral-500">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div>
        <Button leftIcon={<PlusIcon />}>Add</Button>
      </div>
    </div>
  );
}

export default LinksHeader;
