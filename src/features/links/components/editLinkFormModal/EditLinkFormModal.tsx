import { FormInput, MultiSelect } from 'components';
import { Divider } from 'components/elements';
import {
  editDetailedLinkFormSchema,
  type EditDetailedLinkFormValues,
} from 'features/links/constants';
import { useEditLinkModalStore } from 'features/links/stores';
import { trpc } from 'utils';
import FormModal from '../formModal/FormModal';

function EditLinkFormModal() {
  const isModalOpen = useEditLinkModalStore((state) => state.isOpen);
  const modalId = useEditLinkModalStore((store) => store.modalId);
  const closeModal = useEditLinkModalStore((state) => state.close);
  const { mutate, isLoading } = trpc.shortLink.updateOne.useMutation();

  function handleLinkUpdate(formData: EditDetailedLinkFormValues) {
    mutate({ ...formData, active: true, slug: modalId });
  }

  const categories = trpc.categories.getAllCategories.useQuery(undefined, {
    select: (data) => data.map(({ id: value, name: label }) => ({ value, label })),
  });

  return (
    <FormModal
      schema={editDetailedLinkFormSchema}
      isOpen={isModalOpen}
      title="Edit link"
      description="Make all necessary changes for this alias."
      onSubmitText="Save changes"
      onCancelText="Cancel"
      onSubmit={(data) => handleLinkUpdate(data)}
      onCancel={() => closeModal()}
    >
      <div>
        <div className="space-y-6 mb-4">
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
  );
}

export default EditLinkFormModal;
