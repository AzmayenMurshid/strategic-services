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

type DashboardClientProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  hubspotOwnerId: string | null;
  consultantName: string | null;
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

    return () => {
      isCancelled = true;
    };
  }, [searchParams]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-100 text-slate-900">
      <DashboardHeader
        isProfileMenuOpen={isProfileMenuOpen}
        setIsProfileMenuOpen={setIsProfileMenuOpen}
        setIsMobileNavOpen={setIsMobileNavOpen}
        clientProfile={clientProfile}
      />

      {isMobileNavOpen && <MobileNav setIsMobileNavOpen={setIsMobileNavOpen} clientProfile={clientProfile} />}

      <div className="mx-auto max-w-full px-4 py-8 sm:px-6 lg:px-8">
        <main className="grid min-w-0 gap-6 xl:grid-cols-[1.5fr_0.8fr]">
          <section className="min-w-0 space-y-6">
            <div className="rounded-[5px] border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Testing</p>
                  <p className="mt-1 text-sm text-slate-700">Toggle the service prompt for the dashboard timeline.</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {SS_PROMPTS.map((prompt) => {
                    const isActive = serviceKey === prompt.id;

                    return (
                      <button
                        key={prompt.id}
                        type="button"
                        onClick={() => setTestServiceKey(prompt.id)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                          isActive
                            ? "border-[#152c58] bg-[#152c58] text-white"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        {prompt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="max-w-full rounded-[5px] bg-white p-6 shadow-sm">
              <div className="space-y-6">
                <CaseProgressTimeline
                  selectedStageIndex={selectedStageIndex}
                  setSelectedStageIndex={setSelectedStageIndex}
                  serviceKey={serviceKey}
                />

                <NeededFromClient onViewRequirements={() => setIsRequirementsModalOpen(true)} />

                <RecentUpdates />
              </div>
            </div>
          </section>

          <aside className="min-w-0 space-y-6">
            <UploadPacket />
            <ClientSnapshot consultantName={clientProfile?.consultantName ?? null} />
          </aside>
        </main>
      </div>

      <SiteFooter />

      {isRequirementsModalOpen && <RequirementsModal onClose={() => setIsRequirementsModalOpen(false)} />}
    </div>
  );
}

