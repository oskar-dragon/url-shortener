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
    <div className="hero max-w-xl lg:max-w-4xl mx-auto bg-base-200 rounded-md shadow-xl py-6 px-8">
      <div className="hero-content flex-col lg:flex-row-reverse ">
        <div className="text-center lg:text-left lg:pl-8">
          <h1 className="text-white text-5xl font-bold">Link shortener</h1>
          <p className="py-2">
            Provide the following details to make your link shorter and easier to remember
          </p>
          <div className="hidden lg:block space-y-3 py-9">
            <p className="font-bold text-white">Create free account and enjoy:</p>
            <ul className="list-none">
              <li>Link history</li>
              <li>Customized TinyURLs</li>
            </ul>
            <Button className="btn-secondary">Sign up for free!</Button>
          </div>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
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
                <Button className="mt-4" type="submit">
                  Make your link shorter
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
