"use client";

import { useState } from "react";

const stages = [
  { name: "Intake Received", status: "complete" },
  { name: "Initial Review", status: "complete" },
  { name: "Client Information Collected", status: "complete" },
  { name: "Financial Overview Requested", status: "complete" },
  { name: "Financial Overview Submitted", status: "complete" },
  { name: "Documents Under Review", status: "complete" },
  { name: "Consultant Review", status: "active" },
  { name: "Case Packet Drafting", status: "upcoming" },
  { name: "Client Follow-Up Requested", status: "upcoming" },
  { name: "Additional Information Needed", status: "upcoming" },
  { name: "Case Ready for Submission", status: "upcoming" },
  { name: "Completed / Closed", status: "upcoming" },
];

const requiredDocs = [
  { label: "Financial overview packet", status: "Received", tone: "green" },
  { label: "Business tax returns", status: "Needed", tone: "amber" },
  { label: "Bank statements", status: "Received", tone: "green" },
  { label: "Owner payroll records", status: "Needed", tone: "amber" },
  { label: "Legal entity documents", status: "Pending", tone: "slate" },
  { label: "Consultant follow-up items", status: "New", tone: "blue" },
];

const recentUpdates = [
  "Consultant requested additional payroll verification.",
  "Financial overview has been reviewed and accepted.",
  "Client upload was received and forwarded for consultant review.",
];

const fileList = [
  "financial_overview.pdf",
  "bank_statement_2025.pdf",
  "owner_tax_return.pdf",
];

const stageStyles: Record<string, string> = {
  complete: "bg-emerald-500 text-white border-emerald-500",
  active: "bg-blue-600 text-white border-blue-600",
  upcoming: "bg-slate-200 text-slate-600 border-slate-200",
};

const docStyles: Record<string, string> = {
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  slate: "bg-slate-100 text-slate-700 border-slate-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
};

export default function Home() {
  const [isStageMenuOpen, setIsStageMenuOpen] = useState(false);
  const activeStageIndex = stages.findIndex((stage) => stage.status === "active");
  const activeStage = stages[activeStageIndex] ?? stages[0];
  const progressPercent = ((activeStageIndex + 1) / stages.length) * 100;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="w-full border-b border-slate-200 bg-white px-6 py-5 shadow-sm">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue-600">
                Strategic Services
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                EIDLexit Case Dashboard
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-8">
              <div>
                  <p className="text-sm font-medium text-slate-500">Client</p>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-lg font-semibold text-slate-900">Jordan Martinez</div>
                <div className="text-sm font-medium text-slate-500">Case #EIDL-2048</div>
              </div>
              <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-700">
                View Client Portal
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
        <main className="grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
          <section className="space-y-6">
            <div className="rounded-[5px] border-slate-200 px-6 py-2">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                      Case Progression
                    </p>
                  </div>
                  <div className="rounded-full px-3 py-1 text-sm font-medium text-emerald-700">
                    7 of 12 stages complete
                  </div>
                </div>

                <div className="rounded-[10px] p-4">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Current stage</p>
                      <p className="mt-1 text-base font-semibold text-slate-800">{activeStage.name}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsStageMenuOpen((value) => !value)}
                    className="block w-full text-left"
                  >
                    <div className="relative mb-3 px-1">
                      <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-slate-200" />
                      <div
                        className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full"
                        style={{ width: `${progressPercent}%`, backgroundColor: "#152c58" }}
                      />

                      <div className="relative flex items-center justify-between">
                        {stages.map((stage, index) => {
                          const isComplete = index < activeStageIndex;
                          const isActive = index === activeStageIndex;

                          return (
                            <div key={stage.name} className="flex flex-1 justify-center">
                              <div
                                className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white text-xs font-bold shadow-sm ${
                                  isComplete
                                    ? "text-white"
                                    : isActive
                                      ? "text-white"
                                      : "bg-slate-200 text-slate-600"
                                }`}
                                style={
                                  isComplete
                                    ? { backgroundColor: "#007b5b" }
                                    : isActive
                                      ? { backgroundColor: "#152c58" }
                                      : undefined
                                }
                              >
                                {isComplete ? "✓" : index + 1}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </button>

                  {isStageMenuOpen && (
                    <div className="mt-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                      <div className="space-y-2">
                        {stages.map((stage, index) => {
                          const isComplete = index < activeStageIndex;
                          const isActive = index === activeStageIndex;

                          return (
                            <div
                              key={stage.name}
                              className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm ${
                                isActive
                                  ? "border-blue-200 bg-blue-50 text-blue-700"
                                  : isComplete
                                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                    : "border-slate-200 bg-slate-50 text-slate-600"
                              }`}
                            >
                              <span className="font-medium">{stage.name}</span>
                              <span className="text-xs font-semibold uppercase tracking-[0.12em]">
                                {isComplete ? "Done" : isActive ? "Current" : "Next"}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="mt-2 text-xl font-semibold">Needed from Client</p>
                    </div>
                    <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                      View all requirements
                    </button>
                  </div>

                  <div className="space-y-3">
                    {requiredDocs.map((doc) => (
                      <div
                        key={doc.label}
                        className="flex items-center justify-between rounded-2xl p-1px"
                      >
                        <div>
                          <p className="font-medium text-slate-800">{doc.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl bg-white p-6">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                    Recent Updates
                  </p>

                  <div className="mt-4 space-y-3">
                    {recentUpdates.map((update) => (
                      <div key={update} className="rounded-[5px] border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                        {update}
                      </div>
                    ))}
                  </div>
                </div> 
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-2xl p-6">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                Upload Packet
              </p>

              <div className="mt-4 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-5 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-xl text-blue-700">
                  ↑
                </div>
                <p className="mt-3 text-sm font-medium text-slate-700">Upload supporting documents</p>
                <p className="mt-1 text-xs text-slate-500">PDF, DOCX, JPG up to 25MB each</p>
                <button className="mt-4 rounded-xl bg-[#152c58] px-4 py-2 text-sm font-medium text-white hover:opacity-70">
                  Select Files
                </button>
              </div>

              <div className="mt-5 space-y-2">
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

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
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
          </aside>
        </main>
      </div>
    </div>
  );
}
