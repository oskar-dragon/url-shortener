import { useState } from 'react';
import { Button } from 'components/elements';
import { PlusIcon } from '@heroicons/react/24/outline';
import addLinkSchema, { type AddDetailedLinkSchema } from 'features/links/types/addLinkForm';
import { FormInput, MultiSelect } from 'components';
import { trpc } from 'utils';
import FormModal from '../formModal/FormModal';

function LinksHeader() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutate, isLoading } = trpc.shortLink.create.useMutation();
  const categories = trpc.categories.getAllCategories.useQuery(undefined, {
    select: (data) => data.map(({ id: value, name: label }) => ({ value, label })),
  });

  function handleOpenAddLinkModal() {
    setIsOpen(true);
  }

  function handleCloseAddLinkModal() {
    setIsOpen(false);
  }

  function handleLinkSubmit(formData: AddDetailedLinkSchema) {
    mutate(formData, { onSuccess: handleCloseAddLinkModal });
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
                isDisabled={isLoading}
              />
              <FormInput
                leftAddon="http://"
                placeholder="google.com"
                label="Link"
                id="url"
                name="url"
                isDisabled={isLoading}
              />
              <FormInput
                label="Name"
                placeholder="Google"
                id="name"
                name="name"
                isDisabled={isLoading}
              />
              {categories.isSuccess && (
                <MultiSelect
                  isDisabled={isLoading}
                  label="Category"
                  options={categories.data}
                  id="categories"
                  name="categories"
                />
              )}
            </div>
          </div>
        </FormModal>
      </div>
    </div>
  );
}

export default LinksHeader;
