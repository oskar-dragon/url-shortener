import ShortenerForm from 'features/shortener/components/shortenerForm/ShortenerForm';

export default function Home() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="mt-16">
        <h1 className="text-9xl font-bold text-center">
          Link shortener{' '}
          <span>
            for <span className="text-indigo-700">Engineers</span>
          </span>
        </h1>
        <h4 className="text-2xl font-semibold max-w-[20rem] text-center mx-auto my-7">
          Shorten, personalize, share and easy to remember URLs.
        </h4>
      </div>
      <div className="flex-shrink-0 w-full max-w-sm shadow bg-base-100">
        <div className="py-4 px-6">
          <ShortenerForm />
        </div>
      </div>
    </div>
  );
}
