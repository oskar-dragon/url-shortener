import { Button } from 'components/elements';
import ShortenerForm from 'features/shortener/components/shortenerForm/ShortenerForm';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  function redirectToSignup() {
    router.push('/api/auth/login');
  }
  return (
    <div className="max-w-xl lg:max-w-4xl mx-auto border rounded-md shadow-sm py-6 px-8">
      <div className="flex-col lg:flex-row-reverse ">
        <div className="text-center lg:text-left lg:pl-8">
          <h1 className="text-5xl font-bold">Link shortener</h1>
          <p className="py-2">
            Provide the following details to make your link shorter and easier to remember
          </p>
        </div>
        <div className="flex-shrink-0 w-full max-w-sm shadow bg-base-100">
          <div className="py-4 px-6">
            <ShortenerForm />
          </div>
        </div>
      </div>
    </div>
  );
}
