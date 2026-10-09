"use client";

import { useEffect, useRef, useState } from "react";

const stages = [
  { name: "Intake Received", status: "complete", snippet: "Application and intake details logged." },
  { name: "Initial Review", status: "complete", snippet: "Case reviewed for completeness." },
  { name: "Client Information Collected", status: "complete", snippet: "Business and owner info gathered." },
  { name: "Financial Overview Requested", status: "complete", snippet: "Financial packet requested from client." },
  { name: "Financial Overview Submitted", status: "complete", snippet: "Client financial summary received." },
  { name: "Documents Under Review", status: "complete", snippet: "Supporting documents are in review." },
  { name: "Consultant Review", status: "active", snippet: "Consultant is validating the file." },
  { name: "Case Packet Drafting", status: "upcoming", snippet: "Drafting the case packet for review." },
  { name: "Client Follow-Up Requested", status: "upcoming", snippet: "Client follow-up items are pending." },
  { name: "Additional Information Needed", status: "upcoming", snippet: "Additional data requested from client." },
  { name: "Case Ready for Submission", status: "upcoming", snippet: "File is prepared for submission." },
  { name: "Completed / Closed", status: "upcoming", snippet: "Case closed out after submission." },
];

const requiredDocs = [
  { label: "Financial overview packet", status: "Received", tone: "green" },
  { label: "Business tax returns", status: "Required", tone: "red" },
  { label: "Bank statements", status: "Recommended", tone: "amber" },
];

const documentRequirements = [
  { label: "Financial overview packet", type: "Received", note: "Covers the business financial summary and supporting detail." },
  { label: "Business tax returns", type: "Required", note: "Most recent filed returns for the business entity." },
  { label: "Bank statements", type: "Received", note: "Recent statements to confirm cash flow and account activity." },
  { label: "Owner payroll records", type: "Required", note: "Owner compensation and payroll verification for the business." },
  { label: "Legal entity documents", type: "Recommended", note: "Articles, formation records, EIN verification, or ownership structure documents." },
  { label: "Consultant follow-up items", type: "Recommended", note: "Any additional verification requested by the case consultant." },
  { label: "Owner identification documents", type: "Received", note: "Government-issued ID or ownership verification if requested." },
  { label: "Debt schedule or loan detail", type: "Recommended", note: "Helpful for reviewing financing obligations and staging details." },
];

const recentUpdates = [
  { text: "Consultant requested additional payroll verification.", age: "2 hours ago" },
  { text: "Financial overview has been reviewed and accepted.", age: "1 day ago" },
  { text: "Client upload was received and forwarded for consultant review.", age: "3 days ago" },
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
  const [isRequirementsModalOpen, setIsRequirementsModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [selectedStageIndex, setSelectedStageIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const stageRefs = useRef<Array<HTMLElement | null>>([]);
  const activeStageIndex = stages.findIndex((stage) => stage.status === "active");
  const activeStage = stages[activeStageIndex] ?? stages[0];
  const selectedStage =
    stages[selectedStageIndex ?? activeStageIndex] ?? stages[activeStageIndex] ?? stages[0];
  const progressPercent = ((activeStageIndex + 1) / stages.length) * 100;

  useEffect(() => {
    const container = scrollContainerRef.current;
    const activeStep = stageRefs.current[activeStageIndex];

    if (!container || !activeStep) {
      return;
    }

    const activeCenter = activeStep.offsetLeft + activeStep.offsetWidth / 2;
    const containerCenter = container.clientWidth / 2;
    const newScrollLeft = Math.max(0, activeCenter - containerCenter);

    container.scrollTo({
      left: newScrollLeft,
      behavior: "auto",
    });
  }, [activeStageIndex]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-100 text-slate-900">
      <header className="w-full border-b border-slate-200 bg-[#152c58] px-4 py-3 shadow-sm sm:px-6 sm:py-5">
        <div className="mx-auto max-w-[1600px]">
          <div className="hidden lg:flex lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <img
                src="EIDLexit/logo.png"
                alt="EIDLexit logo"
                className="h-16 w-auto max-w-full object-contain"
              />
              <p className="text-base font-medium uppercase tracking-[0.2em] text-white">
                Strategic Services
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="relative">
                <button
                  type="button"
                  aria-label="Open client profile"
                  onClick={() => setIsProfileMenuOpen((value) => !value)}
                  className="flex max-w-full items-center gap-2 rounded-[5px] px-3 py-2 text-left shadow-lg transition hover:border-slate-300 hover:bg-slate-900"
                >
                  <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-400">
                    {isProfileMenuOpen ? "" : "Profile"}
                  </span>
                  <span className="ml-2 truncate text-lg font-semibold text-slate-100">Jordan Martinez</span>
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute left-0 right-auto z-20 mt-2 w-[min(18rem,calc(100vw-1.5rem))] rounded-[5px] bg-white p-4 shadow-xl sm:right-0 sm:left-auto">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                      Client Profile
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">Jordan Martinez</p>
                    <p className="mt-1 text-sm text-slate-600">Case #EIDL-2048</p>
                    <div className="mt-4 space-y-2 border-t border-slate-200 pt-3">
                      <p className="text-sm text-slate-700">Email: jordan.martinez@email.com</p>
                      <p className="text-sm text-slate-700">Phone: (555) 204-4421</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between lg:hidden">
            <div className="flex min-w-0 items-center gap-2">
              <img
                src="EIDLexit/logo.png"
                alt="EIDLexit logo"
                className="h-8 w-auto max-w-full object-contain"
              />
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white">
                Strategic Services
              </p>
            </div>

            <button
              type="button"
              aria-label="Open mobile navigation"
              onClick={() => setIsMobileNavOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-[5px] border border-white/20 bg-white/5 text-lg text-white transition hover:bg-white/10"
            >
              ☰
            </button>
          </div>
        </div>

        {isMobileNavOpen && (
          <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setIsMobileNavOpen(false)}>
            <div className="fixed inset-0 bg-slate-900/50" />
            <aside
              className="fixed left-0 top-0 z-10 h-full w-[82vw] max-w-xs bg-[#152c58] p-4 text-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div className="flex items-center gap-3">
                  <img src="EIDLexit/logo.png" alt="EIDLexit logo" className="h-10 w-auto object-contain" />
                  <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white">
                    Strategic Services
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close mobile navigation"
                  onClick={() => setIsMobileNavOpen(false)}
                  className="flex h-8 w-8 items-center justify-center text-white"
                >
                  ✕
                </button>
              </div>

              <nav className="mt-6 space-y-2">
                {[
                  "Overview",
                  "Case Progression",
                  "Needed from Client",
                  "Upload Packet",
                  "Recent Updates",
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setIsMobileNavOpen(false)}
                    className="flex w-full items-center justify-between rounded-[5px] border border-white/10 bg-white/5 px-3 py-2 text-left text-sm font-medium text-slate-100 transition hover:bg-white/10"
                  >
                    <span>{item}</span>
                    <span className="text-slate-300">›</span>
                  </button>
                ))}
              </nav>

              <div className="mt-8 rounded-[5px] border border-white/15 bg-white/5 p-3">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-300">
                  Client Profile
                </p>
                <p className="mt-2 text-base font-semibold text-white">Jordan Martinez</p>
                <p className="mt-1 text-sm text-slate-200">Case #EIDL-2048</p>
              </div>
            </aside>
          </div>
        )}
      </header>

      <div className="mx-auto max-w-full px-4 py-8 sm:px-6 lg:px-8">
        <main className="grid min-w-0 gap-6 xl:grid-cols-[1.5fr_0.8fr]">
          <section className="min-w-0 space-y-6">
            <div className="rounded-[5px] border-slate-200 px-6 py-2">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              </div>
            </div>

            <div className="max-w-full rounded-[5px] bg-white p-6 shadow-sm">
              <div className="space-y-6">
                <div
                  className="relative overflow-hidden rounded-[5px] py-4 px-4"
                  style={{
                    backgroundImage: "url('/EIDLexit/Businessman.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center bottom",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-[4px]" />

                  <div className="relative z-10">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-md font-bold uppercase tracking-[0.2em] text-[#152c58]">
                          Case Progression
                        </p>
                      </div>
                      <div className="rounded-[5px] border border-slate-200 bg-white/80 px-2 py-1 text-sm font-medium text-emerald-700 shadow-sm backdrop-blur-sm">
                        7 of 12 stages complete
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 mb-[10px]">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-900">Current stage</p>
                        <p className="mt-1 text-base font-semibold text-slate-900">{activeStage.name}</p>
                      </div>
                    </div>

                    <div
                      className="block w-full overflow-x-auto overflow-y-hidden text-left outline-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                      ref={scrollContainerRef}
                      style={{ overscrollBehaviorY: "contain" }}
                    >
                      <div className="relative mb-3 min-w-[680px] px-1 sm:min-w-0" style={{ scrollBehavior: "auto" }}>
                        <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-[10px] bg-slate-200" />
                        <div
                          className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full"
                          style={{ width: `${progressPercent}%`, backgroundColor: "#152c58" }}
                        />

                        <div className="relative flex min-w-[680px] items-center justify-between gap-1 sm:min-w-0 sm:gap-0">
                          {stages.map((stage, index) => {
                            const isComplete = index < activeStageIndex;
                            const isActive = index === activeStageIndex;
                            const isSelected = (selectedStageIndex ?? activeStageIndex) === index;

                            return (
                              <button
                                key={stage.name}
                                type="button"
                                onClick={() => setSelectedStageIndex(index)}
                                ref={(node) => {
                                  stageRefs.current[index] = node;
                                }}
                                className="group relative flex min-w-0 flex-1 justify-center bg-transparent p-0 text-left"
                              >
                                <div
                                  className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full border-4 border-white text-[10px] font-bold shadow-sm sm:h-8 sm:w-8 sm:text-xs ${
                                    isComplete
                                      ? "text-white"
                                      : isActive
                                        ? "text-white"
                                        : "bg-slate-200 text-slate-600"
                                  } ${isSelected ? "ring-2 ring-blue-300 ring-offset-2 ring-offset-white" : ""}`}
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

                                <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-44 -translate-x-1/2 rounded-[5px] border border-slate-200 bg-slate-900 p-2 text-left opacity-0 shadow-lg transition-all duration-150 group-hover:opacity-100">
                                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-300">
                                    {stage.name}
                                  </p>
                                  <p className="mt-1 text-[10px] leading-4 text-slate-100">{stage.snippet}</p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 rounded-[10px] border border-slate-200 bg-white/80 p-3 shadow-sm backdrop-blur-sm">
                      <p
                        className={`text-xs font-medium uppercase tracking-[0.12em] ${
                          selectedStage.status === "complete"
                            ? "text-emerald-600"
                            : selectedStage.status === "active"
                              ? "text-[#152c58]"
                              : "text-slate-500"
                        }`}
                      >
                        {selectedStage.status === "complete"
                          ? "Completed"
                          : selectedStage.status === "active"
                            ? "In Progress"
                            : "Upcoming"}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">{selectedStage.name}</p>
                      <p className="mt-1 text-sm text-slate-700">{selectedStage.snippet}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="mt-2 text-lg font-semibold sm:text-xl">Needed from Client</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsRequirementsModalOpen(true)}
                      className="rounded-xl border border-slate-200 bg-[#152c58] px-3 py-2 text-sm font-medium text-slate-100 hover:bg-slate-900"
                    >
                      View all requirements
                    </button>
                  </div>

                  <div className="space-y-3">
                    {requiredDocs.map((doc) => (
                      <div
                        key={doc.label}
                        className="flex items-center justify-between gap-3"
                      >
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
              </div>
            </div>
          </section>

          <aside className="min-w-0 space-y-6">
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
          </aside>
        </main>
      </div>

      <footer className="border-t border-slate-200 bg-[#152c58] text-slate-100">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-4 py-6 text-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <img src="EIDLexit/logo.png" alt="EIDLexit logo" className="h-8 w-auto object-contain" />
            <span className="font-medium uppercase tracking-[0.2em] text-white">Strategic Services</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-slate-200">
            <span>support@eidlexit.com</span>
            <span>•</span>
            <span>(555) 204-4421</span>
          </div>
          <div className="text-slate-300">© 2026 EIDLexit</div>
        </div>
      </footer>

      {isRequirementsModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-2 sm:p-4"
          onClick={() => setIsRequirementsModalOpen(false)}
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
                onClick={() => setIsRequirementsModalOpen(false)}
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
      )}
    </div>
  );
}
