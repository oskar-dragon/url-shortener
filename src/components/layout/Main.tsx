import Header from './Header';

function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-auto max-w-7xl py-6 sm:px-6 lg:px-8 px-4 container mx-auto">
        {children}
      </main>
    </div>
  );
}

export default Main;
