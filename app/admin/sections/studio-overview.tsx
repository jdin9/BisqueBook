export async function StudioOverview() {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-wide text-slate-500">Studio</p>
          <h3 className="text-lg font-semibold text-slate-900">Studio profile</h3>
          <p className="text-sm text-slate-600">
            Add your studio name, location, and clay focus to unlock kiln and project tracking.
          </p>
        </div>
        <button className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500">
          Add studio profile
        </button>
      </div>

      <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">
        No studio profile exists yet. Capture your studio details to begin organizing equipment and projects.
      </div>
    </div>
  );
}
