import { useDeleteLinkModalStore } from 'features/links/stores';
import { ConfirmationModal } from 'components';
import { trpc } from 'client';

function DeleteLinkConfirmationModal() {
  const { isOpen, close, id } = useDeleteLinkModalStore((state) => state);
  const utils = trpc.useContext();
  const { mutate } = trpc.shortLink.deleteOne.useMutation({
    onSuccess() {
      close();
      utils.shortLink.getAllForUser.invalidate();
    },
  });

  function handleDelete() {
    mutate({ slug: id });
  }

  return (
    <ConfirmationModal
      body="Are you sure that you want to delete this link?"
      title="Delete link"
      variant="error"
      isOpen={isOpen}
      secondaryActionText="Cancel"
      secondaryAction={close}
      primaryAction={() => handleDelete()}
      primaryActionText="Confirm"
    />
  );
}

export default DeleteLinkConfirmationModal;
