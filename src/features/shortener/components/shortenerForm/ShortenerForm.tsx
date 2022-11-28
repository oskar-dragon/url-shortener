import { useState } from 'react';
import toast from 'react-hot-toast';
import { Form, FormInput, Modal } from 'components';
import { Button } from 'components/elements';
import type { ShortenerFormFields } from 'features/shortener/types/shortenerForm';
import { shortenerUrlOnly } from 'features/shortener/types/shortenerForm';
import { trpc } from 'utils/trpc';
import { getOrigin } from 'utils';
import { copyToClipboard } from 'helpers';

function ShortenerForm(): JSX.Element {
  const { mutate, isLoading } = trpc.shortLink.createRandom.useMutation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalUrl, setModalUrl] = useState<string>('');

  function updateForm(formData: ShortenerFormFields) {
    mutate(formData, {
      onError: () => toast.error('Sorry. This alias has already been used. Try a different one'),
      onSuccess: (data) => {
        setModalUrl(`${getOrigin()}/${data.shortUrl}`);
        setIsModalOpen(true);
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
    <Form<ShortenerFormFields> onSubmit={(data) => updateForm(data)} schema={shortenerUrlOnly}>
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
