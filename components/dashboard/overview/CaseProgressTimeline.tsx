"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { getServicePromptByKey } from "../data";
import styles from "./CaseProgressTimeline.module.css";

type CaseProgressTimelineProps = {
  selectedStageIndex: number | null;
  setSelectedStageIndex: (index: number | null) => void;
  serviceKey?: string | null;
};

export function CaseProgressTimeline({
  selectedStageIndex,
  setSelectedStageIndex,
  serviceKey,
}: CaseProgressTimelineProps) {
  const [hoveredStageIndex, setHoveredStageIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const stageRefs = useRef<Array<HTMLElement | null>>([]);
  const servicePrompt = getServicePromptByKey(serviceKey);
  const stages = servicePrompt.stages;
  const activeStageIndex = stages.findIndex((stage) => stage.status === "active");
  const activeStage = stages[activeStageIndex] ?? stages[0];
  const previewStageIndex = hoveredStageIndex ?? selectedStageIndex ?? activeStageIndex;
  const selectedStage =
    stages[previewStageIndex] ?? stages[activeStageIndex] ?? stages[0];
  const progressPercent = ((activeStageIndex + 1) / stages.length) * 100;
  const progressStyle = { width: `${progressPercent}%` } satisfies CSSProperties;

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

  const handleStageClick = (index: number) => {
    if (typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches) {
      return;
    }

    setSelectedStageIndex(index);
  };

  return (
    <div className={styles.root}>
      <div className={styles.heroCard}>
        <div className={styles.heroBackdrop} />

        <div className={styles.content}>
          <div className={styles.header}>
            <div>
              <p className={styles.title}>Case Progression</p>
              <p className={styles.subtitle}>
                {servicePrompt.label} · {servicePrompt.desiredOutcome}
              </p>
            </div>
            {/** <div className="rounded-[5px] border border-slate-200 bg-white/80 px-2 py-1 text-sm font-medium text-emerald-700 shadow-sm backdrop-blur-sm">
              {Math.max(0, activeStageIndex + 1)} of {stages.length} stages complete
            </div> **/}
          </div>

          <div className={styles.currentStageRow}>
            <div>
              <p className={styles.currentLabel}>Current stage</p>
              <p className={styles.currentName}>{activeStage.name}</p>
            </div>
          </div>

          <div className={styles.scrollArea} ref={scrollContainerRef}>
            <div className={styles.trackViewport}>
              <div className={styles.trackBase} />
              <div className={styles.trackProgress} style={progressStyle} />

              <div className={styles.stages}>
                {stages.map((stage, index) => {
                  const isComplete = index < activeStageIndex;
                  const isActive = index === activeStageIndex;
                  const isSelected = (selectedStageIndex ?? activeStageIndex) === index;
                  const stageCircleClassName = [
                    styles.stageCircle,
                    isComplete ? styles.stageCircleComplete : "",
                    isActive ? styles.stageCircleActive : "",
                    isSelected ? styles.stageCircleSelected : "",
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <button
                      key={stage.name}
                      type="button"
                      onClick={() => handleStageClick(index)}
                      onMouseEnter={() => setHoveredStageIndex(index)}
                      onMouseLeave={() => setHoveredStageIndex(null)}
                      onFocus={() => setHoveredStageIndex(index)}
                      onBlur={() => setHoveredStageIndex(null)}
                      ref={(node) => {
                        stageRefs.current[index] = node;
                      }}
                      className={styles.stageButton}
                    >
                      <div className={stageCircleClassName}>
                        {isComplete ? "✓" : index + 1}
                      </div>

                      <div className={styles.stageTooltip}>
                        <p className={styles.tooltipTitle}>{stage.name}</p>
                        <p className={styles.tooltipSnippet}>{stage.snippet}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className={styles.detailsCard}>
            <p
              className={[
                styles.stageStatus,
                selectedStage.status === "complete"
                  ? styles.stageStatusComplete
                  : selectedStage.status === "active"
                    ? styles.stageStatusActive
                    : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {selectedStage.status === "complete"
                ? "Completed"
                : selectedStage.status === "active"
                  ? "In Progress"
                  : "Upcoming"}
            </p>
            <p className={styles.detailsTitle}>{selectedStage.name}</p>
            <p className={styles.detailsCopy}>{selectedStage.snippet}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
