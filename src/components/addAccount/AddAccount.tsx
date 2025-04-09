import React, { useState } from "react";
import styles from "./AddAccount.module.css";
import axios from "axios";

type ChildProps = {
  addAccount: () => void;
};

const AddAccount = ({ addAccount }: ChildProps) => {
  const [name, setName] = useState<string>("");
  const [igUserName, setIgUserName] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");

  const jsonData = {
    name: name,
    ig_user_id: igUserName,
    access_token: accessToken,
  };

  const createAc = async () => {
    axios
      .post(
        "https://neat-eel-comic.ngrok-free.app/api/v1/instagram_account/create",
        jsonData,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      )
      .then((res) => {
        if (res) {
          addAccount();
        }
      });
  };

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div style={{ flexGrow: "1" }} className={styles.input}>
          <span>이름</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div style={{ flexGrow: "1" }} className={styles.input}>
          <span>유저 아이디</span>
          <input
            type="text"
            value={igUserName}
            onChange={(e) => setIgUserName(e.target.value)}
          ></input>
        </div>
        <div style={{ flexGrow: "1" }} className={styles.input}>
          <span>토큰</span>
          <input
            type="text"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
          ></input>
        </div>
        <div className={styles.buttonBox}>
          <span
            onClick={createAc}
            className={`${styles.button} ${styles.blue}`}
          >
            계정 생성하기
          </span>
          <span
            onClick={addAccount}
            className={`${styles.button} ${styles.gray}`}
          >
            닫기
          </span>
        </div>
      </div>
    </div>
  );
};

export default AddAccount;
