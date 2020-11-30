import React from "react";
import "../styles/allShops.css";
import PropTypes from "prop-types";

export default function AllShops(props) {
  const items = [];
  const { allShops, setSelectedShop } = props;

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
          <p className="shop-name">{shop.name}</p>
          <img
            className="shop-photos"
            src={shop.image_url.shop_image1}
            alt="shop_image"
          />
          
          <p className="genre">ジャンル：{shop.category}</p>
          <p>
            最寄り駅：{shop.access.line}
            {shop.access.station}
          </p>
          <p>予算：{shop.budget}</p>
        </section>
      </div>
    );
  });

  return (
    <div className="flex-container">
      {items}
    </div>
  );
}

AllShops.propTypes = {
  allShops: PropTypes.string.isRequired,
  setSelectedShop: PropTypes.func.isRequired,
};