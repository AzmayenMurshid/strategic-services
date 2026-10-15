import { getRequiredDocsForService } from "../data";
import styles from "./NeededFromClient.module.css";

type NeededFromClientProps = {
  onViewRequirements: () => void;
  serviceKey?: string | null;
};

export function NeededFromClient({ onViewRequirements, serviceKey }: NeededFromClientProps) {
  const requiredDocs = getRequiredDocsForService(serviceKey);

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <div>
          <p className={styles.title}>Needed from Client</p>
        </div>
        <button
          type="button"
          onClick={onViewRequirements}
          className={styles.button}
        >
          View all requirements
        </button>
      </div>

      <div className={styles.list}>
        {requiredDocs.map((doc) => (
          <div key={doc.label} className={styles.item}>
            <div>
              <p className={styles.label}>{doc.label}</p>
            </div>
            <span
              className={[
                styles.status,
                doc.tone === "green"
                  ? styles.toneGreen
                  : doc.tone === "red"
                    ? styles.toneRed
                    : doc.tone === "amber"
                      ? styles.toneAmber
                      : styles.toneDefault,
              ].join(" ")}
            >
              {doc.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
