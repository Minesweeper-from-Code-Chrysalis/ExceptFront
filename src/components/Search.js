import React, { useState, useEffect } from "react";


export default function Search(props) {

    const [exceptWord, setExceptWord] = useState("")
    const [area, setArea] = useState("")
    const [freeWord, setFreeWord] = useState("")

    const url = "http://localhost:3000/shops?areaCode=AREAS5502&keyword=%E7%84%BC%E8%82%89&exceptWord=%E7%85%99";

    const getAllShops = async event => {
        console.log("API呼び出します！");
        console.log("【除外ワード】");
        console.log(exceptWord);
        console.log("【エリア】");
        console.log(area);
        console.log("【フリーワード】");
        console.log(freeWord);

       const shops = await fetch(url);
       const data = await shops.json();
       console.log(data);

       console.log(props.setAllShops);
      // props.setAllShops(prev =>[...prev, data]);
    }



    return (
        <div>
            <p>お店を検索！！</p>
            <form className="search-form">
                <p> 除外ワード：<input type="text" className="except-word" label="input1" labelName="except-word" placeholder="除外ワードを入力してください。"
                    onChange={(e) => {
                        //console.log(e.target.value);
                        setExceptWord(e.target.value);
                    }}
                /></p>
                <p>  エリア：<input type="text" className="area-word" label="input2" labelName="area-word" placeholder="エリアを入力してください。"
                    onChange={(e) => {
                       // console.log(e.target.value);
                        setArea(e.target.value);
                    }} /></p>
                <p> フリーワード：<input type="text" className="free-word" label="input3" labelName="free-word" placeholder="フリーワードを入力してください。"
                    onChange={(e) => {
                       // console.log(e.target.value);
                        setFreeWord(e.target.value);
                    }} /></p>
                <p> <button type="submit" className="submit-button"
                    onClick={() => {
                        getAllShops()
                        //props.setCurrentView("AllShops")
                    }
                    }>検索ボタン</button></p>
            </form>
        </div>




    );
}