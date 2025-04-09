import React, { useState } from "react";
import styles from "./MultiReels.module.css";
import VideoDropzone from "../VideoDropzone/VideoDropzone";

type ReelItem = {
  id: number;
  file: File | null;
  caption: string;
  date: string;
  time: string;
};

const MultiReels = () => {
  const [reels, setReels] = useState<ReelItem[]>([
    { id: 1, file: null, caption: "", date: "", time: "" },
  ]);

  const handleChange = (id: number, field: keyof ReelItem, value: any) => {
    setReels((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const addReel = () => {
    const nextId = reels.length ? reels[reels.length - 1].id + 1 : 1;
    setReels([
      ...reels,
      { id: nextId, file: null, caption: "", date: "", time: "" },
    ]);
  };

  const removeReel = (id: number) => {
    setReels(reels.filter((item) => item.id !== id));
  };

  const reelsClick = () => {
    console.log("릴스 예약하기 클릭됨!");
    reels.forEach((reel, index) => {
      console.log(`릴스 ${index + 1}`);
      if (reel.file) {
        console.log("파일 이름:", reel.file.name);
        console.log("파일 타입:", reel.file.type);
      } else {
        console.log("파일 없음");
      }
      console.log("캡션:", reel.caption);
      console.log("날짜:", reel.date);
      console.log("시간:", reel.time);
    });
  };

  return (
    <div className={styles.content}>
      <div style={{ padding: "20px" }}>
        <p className={styles.title}>일괄 업로드</p>
      </div>
      <hr style={{ border: "1px solid rgba(0, 0, 0, 0.2)" }}></hr>
      {reels.map((item, index) => (
        <div key={item.id} className={styles.reelBox}>
          <div className={styles.rowHeader}>
            <span className={styles.number}>{index + 1}</span>
          </div>

          <div className={styles.reelsContent}>
            <div className={styles.uploadText}>
              <label
                className={`${styles.box} ${styles.upLoad}`}
                htmlFor={`upload-${item.id}`}
              >
                릴스 업로드
              </label>
              {item.file && (
                <span className={styles.fileName}>▶️ {item.file.name}</span>
              )}
            </div>
            <input
              id={`upload-${item.id}`}
              type="file"
              accept="video/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleChange(item.id, "file", file);
              }}
            />
            <textarea
              className={styles.textarea}
              placeholder="게시물 내용"
              value={item.caption}
              onChange={(e) => handleChange(item.id, "caption", e.target.value)}
            />
            <div className={styles.flexBox}>
              <input
                type="date"
                className={styles.box}
                value={item.date}
                onChange={(e) => handleChange(item.id, "date", e.target.value)}
              />
              <input
                type="time"
                className={styles.box}
                value={item.time}
                onChange={(e) => handleChange(item.id, "time", e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={() => removeReel(item.id)}
            className={styles.deleteBtn}
          >
            삭제
          </button>
        </div>
      ))}

      <div className={styles.center}>
        <button onClick={addReel} className={styles.addBtn}>
          +
        </button>
      </div>

      <div className={styles.buttonBox}>
        <button className={styles.reelsbutton} onClick={reelsClick}>
          예약하기
        </button>
      </div>
    </div>
  );
};

export default MultiReels;
