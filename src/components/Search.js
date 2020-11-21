import React, { useState } from "react";

export default function Search(props) {

    const [exceptWord, setExceptWord] = useState("");
    const [area, setArea] = useState("");
    const [keyword, setKeyword] = useState("");

    const baseUrl = "http://localhost:3001/shops";

    const getAllShops = async () => {
        const areaCode = "AREAL5500";
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

    return (
        <div>
            <p>お店を検索！！</p>
            <form className="search-form">
                <p> 除外ワード：<input type="text" className="except-word" label="input1" placeholder="除外ワードを入力してください。"
                    onChange={(e) => {
                        setExceptWord(e.target.value);
                    }}
                /></p>
                <p>  エリア：<input type="text" className="area-word" label="input2" placeholder="エリアを入力してください。"
                    onChange={(e) => {
                        setArea(e.target.value);
                    }} /></p>
                <p> フリーワード：<input type="text" className="free-word" label="input3" placeholder="フリーワードを入力してください。"
                    onChange={(e) => {
                        setKeyword(e.target.value);
                    }} /></p>
                <p> <button type="submit" className="submit-button"
                    onClick={() => {
                        getAllShops();
                    }
                    }>検索ボタン</button></p>
            </form>
        </div>
    );
}