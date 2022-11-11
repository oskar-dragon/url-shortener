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
    <div className="max-w-xl mx-auto bg-base-200 rounded-md py-4 px-6">
      <Form<FormFields>
        defaultValues={defaultValues}
        onSubmit={() => console.log('submitted')}
        schema={formData}
      >
        <FormInput name="Oskar" id="Oskar" label="Name" />
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}
