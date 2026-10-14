"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SiteFooter from "@/components/shared/SiteFooter";

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
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <main className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(21, 44, 88, 0.18), transparent 52%), radial-gradient(circle at 80% 10%, rgba(29, 78, 216, 0.14), transparent 46%)",
          }}
        />

        <section className="relative z-10 mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl items-center px-4 py-10 sm:min-h-[calc(100vh-3.5rem)] sm:px-6 lg:px-8">
          <div className="w-full overflow-hidden rounded-[5px] border border-slate-200 bg-white shadow-xl">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <div className="bg-[#152c58] p-5 text-slate-100 sm:p-6 lg:p-10">
                <div className="mb-4 mt-2 flex items-center gap-4 text-sm text-slate-200 sm:mb-6 sm:mt-4 lg:mb-[2rem] lg:mt-10">
                  <img src="/EIDLexit/logo.png" alt="EIDLexit icon" className="h-20 w-20 rounded-md p-1 sm:h-24 sm:w-24 lg:h-[8rem] lg:w-[8rem]" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">Client Portal</p>
                <h1 className="mt-3 text-2xl font-semibold leading-tight sm:mt-4 sm:text-3xl lg:text-4xl">Strategic Services</h1>
                <p className="mt-3 max-w-md text-sm text-slate-200 sm:mt-4 sm:text-base">
                  Sign in with your client details to review case progress, document requirements, and recent updates.
                </p>
              </div>

              <div className="p-8 sm:p-10">
                <h2 className="text-2xl font-semibold text-slate-900">Client Login</h2>
                <p className="mt-2 text-sm text-slate-600">Enter your legal name and client ID exactly as provided.</p>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-slate-700">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      required
                      className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-[#152c58] focus:ring-2 focus:ring-[#152c58]/20"
                      placeholder="First Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-slate-700">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      required
                      className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-[#152c58] focus:ring-2 focus:ring-[#152c58]/20"
                      placeholder="Last Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="recordId" className="mb-2 block text-sm font-medium text-slate-700">
                      Record ID
                    </label>
                    <input
                      id="recordId"
                      name="recordId"
                      type="text"
                      inputMode="numeric"
                      required
                      className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-[#152c58] focus:ring-2 focus:ring-[#152c58]/20"
                      placeholder="127309759174"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-2 w-full rounded-md bg-[#152c58] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0f2246]"
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </button>
                </form>

                {errorMessage && <p className="mt-4 text-sm font-medium text-red-600">{errorMessage}</p>}

                <p className="mt-6 text-center text-sm text-slate-600">
                  Need help accessing your portal?{" "}
                  <Link href="mailto:support@eidlexit.com" className="font-semibold text-[#152c58] hover:underline">
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
