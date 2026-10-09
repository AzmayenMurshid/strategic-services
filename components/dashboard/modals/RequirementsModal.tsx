import { documentRequirements } from "../data";

type RequirementsModalProps = {
  onClose: () => void;
};

export function RequirementsModal({ onClose }: RequirementsModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-2 sm:p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[88vh] w-full max-w-xl overflow-hidden rounded-[5px] border border-slate-200 bg-white shadow-2xl sm:max-w-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 p-4 sm:p-6">
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500 sm:text-sm">
              Upload checklist
            </p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900 sm:text-2xl">
              Required and recommended documents
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close requirements popup"
          >
            ✕
          </button>
        </div>

        <div className="mt-0 max-h-[60vh] overflow-y-auto px-4 pb-4 sm:px-6 sm:pb-6">
          {documentRequirements.map((doc, index) => (
            <div key={doc.label} className="py-3 first:pt-0 last:pb-0">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="font-medium text-slate-800">{doc.label}</p>
                  <p className="mt-1 text-sm text-slate-600">{doc.note}</p>
                </div>
                <span
                  className={`shrink-0 self-start px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                    doc.type === "Required"
                      ? "text-[#da0101]"
                      : doc.type === "Received"
                        ? "text-[#007b5b]"
                        : doc.type === "Recommended"
                          ? "text-[#f59e0b]"
                          : "text-slate-600"
                  }`}
                >
                  {doc.type}
                </span>
              </div>
              {index !== documentRequirements.length - 1 && (
                <div className="mt-3 h-px w-full bg-slate-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
