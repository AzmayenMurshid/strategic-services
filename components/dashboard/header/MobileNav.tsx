type MobileNavProps = {
  setIsMobileNavOpen: (value: boolean) => void;
};

export function MobileNav({ setIsMobileNavOpen }: MobileNavProps) {
  return (
    <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setIsMobileNavOpen(false)}>
      <div className="fixed inset-0 bg-slate-900/50" />
      <aside
        className="fixed left-0 top-0 z-10 h-full w-[88vw] max-w-sm bg-[#152c58] p-8 text-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/15 pb-8">
          <div className="flex items-center gap-4">
            <img src="EIDLexit/logo.png" alt="EIDLexit logo" className="h-14 w-auto object-contain" />
            <p className="text-base font-medium uppercase tracking-[0.18em] text-white">
              Strategic Services
            </p>
          </div>
          <button
            type="button"
            aria-label="Close mobile navigation"
            onClick={() => setIsMobileNavOpen(false)}
            className="flex h-12 w-12 items-center justify-center text-2xl text-white"
          >
            ✕
          </button>
        </div>

        <nav className="mt-10 space-y-4">
          {[
            "Overview",
            "Case Progression",
            "Needed from Client",
            "Upload Packet",
            "Recent Updates",
          ].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setIsMobileNavOpen(false)}
              className="flex w-full items-center justify-between rounded-[5px] border border-white/10 bg-white/5 px-7 py-6 text-left text-base font-medium text-slate-100 transition hover:bg-white/10"
            >
              <span>{item}</span>
              <span className="text-2xl text-slate-300">›</span>
            </button>
          ))}
        </nav>

        <div className="mt-12 rounded-[5px] border border-white/15 bg-white/5 p-7">
          <p className="text-base font-medium uppercase tracking-[0.18em] text-slate-300">
            Client Profile
          </p>
          <p className="mt-4 text-2xl font-semibold text-white">Jordan Martinez</p>
          <p className="mt-2 text-base text-slate-200">Case #EIDL-2048</p>
        </div>
      </aside>
    </div>
  );
}
