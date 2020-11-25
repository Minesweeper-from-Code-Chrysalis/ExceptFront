import React, { useState } from "react";
import areaList from '../data/area.json';
import "../styles/search.css";

export default function Search(props) {

    const [exceptWord, setExceptWord] = useState("");
    const [areaCode, setAreaCode] = useState("");
    const [keyword, setKeyword] = useState("");

    const baseUrl = "http://localhost:3001/shops";

    const getAllShops = async () => {
        let url = baseUrl + "?areaCode=" + areaCode;

        if (exceptWord.length > 0) {
            url = url + "&exceptWord=" + encodeURIComponent(exceptWord)
        }
        if (keyword.length > 0) {
            url = url + "&keyword=" + encodeURIComponent(keyword)
        }
        const data = await fetch(url).then(res => res.json());
        props.setAllShops(prev => [...prev, data]);
    }

    // Assume only the support area Tokyo
    const pullDownElements = areaList.map(area => {
        if (area.pref.pref_name === "東京都") {
            return area.areaname_l;
        }
    }).filter(Boolean);
    const pullDownTag = [];
    for (let key in pullDownElements) {
        pullDownTag.push(
            <option key={key}>{pullDownElements[key]}</option>
        );
    }

    return (
        <div className="search-page">
            <div className="search">
                <p>お店を検索！！</p>
                <form className="search-form">
                    <p> 除外ワード：<input type="text" className="except-word" label="input1" placeholder="除外ワードを入力してください。"
                        onChange={(e) => {
                            setExceptWord(e.target.value);
                        }}
                    /></p>
                    <p>  エリア：
                    <select defaultValue="エリアを選択" onChange={(e) => {
                            for (const num in areaList) {
                                if (areaList[num].areaname_l === e.target.value)
                                    setAreaCode(areaList[num].areacode_l);
                            }
                        }}>
                            <option hidden>エリアを選択してください</option>
                            {pullDownTag}
                        </select>
                    </p>
                    <p> フリーワード：<input type="text" className="free-word" label="input3" placeholder="フリーワードを入力してください。"
                        onChange={(e) => {
                            setKeyword(e.target.value);
                        }} /></p>
                    <p> <button type="submit" className="submit-button"
                        onClick={() => {
                            getAllShops();
                        }
                        }>検索</button></p>
                </form>
            </div>
        </div>
    );
}