import React from "react";
import "../styles/allShops.css";

export default function AllShops(props) {

  const items = [];
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
    <div>{items}</div>
  );
}