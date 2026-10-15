import { useRef, useState } from "react";
import { fileList } from "../data";
import styles from "./SidebarPanels.module.css";

export function UploadPacket() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(() => [...fileList]);

  const handleFilesSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);

    if (!selectedFiles.length) {
      return;
    }

    const nextFiles = selectedFiles.map((file) => file.name);

    setUploadedFiles((currentFiles) => [...nextFiles, ...currentFiles]);
    event.target.value = "";
  };

  return (
    <div className={styles.uploadCard}>
      <p className={styles.eyebrow}>Upload Packet</p>

      <div className={styles.dropzone}>
        <div className={styles.icon}>↑</div>
        <p className={styles.heading}>Upload supporting documents</p>
        <p className={styles.subtext}>PDF, DOCX, JPG up to 25MB each</p>

        <input
          ref={inputRef}
          type="file"
          multiple
          className={styles.hiddenInput}
          onChange={handleFilesSelected}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={styles.primaryButton}
        >
          Select Files
        </button>
      </div>

      <div className={styles.history}>
        <p className={styles.historyLabel}>Upload History</p>
        {uploadedFiles.map((file, index) => (
          <div key={`${file}-${index}`} className={styles.historyItem}>
            <span className={styles.historyName}>{file}</span>
            <span className={styles.historyStatus}>uploaded</span>
          </div>
        ))}
      </div>
    </div>
  );
}

type ClientSnapshotProps = {
  consultantName: string | null;
};

export function ClientSnapshot({ consultantName }: ClientSnapshotProps) {
  return (
    <div className={styles.snapshotCard}>
      <p className={styles.eyebrow}>Client Snapshot</p>

      <div className={styles.snapshotGrid}>
        <div>
          <p className={styles.snapshotLabel}>Next Action</p>
          <p className={styles.snapshotValue}>
            Submit payroll records and owner verification.
          </p>
        </div>

        <div>
          <p className={styles.snapshotLabel}>Consultant</p>
          <p className={styles.snapshotValue}>{consultantName ?? "Not assigned"}</p>
        </div>

        <div>
          <p className={styles.snapshotLabel}>Notifications</p>
          <p className={styles.snapshotValue}>Email alerts enabled</p>
        </div>
      </div>
    </div>
  );
}
