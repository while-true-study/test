import React, { useState, DragEvent, ChangeEvent } from "react";
import styles from "./MultiVideoDrop.module.css";
import { Upload } from "lucide-react";

type MultiVideoDropProps = {
  onDrop: (files: File[]) => void;
};

const MultiVideoDrop = ({ onDrop }: MultiVideoDropProps) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    const videoFiles = droppedFiles.filter(file => file.type.startsWith("video/"));
    if (videoFiles.length > 0) {
      onDrop(videoFiles);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const videoFiles = Array.from(selectedFiles).filter(file => file.type.startsWith("video/"));
      if (videoFiles.length > 0) {
        onDrop(videoFiles);
      }
    }
  };

  return (
    <div style={{padding:"20px"}}>
        
      <div
        className={`${styles.dropzone} ${dragActive ? styles.active : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById("multiFileInput")?.click()}
      >
        <div className={styles.icon}>
          <Upload size={50} color="#007aff" />
        </div>
        <p>영상 파일을 선택하거나 여기에 드롭하세요</p>
      </div>

      <input
        id="multiFileInput"
        type="file"
        accept="video/*"
        multiple
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default MultiVideoDrop;
