import React from "react";
import "../styles/singleShop.css";


export default function SingleShop(props) {

  const baseMapUrl = "https://maps.google.co.jp/maps?output=embed&q=";
  const latitude = props.selectedShop.latitude;
  const longitude = props.selectedShop.longitude;
  const mapUrl = "https://maps.google.co.jp/maps?output=embed&q=" + latitude + "," + longitude;

  return (
    <div className="single-shop-page">
      <div className="back">
        <a className="back-to-list" onClick={() => {
          props.setSelectedShop();
          props.setCurrentView("AllShops");
        }}> 一覧に戻る</a>
      </div>
      <div className="single-shop-info">
        <p className = "singleShop-name">{props.selectedShop.name}</p>
        <p className = "category">{props.selectedShop.category}</p>
        <p className = "pr_short">{props.selectedShop.pr.pr_short}</p>
        <img className="shop-photo" src={props.selectedShop.image_url.shop_image1} alt="shop_image" />
        
        
        <table className = "table" border="1">
        <tr>
          <td className = "td_column">店舗名</td>
          <td className = "table-td">{props.selectedShop.name}</td>
        </tr>
        <tr>
        <td className = "td_column">電話番号</td>
          <td className = "table-td">{props.selectedShop.tel}</td>
        </tr>
        <tr>
        <td className = "td_column">住所</td>
          <td className = "table-td"><p>{props.selectedShop.address}</p><iframe className = "map" src = {mapUrl}></iframe></td>
        </tr>
        <tr>
        <td className = "td_column">アクセス</td>
          <td className = "table-td">{props.selectedShop.access.line}{props.selectedShop.access.station}{props.selectedShop.access.station_exit}徒歩{props.selectedShop.access.walk}分</td>
        </tr>
        <tr>
        <td className = "td_column">営業時間</td>
          <td className = "table-td">{props.selectedShop.opentime}</td>
        </tr>
        <tr>
        <td className = "td_column">店舗から</td>
          <td className = "table-td">{props.selectedShop.pr.pr_long}</td>
        </tr>
        </table>
      </div>
    </div>
  );
}