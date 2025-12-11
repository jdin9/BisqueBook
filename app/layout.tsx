import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'BisqueBook Admin Portal',
  description: 'Administrative portal shell with authentication hooks.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8">
          <header className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Admin Portal</p>
              <h1 className="text-2xl font-semibold">BisqueBook</h1>
            </div>
            <nav aria-label="Primary navigation">
              <ul className="flex items-center gap-4 text-sm font-medium">
                <li>
                  <Link href="/" className="text-slate-700 transition hover:text-slate-950">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/users" className="text-slate-700 transition hover:text-slate-950">
                    Users
                  </Link>
                </li>
                <li>
                  <Link href="/settings" className="text-slate-700 transition hover:text-slate-950">
                    Settings
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <main className="flex-1 rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
            {children}
          </main>
          <footer className="mt-6 text-xs text-slate-500">Secured workspace for internal teams.</footer>
        </div>
      </body>
    </html>
  );
}
