"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DashboardHeader } from "./header/DashboardHeader";
import { MobileNav } from "./header/MobileNav";
import { CaseProgressTimeline } from "./overview/CaseProgressTimeline";
import { NeededFromClient } from "./overview/NeededFromClient";
import { RecentUpdates } from "./overview/RecentUpdates";
import { RequirementsModal } from "./modals/RequirementsModal";
import { ClientSnapshot, UploadPacket } from "./sidebar/SidebarPanels";
import { SS_PROMPTS, normalizeServiceKey, type ServiceOutcomeKey } from "./data";
import SiteFooter from "@/components/shared/SiteFooter";
import styles from "./ClientDashboard.module.css";

type DashboardClientProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  hubspotOwnerId: string | null;
  consultantName: string | null;
  strategicServicesStage: string | null;
};

export default function ClientDashboard() {
  const searchParams = useSearchParams();
  const [isRequirementsModalOpen, setIsRequirementsModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [selectedStageIndex, setSelectedStageIndex] = useState<number | null>(null);
  const [clientProfile, setClientProfile] = useState<DashboardClientProfile | null>(null);
  const [testServiceKey, setTestServiceKey] = useState<ServiceOutcomeKey | null>(null);
  const serviceKey = normalizeServiceKey(testServiceKey ?? searchParams.get("service"));

  useEffect(() => {
    const contactId = searchParams.get("contactId");

    if (!contactId) {
      return;
    }

    let isCancelled = false;

    const loadClientProfile = async () => {
      try {
        const response = await fetch(`/api/v1/clients/${encodeURIComponent(contactId)}`);

        if (!response.ok) {
          if (!isCancelled) {
            setClientProfile(null);
          }
          return;
        }

        const result = (await response.json()) as { data?: DashboardClientProfile };

        if (!isCancelled) {
          setClientProfile(result.data ?? null);
        }
      } catch {
        if (!isCancelled) {
          setClientProfile(null);
        }
      }
    };

    loadClientProfile();

    const events = new EventSource(`/api/v1/clients/${encodeURIComponent(contactId)}/stream`);

    events.addEventListener("client-stage-update", async () => {
      await loadClientProfile();
    });

    events.onerror = () => {
      events.close();
    };

    return () => {
      isCancelled = true;
      events.close();
    };
  }, [searchParams]);

  return (
    <div className={styles.page}>
      <DashboardHeader
        isProfileMenuOpen={isProfileMenuOpen}
        setIsProfileMenuOpen={setIsProfileMenuOpen}
        setIsMobileNavOpen={setIsMobileNavOpen}
        clientProfile={clientProfile}
      />

      {isMobileNavOpen && <MobileNav setIsMobileNavOpen={setIsMobileNavOpen} clientProfile={clientProfile} />}

      <div className={styles.content} id="overview">
        <main className={styles.grid}>
          <section className={styles.mainColumn}>
            <div className={styles.serviceSwitcher}>
              <div className={styles.serviceSwitcherInner}>
                <div>
                  <p className={styles.serviceSwitcherEyebrow}>Testing</p>
                  <p className={styles.serviceSwitcherCopy}>Toggle the service prompt for the dashboard timeline.</p>
                </div>

                <div className={styles.serviceButtons}>
                  {SS_PROMPTS.map((prompt) => {
                    const isActive = serviceKey === prompt.id;

                    return (
                      <button
                        key={prompt.id}
                        type="button"
                        onClick={() => setTestServiceKey(prompt.id)}
                        className={[styles.serviceButton, isActive ? styles.serviceButtonActive : ""].filter(Boolean).join(" ")}
                      >
                        {prompt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className={styles.surfaceCard} id="case-progression">
              <div className={styles.stack}>
                <div className={styles.scrollTarget}>
                  <CaseProgressTimeline
                    selectedStageIndex={selectedStageIndex}
                    setSelectedStageIndex={setSelectedStageIndex}
                    serviceKey={serviceKey}
                    hubSpotStageName={clientProfile?.strategicServicesStage ?? null}
                  />
                </div>

                <div id="needed-from-client" className={styles.scrollTarget}>
                  <NeededFromClient onViewRequirements={() => setIsRequirementsModalOpen(true)} />
                </div>

                <div id="recent-updates" className={styles.scrollTarget}>
                  <RecentUpdates currentStageName={clientProfile?.strategicServicesStage ?? null} />
                </div>
              </div>
            </div>
          </section>

          <aside className={styles.aside}>
            <div id="upload-packet" className={styles.scrollTarget}>
              <UploadPacket />
            </div>
            <ClientSnapshot consultantName={clientProfile?.consultantName ?? null} />
          </aside>
        </main>
      </div>

      <SiteFooter />

      {isRequirementsModalOpen && <RequirementsModal onClose={() => setIsRequirementsModalOpen(false)} />}
    </div>
  );
}

