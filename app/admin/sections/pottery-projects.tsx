export async function PotteryProjects() {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-slate-500">Pottery</p>
          <h3 className="text-lg font-semibold text-slate-900">Project pipeline</h3>
          <p className="text-sm text-slate-600">
            Plan, track, and review pottery projects from greenware to glaze firings.
          </p>
        </div>
        <button className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500">
          Add project
        </button>
      </div>

      <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">
        No pottery projects are in the pipeline yet. Add a project to start tracking stages and firing logs.
      </div>
    </div>
  );
}
