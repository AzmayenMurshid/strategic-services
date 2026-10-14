import { useRouter } from "next/navigation";

type DashboardHeaderProps = {
  isProfileMenuOpen: boolean;
  setIsProfileMenuOpen: (value: boolean) => void;
  setIsMobileNavOpen: (value: boolean) => void;
  clientProfile: {
    id: string;
    firstName: string;
    lastName: string;
    email: string | null;
    phone: string | null;
  } | null;
};

export function DashboardHeader({
  isProfileMenuOpen,
  setIsProfileMenuOpen,
  setIsMobileNavOpen,
  clientProfile,
}: DashboardHeaderProps) {
  const router = useRouter();
  const fullName = clientProfile ? `${clientProfile.firstName} ${clientProfile.lastName}`.trim() : "";
  const caseLabel = clientProfile?.id ? `Case #${clientProfile.id}` : "";
  const initials = fullName
    ? fullName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("")
    : "C";

  const handleLogout = () => {
    try {
      window.localStorage.removeItem("clientPortalSession");
    } catch {
      // Ignore storage errors in restricted environments.
    }

    setIsProfileMenuOpen(false);
    router.push("/");
  };

  return (
    <header className="w-full border-b border-slate-200 bg-[#152c58] px-8 py-7 shadow-sm sm:px-6 sm:py-5">
      <div className="mx-auto max-w-[1600px]">
        <div className="hidden lg:flex lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src="EIDLexit/logo.png"
              alt="EIDLexit logo"
              className="h-16 w-auto max-w-full object-contain"
            />
            <p className="text-base font-medium uppercase tracking-[0.2em] text-white">
              Strategic Services
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <button
                type="button"
                aria-label="Open client profile"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex max-w-full items-center gap-3 rounded-xl border border-white/10 bg-slate-900/30 px-3 py-2.5 text-left shadow-[0_10px_24px_rgba(15,23,42,0.22)] transition duration-200 hover:border-white/20 hover:bg-slate-900/40"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#152c58] shadow-sm">
                  {initials}
                </span>

                <span className="min-w-0">
                  <span className="block text-[10px] font-medium uppercase tracking-[0.14em] text-slate-300">
                    {isProfileMenuOpen ? "Profile" : "Profile"}
                  </span>
                  <span className="block truncate text-base font-semibold text-white">{fullName}</span>
                </span>
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 z-20 mt-3 w-[min(21rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_50px_rgba(15,23,42,0.18)]">
                  <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Client Profile
                    </p>
                  </div>

                  {clientProfile ? (
                    <div className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#152c58] text-base font-semibold text-white">
                          {initials}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-lg font-semibold text-slate-900">{fullName}</p>
                          <p className="text-sm text-slate-500">{caseLabel}</p>
                        </div>
                      </div>

                      <div className="mt-4 p-3">
                        <div className="space-y-2 text-sm text-slate-700">
                          <p>
                            <span className="font-medium text-slate-500">Email:</span>{" "}
                            {clientProfile.email ?? "Not available"}
                          </p>
                          <p>
                            <span className="font-medium text-slate-500">Phone:</span>{" "}
                            {clientProfile.phone ?? "Not available"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 border-t border-slate-200 pt-3">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full rounded-[5px] bg-[#da0101] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#b90000]"
                        >
                          Log out
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 text-sm text-slate-600">
                      <p>No client profile loaded.</p>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="mt-3 w-full rounded-[5px] bg-[#da0101] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#b90000]"
                      >
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between lg:hidden">
          <div className="flex min-w-0 items-center gap-4">
            <img
              src="/EIDLexit/logo.png"
              alt="EIDLexit logo"
              className="h-12 w-auto max-w-full object-contain"
            />
            <p className="text-base font-medium uppercase tracking-[0.18em] text-white">
              Strategic Services
            </p>
          </div>

          <button
            type="button"
            aria-label="Open mobile navigation"
            onClick={() => setIsMobileNavOpen(true)}
            className="flex h-[3.25rem] w-[3.25rem] items-center justify-center text-2xl text-white transition hover:bg-slate-900"
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
