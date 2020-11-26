import React from "react";
import PropTypes from "prop-types";
import "../styles/singleShop.css";

export default function SingleShop(props) {
  const { selectedShop, setSelectedShop, setCurrentView } = props;
  const {latitude} = selectedShop;
  const {longitude} = selectedShop;
  const mapUrl =
    `https://maps.google.co.jp/maps?output=embed&q=${ 
    latitude 
    },${ 
    longitude}`;
    console.log(selectedShop.url);
  return (
    <div className="single-shop-page">
      <div className="back">
        <font
          className="back-to-list"
          role="presentation"
          onClick={() => {
            setSelectedShop();
            setCurrentView("AllShops");
          }}
          onKeyDown={() => {
            setSelectedShop();
            setCurrentView("AllShops");
          }}
        >
          {" "}
          一覧に戻る
        </font>
      </div>
      <div className="single-shop-info">
        <p className="singleShop-name">{selectedShop.name}</p>
        <p className="category">{selectedShop.category}</p>
        <p className="pr_short">{selectedShop.pr.pr_short}</p>
        <img
          className="shop-photo"
          src={selectedShop.image_url.shop_image1}
          alt="shop_image"
        />

        <table className="table" border="1">
          <tr>
            <td className="td_column">店舗名</td>
            <td className="table-td"><a href={selectedShop.url} target="_blank" rel="noreferrer">{selectedShop.name}</a></td>
          </tr>
          <tr>
            <td className="td_column">電話番号</td>
            <td className="table-td">{selectedShop.tel}</td>
          </tr>
          <tr>
            <td className="td_column">住所</td>
            <td className="table-td">
              <p>{selectedShop.address}</p>
              <iframe title="map" className="map" src={mapUrl} />
            </td>
          </tr>
          <tr>
            <td className="td_column">アクセス</td>
            <td className="table-td">
              {selectedShop.access.line}
              {selectedShop.access.station}
              {selectedShop.access.station_exit}徒歩
              {selectedShop.access.walk}分
            </td>
          </tr>
          <tr>
            <td className="td_column">営業時間</td>
            <td className="table-td">{selectedShop.opentime}</td>
          </tr>
          <tr>
            <td className="td_column">店舗から</td>
            <td className="table-td">{selectedShop.pr.pr_long}</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

SingleShop.propTypes = {
  selectedShop: PropTypes.string.isRequired,
  setSelectedShop: PropTypes.func.isRequired,
  setCurrentView: PropTypes.func.isRequired,
};