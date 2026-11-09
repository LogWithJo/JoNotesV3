import type { ReactNode } from 'react';

interface NotFoundPageProps {
  homeLink: ReactNode;
}

export function NotFoundPage({ homeLink }: NotFoundPageProps) {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-16">
      <section aria-labelledby="not-found-title">
        <p className="text-sm font-semibold text-muted-foreground">Error 404</p>
        <h1 id="not-found-title" className="mt-2 text-4xl font-bold tracking-tight">
          Page not found
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          The page you requested does not exist or may have moved.
        </p>
        <div className="mt-8 inline-flex rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background">
          {homeLink}
        </div>
      </section>
    </main>
  );
}
