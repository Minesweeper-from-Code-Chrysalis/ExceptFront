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
        <p>{props.selectedShop.category}</p>
        <p>{props.selectedShop.opentime}</p>
        <p>{props.selectedShop.access.line}{props.selectedShop.access.station}</p>
        <img className="shop-photo" src={props.selectedShop.image_url.shop_image1} alt="shop_image" />
        <table className = "table" border="2">
        <tr>
          <td>住所</td>
          <td><iframe className = "map" src = {mapUrl}></iframe></td>
        </tr>
        </table>
      </div>
    </div>
  );
}