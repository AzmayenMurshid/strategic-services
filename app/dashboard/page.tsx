import { Suspense } from "react";
import ClientDashboard from "@/components/dashboard/ClientDashboard";

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-100" /> }>
      <ClientDashboard />
    </Suspense>
  );
}
