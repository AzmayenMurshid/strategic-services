import { useRouter } from "next/navigation";
import styles from "./DashboardHeader.module.css";

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
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.desktopRow}>
          <div className={styles.brand}>
            <img
              src="/EIDLexit/logo.png"
              alt="EIDLexit logo"
              className={styles.desktopLogo}
            />
            <p className={styles.brandTitle}>Strategic Services</p>
          </div>

          <div className={styles.controls}>
            <div className={styles.profileShell}>
              <button
                type="button"
                aria-label="Open client profile"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className={styles.profileTrigger}
              >
                <span className={styles.avatarLight}>
                  {initials}
                </span>

                <span className={styles.profileMeta}>
                  <span className={styles.profileLabel}>
                    {isProfileMenuOpen ? "Profile" : "Profile"}
                  </span>
                  <span className={styles.profileName}>{fullName}</span>
                </span>
              </button>

              {isProfileMenuOpen && (
                <div className={styles.menu}>
                  <div className={styles.menuHeader}>
                    <p className={styles.menuEyebrow}>Client Profile</p>
                  </div>

                  {clientProfile ? (
                    <div className={styles.menuBody}>
                      <div className={styles.menuProfile}>
                        <span className={styles.avatarBrand}>
                          {initials}
                        </span>
                        <div className={styles.menuProfileMeta}>
                          <p className={styles.menuName}>{fullName}</p>
                          <p className={styles.menuCase}>{caseLabel}</p>
                        </div>
                      </div>

                      <div className={styles.menuDetails}>
                        <div className={styles.menuDetailsList}>
                          <p>
                            <span className={styles.detailLabel}>Email:</span>{" "}
                            {clientProfile.email ?? "Not available"}
                            <br/>
                            <span className={styles.detailLabel}>Phone:</span>{" "}
                            {clientProfile.phone ?? "Not available"}
                          </p>
                        </div>
                      </div>

                      <div className={styles.logoutSection}>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className={styles.logoutButton}
                        >
                          Log out
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.menuEmpty}>
                      <p className={styles.menuEmptyText}>No client profile loaded.</p>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className={[styles.logoutButton, styles.menuEmptyButton].join(" ")}
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

        <div className={styles.mobileRow}>
          <div className={styles.mobileBrand}>
            <img
              src="/EIDLexit/logo.png"
              alt="EIDLexit logo"
              className={styles.mobileLogo}
            />
            <p className={styles.brandTitle}>Strategic Services</p>
          </div>

          <button
            type="button"
            aria-label="Open mobile navigation"
            onClick={() => setIsMobileNavOpen(true)}
            className={styles.menuButton}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
