import { getRecentUpdatesForStage } from "../data";
import styles from "./RecentUpdates.module.css";

type RecentUpdatesProps = {
  currentStageName?: string | null;
};

export function RecentUpdates({ currentStageName }: RecentUpdatesProps) {
  const recentUpdates = getRecentUpdatesForStage(currentStageName);

  return (
    <div className={styles.card}>
      <p className={styles.eyebrow}>Recent Updates</p>

      <div className={styles.timeline}>
        {recentUpdates.map((update, index) => (
          <div key={`${update.text}-${index}`} className={styles.item}>
            {index !== recentUpdates.length - 1 && <div className={styles.line} />}
            <div className={styles.dot} />
            <div className={styles.content}>
              <div className={styles.row}>
                <p className={styles.text}>{update.text}</p>
                <span className={styles.age}>{update.age}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
