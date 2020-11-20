import React, { useState, useEffect } from "react";


export default function Search(props) {

    const [exceptWord, setExceptWord] = useState("")
    const [area, setArea] = useState("")
    const [keyword, setKeyword] = useState("")

    const baseUrl = "http://localhost:3000/shops";

    const getAllShops = async event => {
        console.log("API呼び出します！");
        console.log("【除外ワード】");
        console.log(exceptWord);
        console.log("【エリア】");
        console.log(area);
        console.log("【フリーワード】");
        console.log(keyword);

        const areaCode = "AREAL2107";
        let url = baseUrl + "?areaCode="+areaCode;

        if (exceptWord.length > 0){
            console.log("除外ワード");
            url = url + "&exceptWord=" + encodeURIComponent(exceptWord)
        }
        if (keyword.length > 0){
            console.log("キーワード");
            url = url +"&keyword"+encodeURIComponent(keyword)
        }
        
    
    console.log(url);
       const shops = await fetch(url);
       const data = await shops.json();
       console.log(data);

       //console.log(props.setAllShops);
      props.setAllShops(prev =>[...prev, data]);
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
                        setKeyword(e.target.value);
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