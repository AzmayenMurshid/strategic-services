import { fileList } from "../data";

export function UploadPacket() {
  return (
    <div className="rounded-[5px] p-6">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
        Upload Packet
      </p>

      <div className="mt-4 rounded-[5px] border-2 border-dashed border-slate-300 bg-slate-50 p-5 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl text-[#152c58]">
          ↑
        </div>
        <p className="mt-3 text-sm font-medium text-slate-700">Upload supporting documents</p>
        <p className="mt-1 text-xs text-slate-500">PDF, DOCX, JPG up to 25MB each</p>
        <button className="mt-4 rounded-xl bg-[#152c58] px-4 py-2 text-sm font-medium text-white hover:opacity-70">
          Select Files
        </button>
      </div>

      <div className="mt-5 space-y-2">
        <p className="mt-1 text-s text-slate-500">Upload History</p>
        {fileList.map((file) => (
          <div
            key={file}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
          >
            <span className="truncate text-sm text-slate-700">{file}</span>
            <span className="rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700">
              uploaded
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClientSnapshot() {
  return (
    <div className="rounded-[5px] border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
        Client Snapshot
      </p>

      <div className="mt-4 space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Next Action</p>
          <p className="mt-1 font-medium text-slate-800">
            Submit payroll records and owner verification.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Consultant</p>
          <p className="mt-1 font-medium text-slate-800">Alicia Thompson</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Notifications</p>
          <p className="mt-1 font-medium text-slate-800">Email alerts enabled</p>
        </div>
      </div>
    </div>
  );
}
