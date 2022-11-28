import { cx } from 'class-variance-authority';
import Private from 'components/private/Private';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navigation = [
  { name: 'Home', href: '/', private: false },
  { name: 'Dashboard', href: '/dashboard', private: true },
];

const activeStyle = 'bg-neutral-900 text-white';
const inactiveStyle = 'text-black hover:bg-neutral-200';
const defaultStyle =
  'block px-2 py-1 rounded-md text-sm font-medium ease-in-out transition-all transition duration-200';

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
                  className={cx(
                    router.asPath === item.href ? activeStyle : inactiveStyle,
                    defaultStyle,
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
            className={cx(router.asPath === item.href ? activeStyle : inactiveStyle, defaultStyle)}
          >
            {item.name}
          </Link>
        );
      })}
    </>
  );
}

export default Navigation;
