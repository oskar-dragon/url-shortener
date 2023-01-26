import { useState } from 'react';
import toast from 'react-hot-toast';
import { ConfirmationModal, Form, FormInput } from 'components';
import { Button } from 'components/elements';
import type { ShortenerFormFields } from 'features/shortener/types/shortenerForm';
import { shortenerUrlOnly } from 'features/shortener/types/shortenerForm';
import { trpc } from 'client';
import { getOrigin } from 'utils';
import { copyToClipboard } from 'helpers';
import { useForm } from 'hooks';

function ShortenerForm(): JSX.Element {
  const { mutate, isLoading } = trpc.shortLink.createRandom.useMutation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalUrl, setModalUrl] = useState<string>('');

  const form = useForm({
    schema: shortenerUrlOnly,
  });

  function updateForm(formData: ShortenerFormFields) {
    mutate(formData, {
      onError: () => toast.error('Sorry. Something went wrong. Try again later.'),
      onSuccess: (data) => {
        setModalUrl(`${getOrigin()}/${data.shortUrl}`);
        setIsModalOpen(false);
        toast.success('Link has been successfully updated');
      },
    });
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setModalUrl('');
  }

  function handleCopyAndCloseModal() {
    copyToClipboard(modalUrl);
    handleCloseModal();
  }
  return (
    <Form form={form} onSubmit={(data) => updateForm(data)}>
      <div className="w-full flex flex-col md:flex-row md:items-start gap-4">
        <FormInput
          name="url"
          id="url"
          placeholder="Enter your long url"
          className="flex-initials"
        />
        <Button variant="dark" type="submit" isDisabled={isLoading} className="">
          {isLoading ? 'Saving...' : 'Shorten'}
        </Button>

        <ConfirmationModal
          title="Link created"
          body={`Your shortened link has been created: ${modalUrl}`}
          isOpen={isModalOpen}
          primaryActionText="Copy and close"
          secondaryActionText="Close"
          primaryAction={() => handleCopyAndCloseModal()}
          secondaryAction={() => handleCloseModal()}
        />
      </div>
    </Form>
  );
}

export default ShortenerForm;
