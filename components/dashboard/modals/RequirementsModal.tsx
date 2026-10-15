import { getDocumentRequirementsForService } from "../data";
import styles from "./RequirementsModal.module.css";

type RequirementsModalProps = {
  onClose: () => void;
  serviceKey?: string | null;
};

export function RequirementsModal({ onClose, serviceKey }: RequirementsModalProps) {
  const documentRequirements = getDocumentRequirementsForService(serviceKey);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>Upload checklist</p>
            <h2 className={styles.title}>Required and recommended documents</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close requirements popup"
          >
            ✕
          </button>
        </div>

        <div className={styles.content}>
          {documentRequirements.map((doc, index) => (
            <div key={doc.label} className={styles.row}>
              <div className={styles.rowInner}>
                <div className={styles.copy}>
                  <p className={styles.label}>{doc.label}</p>
                  <p className={styles.note}>{doc.note}</p>
                </div>
                <span
                  className={[
                    styles.tag,
                    doc.type === "Required"
                      ? styles.tagRequired
                      : doc.type === "Received"
                        ? styles.tagReceived
                        : doc.type === "Recommended"
                          ? styles.tagRecommended
                          : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {doc.type}
                </span>
              </div>
              {index !== documentRequirements.length - 1 && <div className={styles.divider} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
