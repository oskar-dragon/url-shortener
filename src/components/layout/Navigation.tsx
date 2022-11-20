import Link from 'next/link';
import { useRouter } from 'next/router';
import { classNames } from 'utils';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Dashboard', href: '/dashboard' },
];

function Navigation() {
  const router = useRouter();

  return (
    <>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={classNames(
            router.asPath === item.href
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'px-3 py-2 rounded-md text-sm font-medium',
          )}
        >
          {item.name}
        </Link>
      ))}
    </>
  );
}

export default Navigation;
