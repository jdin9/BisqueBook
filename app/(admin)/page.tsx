export default function AdminHomePage() {
  return (
    <section className="space-y-4">
      <div>
        <p className="text-sm text-slate-500">Welcome back</p>
        <h2 className="text-xl font-semibold">Control center</h2>
      </div>
      <p className="max-w-2xl text-sm text-slate-600">
        Use the navigation to manage admin features. Authentication is powered by NextAuth with
        Prisma and ready-to-wire email/SSO providers backed by your Postgres database.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-semibold text-slate-800">Identity</h3>
          <p className="text-sm text-slate-600">
            Configure email magic links and SSO providers via environment variables to secure portal
            access.
          </p>
        </article>
        <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-semibold text-slate-800">Data</h3>
          <p className="text-sm text-slate-600">
            Connect to Supabase or Neon Postgres using Prisma for a streamlined data layer.
          </p>
        </article>
      </div>
    </section>
  );
}
