type MobileNavProps = {
  setIsMobileNavOpen: (value: boolean) => void;
  clientProfile: {
    id: string;
    firstName: string;
    lastName: string;
    email: string | null;
    phone: string | null;
  } | null;
};

import styles from "./MobileNav.module.css";

const navItems = [
  { label: "Overview", targetId: "overview" },
  { label: "Case Progression", targetId: "case-progression" },
  { label: "Needed from Client", targetId: "needed-from-client" },
  { label: "Upload Packet", targetId: "upload-packet" },
  { label: "Recent Updates", targetId: "recent-updates" },
] as const;

export function MobileNav({ setIsMobileNavOpen, clientProfile }: MobileNavProps) {
  const fullName = clientProfile
    ? `${clientProfile.firstName} ${clientProfile.lastName}`.trim()
    : "";
  const caseLabel = clientProfile?.id ? `Case #${clientProfile.id}` : "";
  const initials = fullName
    ? fullName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("")
    : "C";

  const handleNavigate = (targetId: string) => {
    setIsMobileNavOpen(false);

    const section = document.getElementById(targetId);

    if (!section) {
      return;
    }

    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={styles.overlay} onClick={() => setIsMobileNavOpen(false)}>
      <div className={styles.backdrop} />
      <aside className={styles.panel} onClick={(event) => event.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.brand}>
            <img src="/EIDLexit/logo.png" alt="EIDLexit logo" className={styles.logo} />
            <p className={styles.title}>Strategic Services</p>
          </div>
          <button
            type="button"
            aria-label="Close mobile navigation"
            onClick={() => setIsMobileNavOpen(false)}
            className={styles.closeButton}
          >
            ✕
          </button>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <button
              key={item.targetId}
              type="button"
              onClick={() => handleNavigate(item.targetId)}
              className={styles.navButton}
            >
              <span>{item.label}</span>
              <span className={styles.navArrow}>›</span>
            </button>
          ))}
        </nav>

        <div className={styles.profileCard}>
          <p className={styles.eyebrow}>Client Profile</p>
          {clientProfile ? (
            <>
              <div className={styles.profileRow}>
                <span className={styles.avatar}>
                  {initials}
                </span>
                <div>
                  <p className={styles.profileName}>{fullName}</p>
                  <p className={styles.profileCase}>{caseLabel}</p>
                </div>
              </div>

              <div className={styles.profileDetails}>
                <p>Email: {clientProfile.email ?? "Not available"}</p>
                <p>Phone: {clientProfile.phone ?? "Not available"}</p>
              </div>
            </>
          ) : (
            <p className={styles.emptyState}>No client profile loaded.</p>
          )}
        </div>
      </aside>
    </div>
  );
}
