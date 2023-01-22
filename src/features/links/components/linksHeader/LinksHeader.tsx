import { Button, Divider } from 'components/elements';
import { PlusIcon } from '@heroicons/react/24/outline';
import addLinkSchema, { type AddDetailedLinkSchema } from 'features/links/types/addLinkForm';
import { FormInput, MultiSelect } from 'components';
import { trpc } from 'utils';
import { useAddLinkModalStore } from 'features/links/stores';
import FormModal from '../formModal/FormModal';

function LinksHeader() {
  const isModalOpen = useAddLinkModalStore((state) => state.isOpen);
  const openModal = useAddLinkModalStore((state) => state.open);
  const closeModal = useAddLinkModalStore((state) => state.close);
  const utils = trpc.useContext();

  const { mutate, isLoading } = trpc.shortLink.create.useMutation({
    onSuccess() {
      closeModal();
      utils.shortLink.getAllForUser.invalidate();
    },
  });

  const categories = trpc.categories.getAllCategories.useQuery(undefined, {
    select: (data) => data.map(({ id: value, name: label }) => ({ value, label })),
  });

  function handleLinkSubmit(formData: AddDetailedLinkSchema) {
    mutate(formData);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-between align-top">
      <div>
        <span>
          <h1 className="text-2xl sm:text-3xl font-semibold">Links</h1>
        </span>
        <p className="text-sm sm:text-base text-neutral-500">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div>
        <Button variant="dark" leftIcon={<PlusIcon />} onClick={() => openModal()}>
          Add
        </Button>

        <FormModal
          schema={addLinkSchema}
          isOpen={isModalOpen}
          title="Add Link"
          description="Provide all necessary information to create a link"
          onSubmitText="Create Link"
          onCancelText="Cancel"
          onSubmit={(data) => handleLinkSubmit(data)}
          onCancel={() => closeModal()}
        >
          <div>
            <div className="space-y-6 mb-4">
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
              <Divider />
              {categories.isSuccess && (
                <MultiSelect
                  placeholder="Type to pick a category"
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
