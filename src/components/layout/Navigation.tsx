import Private from 'components/private/Private';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { classNames } from 'utils';

const navigation = [
  { name: 'Home', href: '/', private: false },
  { name: 'Dashboard', href: '/dashboard', private: true },
];

function Navigation() {
  const router = useRouter();

  return (
    <>
      {navigation.map((item) => {
        if (item.private) {
          return (
            <Private
              key={item.name}
              privateComponent={
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    router.asPath === item.href
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-sm font-medium',
                  )}
                >
                  {item.name}
                </Link>
              }
            />
          );
        }

        return (
          <Link
            key={item.name}
            href={item.href}
            className={classNames(
              router.asPath === item.href
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block px-3 py-2 rounded-md text-sm font-medium',
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </>
  );
}

export default Navigation;
