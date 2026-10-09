import { recentUpdates } from "../data";

export function RecentUpdates() {
  return (
    <div className="rounded-2xl bg-white p-6">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
        Recent Updates
      </p>

      <div className="mt-4">
        {recentUpdates.map((update, index) => (
          <div key={update.text} className="relative pl-6">
            {index !== recentUpdates.length - 1 && (
              <div className="absolute left-[7px] top-0 h-full w-px bg-slate-200" />
            )}
            <div className="absolute left-0 h-4 w-4 rounded-full bg-[#08244a] shadow-sm" />
            <div className="pb-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                <p className="text-sm text-slate-700">{update.text}</p>
                <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                  {update.age}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
