import React, { useState, DragEvent, ChangeEvent } from "react";
import styles from "./VideoDropzone.module.css";
import { Upload } from "lucide-react";

type VideoDropzoneProps = {
  onChange: (file: File | null) => void;
};

const VideoDropzone = ({ onChange }: VideoDropzoneProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (selectedFile: File | null) => {
    setFile(selectedFile);
    onChange(selectedFile);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("video/")) {
      handleFileSelect(droppedFile);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("video/")) {
      handleFileSelect(selectedFile);
    }
  };

  const handleReset = () => {
    handleFileSelect(null);
    const input = document.getElementById("fileInput") as HTMLInputElement;
    if (input) input.value = "";
  };

  return (
    <div>
      <div
        className={`${styles.dropzone} ${dragActive ? styles.active : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        <div className={styles.icon}>
          <Upload size={50} color="#007aff" />
        </div>
        <p>영상 파일을 선택하거나 여기에 드롭하세요</p>
      </div>

      <input
        id="fileInput"
        type="file"
        accept="video/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {file && (
        <div className={styles.curVideo}>
          <p style={{ fontSize: "14px" }}>▶️ {file.name}</p>
          <button className={styles.changeBtn} onClick={handleReset}>
            제거
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoDropzone;
