import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAccountStore } from "../../stores/acccountStore";
import dayjs from "dayjs";
import styles from "./ReserveReels.module.css";

interface ReserveReelsData {
  id: string;
  instagram_account_id: number;
  video_url: string;
  caption: string;
  status: string;
  scheduled_at: string;
}

const ReserveReels = () => {
  const statusMap: { [key: string]: string } = {
    scheduled: "예약됨",
    uploading: "업로드 중",
    posted: "업로드 완료",
    failed: "업로드 실패",
    canceled: "취소됨",
  };

  const [reserveReels, setReserveReels] = useState<ReserveReelsData[]>([]);
  const setSelectedAccount = useAccountStore((state) => state.selectedAccount);
  useEffect(() => {
    axios
      .get(
        "https://neat-eel-comic.ngrok-free.app/api/v1/reels_scheduler/list",
        {
          params: {
            instagram_account_id: setSelectedAccount?.id,
            skip: 0,
            limit: 100,
          },
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      )
      .then((res) => {
        setReserveReels(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setSelectedAccount]);

  return (
    <div>
      <div>
        <table
          className={styles.table}
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "gray",
                color: "#fff",
                textAlign: "left",
              }}
            >
              <th style={{ width: "5%" }}>No</th>
              <th style={{ width: "20%" }}>릴스</th>
              <th style={{ width: "20%" }}>본문 내용</th>
              <th style={{ width: "20%" }}>예약 일시</th>
              <th style={{ width: "10%" }}>상태</th>
            </tr>
          </thead>
          <tbody>
            {reserveReels.map((row, index) => (
              <tr key={row.id} style={{ height: "75px" }}>
                <td>
                  <span className={styles.circle}>{index + 1}</span>
                </td>
                <td>{row.video_url}</td>
                <td>{row.caption}</td>
                <td>{dayjs(row.scheduled_at).format("YYYY-MM-DD HH:mm")}</td>
                <td className={styles.statusBox}>
                  <span className={styles.status}>
                    {statusMap[row.status] || row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReserveReels;
