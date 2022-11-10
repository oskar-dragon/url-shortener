import Header from './Header';

function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full">
      <Header />
      <main>{children}</main>
      <footer>footer</footer>
    </div>
  );
}

export default Main;
