import { FormInput, MultiSelect, Switch } from 'components';
import { Divider } from 'components/elements';
import {
  editDetailedLinkFormSchema,
  type EditDetailedLinkFormValues,
} from 'features/links/constants';
import { useEditLinkModalStore } from 'features/links/stores';
import { trpc } from 'client';
import FormModal from '../formModal/FormModal';

function EditLinkFormModal() {
  const isModalOpen = useEditLinkModalStore((state) => state.isOpen);
  const modalId = useEditLinkModalStore((store) => store.modalId);
  const closeModal = useEditLinkModalStore((state) => state.close);
  const utils = trpc.useContext();
  const uniqueUrl = trpc.shortLink.getOneForUser.useQuery(
    { slug: modalId },
    {
      select: ({ active, name, categories }) => ({
        active,
        name: name ?? '',
        categories: categories.map((category) => ({
          label: category.category.name,
          value: category.category.id,
        })),
      }),
      enabled: !!modalId,
    },
  );

  const { mutate, isLoading } = trpc.shortLink.updateOne.useMutation({
    onSuccess() {
      closeModal();
      utils.shortLink.getAllForUser.invalidate();
      utils.shortLink.getOneForUser.invalidate();
    },
  });
  const categories = trpc.categories.getAllCategories.useQuery(undefined, {
    select: (data) => data.map(({ id: value, name: label }) => ({ value, label })),
  });

  function handleLinkUpdate(formData: EditDetailedLinkFormValues) {
    mutate({ ...formData, slug: modalId });
  }

  return uniqueUrl.isSuccess ? (
    <FormModal
      schema={editDetailedLinkFormSchema}
      isOpen={isModalOpen}
      title="Edit link"
      description="Make all necessary changes for this alias."
      onSubmitText="Save changes"
      onCancelText="Cancel"
      onSubmit={(data) => handleLinkUpdate(data)}
      onCancel={() => closeModal()}
      defaultValues={uniqueUrl.data}
    >
      <div>
        <div className="space-y-6 mb-4">
          <Switch
            variant="dark"
            label="Active"
            supportText="Link will be accessible for everyone"
            name="active"
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
  ) : null;
}

export default EditLinkFormModal;
