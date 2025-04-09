import React, { useState } from "react";
import styles from "./SoloReels.module.css";
import VideoDropzone from "../VideoDropzone/VideoDropzone";
import { useAccountStore } from "../../stores/acccountStore";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const SoloReels = () => {
  const [caption, setCaption] = useState<string>(""); // 캡션
  const [videoFile, setVideoFile] = useState<File | null>(null); // 영상 파일
  const [time, setTime] = useState<string>(""); // 날짜
  const [date, setDate] = useState<string>(""); // 시간
  const [loading, setLoading] = useState<boolean>(true);

  const initData = () => {
    setDate("");
    setTime("");
    setVideoFile(null);
    setCaption("");
  };

  const selectedAccount = useAccountStore((state) => state.selectedAccount);

  const boradButtonClick = async () => {
    setLoading(true);
    const combinedDateTime = new Date(`${date}T${time}:00`);
    const datetimeString = combinedDateTime.toISOString();

    const formData = new FormData();
    if (videoFile) {
      formData.append("video", videoFile);
    }
    formData.append("caption", caption);
    formData.append("scheduled_at", datetimeString);
    if (!selectedAccount) {
      return;
    }
    formData.append("instagram_account_id", selectedAccount.id.toString());

    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    try {
      await axios
        .post(
          "https://neat-eel-comic.ngrok-free.app/api/v1/reels_scheduler/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "ngrok-skip-browser-warning": "69420",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
        });
    } catch (err) {
      console.log("실패", err);
    } finally {
      setLoading(false);
      initData();
    }
  };

  // const isActiveButton =

  return (
    <div className={styles.content}>
      <div style={{ padding: "20px" }}>
        <p className={styles.title}>릴스 예약하기</p>
      </div>
      <hr style={{ border: "1px solid rgba(0, 0, 0, 0.2)" }}></hr>
      <div style={{ padding: "20px" }}>
        <VideoDropzone onChange={(file) => setVideoFile(file)} />
        <div>
          <p style={{ marginTop: "10px", marginBottom: "10px" }}>캡션</p>
          <textarea
            className={styles.textarea}
            onChange={(e) => setCaption(e.target.value)}
            value={caption}
          ></textarea>
        </div>
        <div className={styles.flexBox}>
          <div style={{ flexGrow: "1" }}>
            <p>날짜</p>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={styles.box}
            ></input>
          </div>
          <div style={{ flexGrow: "1" }}>
            <p>시간</p>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={styles.box}
            ></input>
          </div>
        </div>
        <button
          className={styles.reelsbutton}
          onClick={boradButtonClick}
          disabled={loading}
        >
          {loading ? "업로드 중..." : "릴스 예약하기"}
        </button>
        {loading && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 9999,
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <ClipLoader size={35} color="#666" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SoloReels;
