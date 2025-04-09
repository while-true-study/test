import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import axios from "axios";
import { useAccountStore } from "../stores/acccountStore";
import AddAccount from "./addAccount/AddAccount";

interface InstagramAccount {
  id: number;
  name: string;
  ig_user_id: string;
}

const Header = () => {
  const [createAcView, setCreateAcView] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<InstagramAccount[]>([]);
  const setSelectedAccount = useAccountStore(
    (state) => state.setSelectedAccount
  );

  const account = () => {
    console.log("asd");
  };

  const addAccount = () => {
    setCreateAcView(!createAcView);
  };

  useEffect(() => {
    axios
      .get(
        "https://neat-eel-comic.ngrok-free.app/api/v1/instagram_account/list",
        {
          params: {
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
        setAccounts(res.data);
        if (res.data.length > 0) {
          // 초기 선택
          setSelectedAccount({
            id: res.data[0].id,
            ig_user_id: res.data[0].ig_user_id,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setSelectedAccount]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = accounts.find(
      (acc: InstagramAccount) => acc.ig_user_id === e.target.value
    );
    if (selected) {
      setSelectedAccount({ id: selected.id, ig_user_id: selected.ig_user_id });
    }
  };

  return (
    <div className={styles.wrapper}>
      {createAcView ? <AddAccount addAccount={addAccount}></AddAccount> : ""}
      <span className={styles.title}>인스타그램 릴스 자동등록</span>
      <div className={styles.content}>
        <div style={{ flexGrow: "1" }}>
          <span>계정:</span>
          <select className={styles.selBox} onChange={handleSelectChange}>
            {accounts.map((acc: InstagramAccount) => (
              <option key={acc.id} value={acc.ig_user_id}>
                {acc.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.accountBox}>
          <span className={`${styles.account} ${styles.box}`} onClick={account}>
            계정 관리
          </span>
          <span
            className={`${styles.box} ${styles.addAccount} `}
            onClick={addAccount}
          >
            계정 추가
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
