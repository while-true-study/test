import { useEffect, useState } from "react";
import "./TabMenu.css";
import axios from "axios";

type TabMenuProps = {
  selected: number;
  onChange: (index: number) => void;
};

const TabMenu = ({ selected, onChange }: TabMenuProps) => {
  const tabs = ["단일 릴스 예약", "일괄 예약", "예약된 릴스"];

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
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="tab-wrapper">
      <div className="tab-background">
        <div
          className="tab-highlight"
          style={{ left: `${selected * 33.3333}%` }}
        />
        {tabs.map((label, index) => (
          <button
            key={label}
            className={`tab-button ${selected === index ? "active" : ""}`}
            onClick={() => onChange(index)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabMenu;
