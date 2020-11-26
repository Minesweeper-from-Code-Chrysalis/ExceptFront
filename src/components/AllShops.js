import React from "react";
import "../styles/allShops.css";
import PropTypes from "prop-types";

export default function AllShops(props) {
  const items = [];
  const { allShops, setSelectedShop } = props;
  items.push(
    <div className="search-result">
      <font className="search-result-count">
        検索結果 {allShops[0].length}件
      </font>
    </div>
  );
  Object.entries(allShops[0]).map(([key, value]) => {
    const shop = value;
    return items.push(
      <div
        className="shop"
        key={key}
        role="presentation"
        onClick={() => {
          setSelectedShop(shop);
        }}
        onKeyDown={() => {
          setSelectedShop(shop);
        }}
      >
        <section className="table-font">
          <img
            className="shop-photos"
            src={shop.image_url.shop_image1}
            alt="shop_image"
          />
          <p className="shop-name">{shop.name}</p>
          <p className="genre">ジャンル：{shop.category}</p>
          <p>
            最寄り駅：{shop.access.line}
            {shop.access.station}
          </p>
          <p>{shop.pr.pr_short}</p>
        </section>
      </div>
    );
  });

  console.log(allShops[0][1]);

  return <div>{items}</div>;
}

AllShops.propTypes = {
  allShops: PropTypes.string.isRequired,
  setSelectedShop: PropTypes.func.isRequired,
};