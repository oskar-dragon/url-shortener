import { useDeleteLinkModalStore } from 'features/links/stores';
import { ConfirmationModal } from 'components';
import { trpc } from 'client';
import { toast } from 'react-hot-toast';

function DeleteLinkConfirmationModal() {
  const { isOpen, close, id } = useDeleteLinkModalStore((state) => state);
  const utils = trpc.useContext();
  const { mutate } = trpc.shortLink.deleteOne.useMutation({
    onSuccess() {
      close();
      toast.success('Link has been successfully deleted');
      utils.shortLink.getAllForUser.invalidate();
    },
    onError() {
      toast.error("Sorry, we couldn't delete this link. Please try again");
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
