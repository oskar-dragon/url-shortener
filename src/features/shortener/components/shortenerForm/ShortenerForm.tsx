import { Form, FormInput } from 'components';
import { Button } from 'components/elements';
import type { ShortenerFormFields } from 'features/shortener/types/shortenerForm';
import { shortenerValidation } from 'features/shortener/types/shortenerForm';
import { trpc } from 'utils/trpc';

function ShortenerForm(): JSX.Element {
  const { mutate } = trpc.shortLink.create.useMutation();

  return (
    <Form<ShortenerFormFields> onSubmit={(data) => mutate(data)} schema={shortenerValidation}>
      <div className="flex flex-col gap-4">
        <FormInput name="url" id="url" label="Long url" placeholder="Enter your long url" />
        <FormInput
          name="slug"
          id="slug"
          label="Alias"
          placeholder="enter your alias"
          className="max-w-xs"
        />
        <Button className="mt-4" type="submit">
          Make your link shorter
        </Button>
      </div>
    </Form>
  );
}

export default ShortenerForm;
