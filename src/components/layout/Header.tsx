import { useRouter } from 'next/router';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Private } from 'components';
import { Button } from 'components/elements';
import Avatar from './Avatar';
import Navigation from './Navigation';

function Header() {
  const router = useRouter();

  function redirectToSignIn() {
    router.push('/api/auth/login');
  }

  return (
    <header className="flex-initial">
      <Disclosure as="nav" className="bg-base-100 shadow">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 ease-in-out text-neutral-500 hover:bg-neutral-800 hover:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-200">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <h3 className="hidden text-2xl font-semibold w-auto lg:block">Short.ly</h3>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      <Navigation />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <Private
                    privateComponent={<Avatar />}
                    publicComponenet={
                      <Button variant="blue" size="sm" onClick={() => redirectToSignIn()}>
                        Sign in
                      </Button>
                    }
                  />
                </div>
              </div>
            </div>
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-2 bg-neutral-100">
                <Navigation />
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  );
}

export default Header;
