import React from "react";
import Icon from '../images/icon.png'
import "../styles/error.css";

export default function Error(props) {
  return (
    <div className="Error">
     <p className = "font">条件に一致するお店がありませんでした。</p>
     <p className = "font">検索ワードを確認してください。</p>
     <button className="return-top" onClick={() => {
        props.setAllShops([]);
        props.setSelectedShop();
        props.setCurrentView("Search");
      }}><span>トップページに戻る</span></button>
    </div>
  );
}