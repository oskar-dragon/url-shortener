import { useUser } from '@auth0/nextjs-auth0';
import { Button } from 'components/elements';
import ShortenerForm from 'features/shortener/components/shortenerForm/ShortenerForm';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { user, isLoading } = useUser();

  function redirectToSignup() {
    router.push('/api/auth/login');
  }
  return (
    !isLoading && (
      <div className="hero max-w-xl lg:max-w-4xl mx-auto bg-base-200 rounded-md shadow-xl py-6 px-8">
        <div className="hero-content flex-col lg:flex-row-reverse ">
          <div className="text-center lg:text-left lg:pl-8">
            <h1 className="text-white text-5xl font-bold">Link shortener</h1>
            <p className="py-2">
              Provide the following details to make your link shorter and easier to remember
            </p>
            {!user && (
              <div className="hidden lg:block space-y-3 py-9">
                <p className="font-bold text-white">Create free account and enjoy:</p>
                <ul className="list-none">
                  <li>Link history</li>
                  <li>Customized TinyURLs</li>
                </ul>
                <Button onClick={() => redirectToSignup()} className="btn-secondary">
                  Sign up for free!
                </Button>
              </div>
            )}
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <ShortenerForm />
            </div>
          </div>
        </div>
      </div>
    )
  );
}
