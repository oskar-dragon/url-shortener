import { cx } from 'class-variance-authority';
import Header from './Header';

type MainProps = {
  className?: string;
  children: React.ReactNode;
};

function Main({ className, children }: MainProps) {
  return (
    <div className={cx('min-h-screen flex flex-col', className)}>
      <Header />
      <main className="flex-auto max-w-7xl py-6 sm:px-6 lg:px-8 px-4 container mx-auto">
        {children}
      </main>
    </div>
  );
}

Main.defaultProps = {
  className: '',
};

export default Main;
