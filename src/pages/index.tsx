import { AnimatedText } from 'features/shortener';
import ShortenerForm from 'features/shortener/components/shortenerForm/ShortenerForm';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Short.ly</title>
      </Head>
      <div className="max-w-xl mx-auto">
        <div className="mt-8 sm:mt-16">
          <h1 className="text-6xl font-bold text-center md:text-9xl md:font-bold">
            Link shortener{' '}
            <span>
              for{' '}
              <AnimatedText
                sequence={[
                  'texting',
                  5000,
                  'engineers',
                  5000,
                  'designers',
                  4000,
                  'youtubers',
                  4000,
                  'marketing',
                  4000,
                ]}
                speed={1}
                repeat={Infinity}
                className="text-indigo-700"
              />
            </span>
          </h1>
          <h4 className="text-xl md:text-2xl font-semibold max-w-[20rem] text-center mx-auto my-7">
            Shorten, personalize and share easy to remember URLs.
          </h4>
        </div>
      </div>
      <div className="sm:mt-20 mx-auto max-w-3xl shadow-2xl bg-base-100 rounded-md">
        <div className="py-4 px-6">
          <ShortenerForm />
        </div>
      </div>
    </>
  );
}
