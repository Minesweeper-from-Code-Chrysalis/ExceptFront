import React from "react";
import "../styles/singleShop.css";

export default function SingleShop(props) {
  return (
    <div>
      <a className="back-to-list" onClick={() => {
        props.setCurrentView("AllShops");
      }}>一覧に戻る</a>
      <p>{props.selectedShop.name}</p>
      <p>{props.selectedShop.category}</p>
      <p>{props.selectedShop.opentime}</p>
      <p>{props.selectedShop.access.line}{props.selectedShop.access.station}</p>
      <img className="single-shop" src={props.selectedShop.image_url.shop_image1} alt="shop_image" />
    </div>
  );
}