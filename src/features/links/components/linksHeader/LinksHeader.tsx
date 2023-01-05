import { useState } from 'react';
import { Button } from 'components/elements';
import { PlusIcon } from '@heroicons/react/24/outline';
import addLinkSchema, { type AddLinkSchemaType } from 'features/links/types/addLinkForm';
import { FormInput, MultiSelect } from 'components';
import FormModal from '../formModal/FormModal';

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

function LinksHeader() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleLinkSubmit(data: AddLinkSchemaType) {
    console.log(data);
  }

  function handleOpenAddLinkModal() {
    setIsOpen(true);
  }

  function handleCloseAddLinkModal() {
    setIsOpen(false);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between align-top">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold">Links</h1>
        <p className="text-sm sm:text-base text-neutral-500">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div>
        <Button variant="dark" leftIcon={<PlusIcon />} onClick={() => handleOpenAddLinkModal()}>
          Add
        </Button>

        <FormModal
          schema={addLinkSchema}
          isOpen={isOpen}
          title="Add Link"
          description="Provide all necessary information to create a link"
          onSubmitText="Create Link"
          onCancelText="Cancel"
          onSubmit={(data) => handleLinkSubmit(data)}
          onCancel={() => handleCloseAddLinkModal()}
        >
          <div>
            <div className="space-y-6">
              <FormInput
                leftAddon="short.ly/"
                label="Alias"
                placeholder="ggl"
                id="slug"
                name="slug"
              />
              <FormInput
                leftAddon="http://"
                placeholder="google.com"
                label="Link"
                id="url"
                name="url"
              />
              <FormInput label="Name" placeholder="Google" id="name" name="name" />
              <MultiSelect label="Category" options={test} id="category" name="category" />
            </div>
          </div>
        </FormModal>
      </div>
    </div>
  );
}

export default LinksHeader;
