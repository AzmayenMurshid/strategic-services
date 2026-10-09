export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-[#152c58] text-slate-100">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-4 py-6 text-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <img src="/EIDLexit/logo.png" alt="EIDLexit logo" className="h-14 w-auto object-contain" />
          <span className="font-medium uppercase tracking-[0.2em] text-white">Strategic Services</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-slate-200">
          <span>support@eidlexit.com</span>
          <span>•</span>
          <span>(555) 204-4421</span>
        </div>
        <div className="text-slate-300">© 2026 EIDLexit</div>
      </div>
    </footer>
  );
}
