import TabbedNavigation from './tabbed-navigation';
import { KilnOverview } from './sections/kiln-overview';
import { PotteryProjects } from './sections/pottery-projects';
import { StudioOverview } from './sections/studio-overview';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/api/auth/signin?callbackUrl=/admin');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true, name: true },
  });

  if (!user || user.role !== 'admin') {
    redirect('/');
  }

  const tabs = [
    { id: 'studio', label: 'Studio', content: <StudioOverview /> },
    { id: 'kiln', label: 'Kiln', content: <KilnOverview /> },
    { id: 'pottery', label: 'Pottery', content: <PotteryProjects /> },
  ];

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-wide text-slate-500">Admin</p>
        <h2 className="text-2xl font-semibold">Control center</h2>
        <p className="text-sm text-slate-600">
          Manage your studio profile, kiln records, and pottery projects with quick actions.
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Welcome back</p>
            <p className="text-sm text-slate-700">{user?.name ?? 'Admin user'}</p>
          </div>
          <div className="rounded-md bg-white px-3 py-2 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
            Role: Admin access enforced
          </div>
        </div>
      </div>

      <TabbedNavigation tabs={tabs} />
    </section>
  );
}
