import React, { useState } from "react";
import PropTypes from "prop-types";
import areaList from "../data/area.json";
import "../styles/search.css";

export default function Search(props) {
  const [exceptWord, setExceptWord] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [keyword, setKeyword] = useState("");
  const { setAllShops, setCurrentView } = props;

  const baseUrl = "https://www.except-app.com/shops";

  const getAllShops = async () => {
    let url = `${baseUrl  }?areaCode=${  areaCode}`;

    if (exceptWord.length > 0) {
      url = `${url  }&exceptWord=${  encodeURIComponent(exceptWord)}`;
    }
    if (keyword.length > 0) {
      url = `${url  }&keyword=${  encodeURIComponent(keyword)}`;
    }
    const preData = await fetch(url);
    const result = await preData.status;

    if (result === 400) {
      setCurrentView("Error");
    } else {
      const data = await fetch(url).then((res) => res.json());
      setAllShops((prev) => [...prev, data]);
    }
  };

  // Assume only the support area Tokyo
  const pullDownElements = areaList
    .map((area) => {
      if (area.pref.pref_name === "東京都") {
        return area.areaname_l;
      }
      return null;
    })
    .filter(Boolean);
  const pullDownTag = [];
  Object.entries(pullDownElements).map(([key, value]) => {
    return pullDownTag.push(<option key={key}>{value}</option>);
  });

  return (
    <div className="search-page">
      <div className="search">
        <p className="top-message">お店を検索</p>
        <form className="search-form">
          <div className="except">
            <p>
              {" "}
              除外ワード：
              <input
                type="text"
                className="word"
                label="input1"
                placeholder="除外ワードを入力してください"
                onChange={(e) => {
                  setExceptWord(e.target.value);
                }}
              />
            </p>
          </div>
          <div className="key">
            <p>
              {" "}
              エリア：
              <select
                className="word"
                onChange={(e) => {
                  Object.entries(areaList).map(([, value]) => {
                    if (value.areaname_l === e.target.value)
                      return setAreaCode(value.areacode_l);
                    return null;
                  });
                }}
              >
                <option hidden>エリアを選択してください</option>
                {pullDownTag}
              </select>
            </p>
            <p>
              {" "}
              フリーワード：
              <input
                type="text"
                className="word"
                label="input3"
                placeholder="フリーワードを入力してください"
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
              />
            </p>
          </div>
          <p>
            {" "}
            <button
              type="submit"
              className="submit-button"
              onClick={() => {
                getAllShops();
              }}
            >
              <span>検索</span>
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

Search.propTypes = {
    setAllShops: PropTypes.func.isRequired,
    setCurrentView: PropTypes.func.isRequired,
};