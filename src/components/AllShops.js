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
        <section>
        <img className="shop-photos" src={shop.image_url.shop_image1} alt="shop_image" />
        <p className = "shop-name">{shop.name}</p>
        <p>ジャンル：{shop.category}</p>
        <p>最寄り駅：{shop.access.line}{shop.access.station}</p>
        <p>{shop.pr.pr_short}</p>
        </section>
      </div>
    );
  }

  console.log(props.allShops[0][1]);

  return (
    <div className="all-photos">
      {items}
    </div>
  );
}