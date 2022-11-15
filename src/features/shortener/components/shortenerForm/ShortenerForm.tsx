import { useState } from 'react';
import toast from 'react-hot-toast';
import { Form, FormInput, Modal } from 'components';
import { Button } from 'components/elements';
import type { ShortenerFormFields } from 'features/shortener/types/shortenerForm';
import { shortenerValidation } from 'features/shortener/types/shortenerForm';
import { trpc } from 'utils/trpc';
import { getOrigin } from 'utils';

function ShortenerForm(): JSX.Element {
  const { mutate, isLoading } = trpc.shortLink.create.useMutation();
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

  return (
    <Form<ShortenerFormFields> onSubmit={(data) => updateForm(data)} schema={shortenerValidation}>
      <div className="flex flex-col gap-4">
        <FormInput name="url" id="url" label="Long url" placeholder="Enter your long url" />
        <FormInput
          name="slug"
          id="slug"
          label="Alias"
          placeholder="enter your alias"
          className="max-w-xs"
        />
        <Button className="mt-4" type="submit" isDisabled={isLoading}>
          {isLoading ? 'Saving...' : 'Make your link shorter'}
        </Button>

        <Modal
          title="Your URL has been successfully saved"
          body={`Your URL: ${modalUrl}`}
          isOpen={isModalOpen}
          onClose={() => handleCloseModal()}
        />
      </div>
    </Form>
  );
}

export default ShortenerForm;
