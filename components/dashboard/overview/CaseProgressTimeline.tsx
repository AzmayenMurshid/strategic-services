"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { getServicePromptByKey } from "../data";
import styles from "./CaseProgressTimeline.module.css";

type CaseProgressTimelineProps = {
  selectedStageIndex: number | null;
  setSelectedStageIndex: (index: number | null) => void;
  serviceKey?: string | null;
  hubSpotStageName?: string | null;
};

function normalizeStageName(value?: string | null) {
  const normalized = (value ?? "")
    .trim()
    .toLowerCase()
    .replace(/\bstage\s*\d+\b/gi, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return normalized.replace(/^\s*[-:]+\s*/, "").trim();
}

export function CaseProgressTimeline({
  selectedStageIndex,
  setSelectedStageIndex,
  serviceKey,
  hubSpotStageName,
}: CaseProgressTimelineProps) {
  const [hoveredStageIndex, setHoveredStageIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const stageRefs = useRef<Array<HTMLElement | null>>([]);
  const servicePrompt = getServicePromptByKey(serviceKey);
  const stages = servicePrompt.stages;
  const normalizedHubSpotStage = normalizeStageName(hubSpotStageName);
  const inferredStageIndex = normalizedHubSpotStage
    ? stages.findIndex((stage) => {
        const normalizedStageName = normalizeStageName(stage.name);
        return (
          normalizedStageName === normalizedHubSpotStage ||
          normalizedStageName.includes(normalizedHubSpotStage) ||
          normalizedHubSpotStage.includes(normalizedStageName)
        );
      })
    : -1;

  const hasHubSpotStage = inferredStageIndex >= 0;
  const activeStageIndex = hasHubSpotStage ? inferredStageIndex : -1;
  const resolvedStages = stages.map((stage, index) => ({
    ...stage,
    status: hasHubSpotStage
      ? index < activeStageIndex
        ? "complete"
        : index === activeStageIndex
          ? "active"
          : "upcoming"
      : "upcoming",
  }));
  const activeStage = hasHubSpotStage ? resolvedStages[activeStageIndex] ?? resolvedStages[0] : null;
  const previewStageIndex = hoveredStageIndex ?? selectedStageIndex ?? activeStageIndex;
  const selectedStage =
    previewStageIndex >= 0 && resolvedStages[previewStageIndex] !== undefined
      ? resolvedStages[previewStageIndex]
      : activeStage ?? resolvedStages[0];
  const currentStageStatus = hasHubSpotStage
    ? previewStageIndex < activeStageIndex
      ? "complete"
      : previewStageIndex === activeStageIndex
        ? "active"
        : "upcoming"
    : "upcoming";
  const progressPercent = hasHubSpotStage ? ((activeStageIndex + 1) / stages.length) * 100 : 0;
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
              <p className={styles.currentName}>
                {hasHubSpotStage && activeStage ? activeStage.name : "No updates yet."}
              </p>
            </div>
          </div>

          <div className={styles.scrollArea} ref={scrollContainerRef}>
            <div className={styles.trackViewport}>
              <div className={styles.trackBase} />
              <div className={styles.trackProgress} style={progressStyle} />

              <div className={styles.stages}>
                {resolvedStages.map((stage, index) => {
                  const isComplete = hasHubSpotStage && index < activeStageIndex;
                  const isActive = hasHubSpotStage && index === activeStageIndex;
                  const isSelected = hasHubSpotStage && (selectedStageIndex ?? activeStageIndex) === index;
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
                        {isComplete ? "✓" : hasHubSpotStage ? index + 1 : index + 1}
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
                currentStageStatus === "complete"
                  ? styles.stageStatusComplete
                  : currentStageStatus === "active"
                    ? styles.stageStatusActive
                    : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {currentStageStatus === "complete"
                ? "Completed"
                : currentStageStatus === "active"
                  ? "In Progress"
                  : "Upcoming"}
            </p>
            <p className={styles.detailsTitle}>{selectedStage?.name ?? "No updates yet."}</p>
            <p className={styles.detailsCopy}>{selectedStage?.snippet ?? "Consultant has not provided details yet."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
