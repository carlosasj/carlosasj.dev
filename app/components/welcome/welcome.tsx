export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <div className="max-w-[300px] w-full space-y-6 px-4">
          <a
            href="https://github.com/carlosasj"
            target="_blank"
            className="font-medium text-fg-brand hover:underline"
          >
            github.com/carlosasj
          </a>
        </div>
        <div className="max-w-[300px] w-full space-y-6 px-4">
          <a
            href="https://www.linkedin.com/in/carlosasj"
            target="_blank"
            className="font-medium text-fg-brand hover:underline"
          >
            linkedin.com/in/carlosasj
          </a>
        </div>
      </div>
    </main>
  );
}

export const Layout: React.FC<React.PropsWithChildren<void>> = ({
  children,
}) => {
  return (
    <div className="table">
      <nav>
        <button>Print</button>
      </nav>
      <main className="page">{children}</main>
    </div>
  );
};
