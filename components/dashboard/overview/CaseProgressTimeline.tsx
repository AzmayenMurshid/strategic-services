"use client";

import { useEffect, useRef } from "react";
import { stages } from "../data";

type CaseProgressTimelineProps = {
  selectedStageIndex: number | null;
  setSelectedStageIndex: (index: number | null) => void;
};

export function CaseProgressTimeline({
  selectedStageIndex,
  setSelectedStageIndex,
}: CaseProgressTimelineProps) {
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

          <div className="mb-[10px] flex items-center justify-between gap-3">
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
    </div>
  );
}
