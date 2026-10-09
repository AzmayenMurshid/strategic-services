type MobileNavProps = {
  setIsMobileNavOpen: (value: boolean) => void;
};

export function MobileNav({ setIsMobileNavOpen }: MobileNavProps) {
  return (
    <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setIsMobileNavOpen(false)}>
      <div className="fixed inset-0 bg-slate-900/50" />
      <aside
        className="fixed left-0 top-0 z-10 h-full w-[82vw] max-w-xs bg-[#152c58] p-4 text-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/15 pb-4">
          <div className="flex items-center gap-3">
            <img src="EIDLexit/logo.png" alt="EIDLexit logo" className="h-10 w-auto object-contain" />
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white">
              Strategic Services
            </p>
          </div>
          <button
            type="button"
            aria-label="Close mobile navigation"
            onClick={() => setIsMobileNavOpen(false)}
            className="flex h-8 w-8 items-center justify-center text-white"
          >
            ✕
          </button>
        </div>

        <nav className="mt-6 space-y-2">
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
              className="flex w-full items-center justify-between rounded-[5px] border border-white/10 bg-white/5 px-3 py-2 text-left text-sm font-medium text-slate-100 transition hover:bg-white/10"
            >
              <span>{item}</span>
              <span className="text-slate-300">›</span>
            </button>
          ))}
        </nav>

        <div className="mt-8 rounded-[5px] border border-white/15 bg-white/5 p-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-300">
            Client Profile
          </p>
          <p className="mt-2 text-base font-semibold text-white">Jordan Martinez</p>
          <p className="mt-1 text-sm text-slate-200">Case #EIDL-2048</p>
        </div>
      </aside>
    </div>
  );
}
