import { requiredDocs } from "../data";

type NeededFromClientProps = {
  onViewRequirements: () => void;
};

export function NeededFromClient({ onViewRequirements }: NeededFromClientProps) {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="mt-2 text-lg font-semibold sm:text-xl">Needed from Client</p>
        </div>
        <button
          type="button"
          onClick={onViewRequirements}
          className="rounded-xl border border-slate-200 bg-[#152c58] px-3 py-2 text-sm font-medium text-slate-100 hover:bg-slate-900"
        >
          View all requirements
        </button>
      </div>

      <div className="space-y-3">
        {requiredDocs.map((doc) => (
          <div key={doc.label} className="flex items-center justify-between gap-3">
            <div>
              <p className="font-medium text-slate-800">{doc.label}</p>
            </div>
            <span
              className={`inline-flex px-0 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                doc.tone === "green"
                  ? "text-emerald-600"
                  : doc.tone === "red"
                    ? "text-[#da0101]"
                    : doc.tone === "amber"
                      ? "text-amber-600"
                      : "text-slate-600"
              }`}
            >
              {doc.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
