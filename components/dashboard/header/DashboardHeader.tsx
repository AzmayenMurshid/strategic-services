type DashboardHeaderProps = {
  isProfileMenuOpen: boolean;
  setIsProfileMenuOpen: (value: boolean) => void;
  setIsMobileNavOpen: (value: boolean) => void;
};

export function DashboardHeader({
  isProfileMenuOpen,
  setIsProfileMenuOpen,
  setIsMobileNavOpen,
}: DashboardHeaderProps) {
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
                className="flex max-w-full items-center gap-2 rounded-[5px] px-3 py-2 text-left shadow-lg transition hover:border-slate-300 hover:bg-slate-900"
              >
                <span className="shrink-0 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-400">
                  {isProfileMenuOpen ? "" : "Profile"}
                </span>
                <span className="ml-2 truncate text-lg font-semibold text-slate-100">Jordan Martinez</span>
              </button>

              {isProfileMenuOpen && (
                <div className="absolute left-0 right-auto z-20 mt-2 w-[min(18rem,calc(100vw-1.5rem))] rounded-[5px] bg-white p-4 shadow-xl sm:right-0 sm:left-auto">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                    Client Profile
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">Jordan Martinez</p>
                  <p className="mt-1 text-sm text-slate-600">Case #EIDL-2048</p>
                  <div className="mt-4 space-y-2 border-t border-slate-200 pt-3">
                    <p className="text-sm text-slate-700">Email: jordan.martinez@email.com</p>
                    <p className="text-sm text-slate-700">Phone: (555) 204-4421</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between lg:hidden">
          <div className="flex min-w-0 items-center gap-4">
            <img
              src="EIDLexit/logo.png"
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
