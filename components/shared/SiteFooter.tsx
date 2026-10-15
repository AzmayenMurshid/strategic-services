"use client";

import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <img src="/EIDLexit/logo.png" alt="EIDLexit logo" className={styles.logo} />
          <span className={styles.title}>Strategic Services</span>
        </div>
        <div className={styles.contact}>
          <span>support@eidlexit.com</span>
          <span>|</span>
          <span>(555) 204-4421</span>
        </div>
        <div className={styles.copyright}>© 2026 EIDLexit</div>
      </div>
    </footer>
  );
}
