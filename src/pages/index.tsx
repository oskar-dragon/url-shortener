import { Form, FormInput } from 'components';
import { Button } from 'components/elements';
import { z } from 'zod';

const formData = z.object({
  firstName: z.string().min(1).max(18),
  lastName: z.string().min(1).max(18),
});

type FormSchemaType = typeof formData;

type FormFields = z.infer<FormSchemaType>;

const defaultValues: FormFields = {
  firstName: 'Oskar',
  lastName: 'Dragon',
};

export default function Home() {
  return (
    <div className="max-w-xl mx-auto bg-base-200 rounded-md py-4 px-6 flex flex-col">
      <h1 className="text-white text-5xl font-bold text-center">Link shortener</h1>

      <Form<FormFields>
        defaultValues={defaultValues}
        onSubmit={() => console.log('submitted')}
        schema={formData}
      >
        <div className="flex flex-col gap-4">
          <FormInput
            name="longurl"
            id="longurl"
            label="Long url"
            placeholder="Enter your long url"
          />
          <FormInput
            name="shorturl"
            id="shorturl"
            label="Alias"
            placeholder="enter your alias"
            className="max-w-xs"
          />
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </div>
  );
}
