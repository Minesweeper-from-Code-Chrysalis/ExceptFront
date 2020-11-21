import React from "react";
import "../styles/allShops.css";

export default function AllShops(props) {

  const items = [];
  items.push(
    <div className="search-result">
      <a className="search-result-count">検索結果 {props.allShops[0].length}件</a>
    </div>
  );
  for (let key in props.allShops[0]) {
    const shop = props.allShops[0][key];
    items.push(
      <div className="shop" key={key} onClick={() => {
        props.setSelectedShop(shop);
      }}>
        <p>{shop.name}</p>
        <p>{shop.category}</p>
        <p>{shop.access.line}{shop.access.station}</p>
      </div>
    );
  }

  return (
    <div className="all-photos">
      {items}
    </div>
  );
}