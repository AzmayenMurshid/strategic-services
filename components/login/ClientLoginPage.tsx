"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SiteFooter from "@/components/shared/SiteFooter";
import styles from "./ClientLoginPage.module.css";

export default function ClientLoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get("firstName") ?? "");
    const lastName = String(formData.get("lastName") ?? "");
    const recordId = String(formData.get("recordId") ?? "");

    try {
      const response = await fetch("/api/v1/auth/client-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, recordId }),
      });

      const result = (await response.json()) as {
        data?: { id: string };
        error?: { message?: string };
      };

      if (!response.ok) {
        setErrorMessage(result.error?.message ?? "Unable to log in with the provided information.");
        return;
      }

      const contactId = result.data?.id;
      const destination = contactId ? `/dashboard?contactId=${encodeURIComponent(contactId)}` : "/dashboard";

      if (typeof window !== "undefined") {
        window.localStorage.setItem(
          "clientPortalSession",
          JSON.stringify({
            contactId,
            loggedInAt: new Date().toISOString(),
          })
        );
      }

      router.push(destination);
    } catch {
      setErrorMessage("Unable to reach the login service. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.background} aria-hidden="true" />

        <section className={styles.section}>
          <div className={styles.card}>
            <div className={styles.grid}>
              <div className={styles.heroPanel}>
                <div className={styles.brandRow}>
                  <img src="/EIDLexit/logo.png" alt="EIDLexit icon" className={styles.logo} />
                </div>
                <p className={styles.eyebrow}>Client Portal</p>
                <h1 className={styles.title}>Strategic Services</h1>
                <p className={styles.description}>
                  Sign in with your client details to review case progress, document requirements, and recent updates.
                </p>
              </div>

              <div className={styles.formPanel}>
                <h2 className={styles.formTitle}>Client Login</h2>
                <p className={styles.formSubtitle}>Enter your legal name and client ID exactly as provided.</p>

                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.field}>
                    <label htmlFor="firstName" className={styles.label}>
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      required
                      className={styles.input}
                      placeholder="First Name"
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="lastName" className={styles.label}>
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      required
                      className={styles.input}
                      placeholder="Last Name"
                    />
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="recordId" className={styles.label}>
                      Record ID
                    </label>
                    <input
                      id="recordId"
                      name="recordId"
                      type="text"
                      inputMode="numeric"
                      required
                      className={styles.input}
                      placeholder="127309759174"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={styles.submitButton}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </button>
                </form>

                {errorMessage && <p className={styles.error}>{errorMessage}</p>}

                <p className={styles.supportText}>
                  Need help accessing your portal?{" "}
                  <Link href="mailto:support@eidlexit.com" className={styles.supportLink}>
                    Contact support
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
