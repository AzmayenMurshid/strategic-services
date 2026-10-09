import Link from "next/link";
import SiteFooter from "@/components/shared/SiteFooter";

export default function ClientLoginPage() {
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
              <div className="bg-[#152c58] p-8 text-slate-100 sm:p-5 lg:p-10">
                <div className="mb-[2rem] mt-10 flex items-center gap-4 text-sm text-slate-200">
                  <img src="/EIDLexit/logo.png" alt="EIDLexit icon" className="h-[8rem] w-[8rem] rounded-md p-1" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">Client Portal</p>
                <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">Strategic Services</h1>
                <p className="mt-4 max-w-md text-sm text-slate-200 sm:text-base">
                  Sign in with your client details to review case progress, document requirements, and recent updates.
                </p>
              </div>

              <div className="p-8 sm:p-10">
                <h2 className="text-2xl font-semibold text-slate-900">Client Login</h2>
                <p className="mt-2 text-sm text-slate-600">Enter your legal name and client ID exactly as provided.</p>

                <form className="mt-8 space-y-5" action="/dashboard" method="get">
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
                      placeholder="Jane"
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
                      placeholder="Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="clientId" className="mb-2 block text-sm font-medium text-slate-700">
                      Client ID
                    </label>
                    <input
                      id="clientId"
                      name="clientId"
                      type="text"
                      inputMode="numeric"
                      required
                      className="w-full rounded-md border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-[#152c58] focus:ring-2 focus:ring-[#152c58]/20"
                      placeholder="CID-2041"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 w-full rounded-md bg-[#152c58] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0f2246]"
                  >
                    Sign In
                  </button>
                </form>

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
