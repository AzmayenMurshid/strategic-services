import { Suspense } from "react";
import ClientDashboard from "@/components/dashboard/ClientDashboard";
import styles from "./page.module.css";

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className={styles.fallback} />}>
      <ClientDashboard />
    </Suspense>
  );
}
