import { useState } from 'react';
import toast from 'react-hot-toast';
import { Form, FormInput, Modal } from 'components';
import { Button } from 'components/elements';
import type { ShortenerFormFields } from 'features/shortener/types/shortenerForm';
import { shortenerValidation } from 'features/shortener/types/shortenerForm';
import { trpc } from 'utils/trpc';
import { getOrigin } from 'utils';
import { useUser } from '@auth0/nextjs-auth0';
import { copyToClipboard } from 'helpers';

function ShortenerForm(): JSX.Element {
  const { user } = useUser();
  const { mutate, isLoading } = trpc.shortLink.create.useMutation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalUrl, setModalUrl] = useState<string>('');

  const email = user?.email ?? undefined;

  function updateForm(formData: ShortenerFormFields) {
    mutate(
      {
        ...formData,
        email,
      },
      {
        onError: () => toast.error('Sorry. This alias has already been used. Try a different one'),
        onSuccess: (data) => {
          setModalUrl(`${getOrigin()}/${data.shortUrl}`);
          setIsModalOpen(true);
        },
      },
    );
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
    <Form<ShortenerFormFields> onSubmit={(data) => updateForm(data)} schema={shortenerValidation}>
      <div className="flex flex-col gap-4">
        <FormInput name="url" id="url" label="Long url" placeholder="Enter your long url" />
        <FormInput name="slug" id="slug" label="Alias" placeholder="Enter your alias" />
        <Button variant="blue" className="mt-4" type="submit" isDisabled={isLoading}>
          {isLoading ? 'Saving...' : 'Shorten link'}
        </Button>

        <Modal
          title="Link created"
          body={`Your shortened link has been created: ${modalUrl}`}
          isOpen={isModalOpen}
          firstAction={() => handleCopyAndCloseModal()}
          secondAction={() => handleCloseModal()}
        />
      </div>
    </Form>
  );
}

export default ShortenerForm;
