import React, { useState } from "react";
import "../styles/allShops.css";
import PropTypes from "prop-types";

export default function AllShops(props) {
  const items = [];
  const { allShops, setSelectedShop } = props;
  const [ countBefore, setCountBefore ] = useState(0);
  const [ countAfter, setCountAfter ] = useState(0);

  if (countAfter !== allShops[0].length){
    setCountAfter(allShops[0].length);
    let priceOptions = countBefore;
    const optionsPrice = allShops[0].length;
    const timerPrice = setInterval(function(){
      if(priceOptions !== optionsPrice){
          if(priceOptions < optionsPrice){
              if (Math.round((optionsPrice - priceOptions) / 5) === 0) {
                priceOptions += 1;
              } else {
                priceOptions += Math.round((optionsPrice - priceOptions) / 5);
              }
          } else if (Math.round((priceOptions - optionsPrice) / 5) === 0) {
            priceOptions -= 1;
          } else {
            priceOptions -= Math.round((priceOptions - optionsPrice) / 5);
          }
      }else{
          clearInterval(timerPrice);
      }
      setCountBefore(priceOptions);    
     }, 70);
  }

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

  return (
    <div>
      <div className="search-result">
        <font className="search-result-count">
          検索結果 <font size="20">{countBefore}</font>件
        </font>
      </div>
      {items}
    </div>
  );
}

AllShops.propTypes = {
  allShops: PropTypes.string.isRequired,
  setSelectedShop: PropTypes.func.isRequired,
};