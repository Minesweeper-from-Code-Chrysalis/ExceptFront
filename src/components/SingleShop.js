import React from "react";
import PropTypes from "prop-types";
import "../styles/singleShop.css";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

export default function SingleShop(props) {
  const { selectedShop, setSelectedShop, setCurrentView } = props;
  const { latitude } = selectedShop;
  const { longitude } = selectedShop;
  const mapUrl = `https://maps.google.co.jp/maps?output=embed&q=${latitude},${longitude}`;
  return (
    <Grid item xs={12}>
      <div className="single-shop-page">
        <div className="single-shop-info">
          <div className="back">
            <Button variant="outlined" color="primary">
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
                <b>一覧に戻る</b>
              </font>
            </Button>
          </div>
          <p className="singleShop-name">{selectedShop.name}</p>
          <p className="category">{selectedShop.category}</p>
          <p className="pr_short">{selectedShop.pr.pr_short}</p>
          <img className="shop-photo" src={selectedShop.image_url.shop_image1} alt="shop_image" />

          <table>
            <tr>
              <th>店舗名</th>
              <td>
                <a href={selectedShop.url} target="_blank" rel="noreferrer">
                  {selectedShop.name}
                </a>
              </td>
            </tr>
            <tr>
              <th>電話番号</th>
              <td>{selectedShop.tel}</td>
            </tr>
            <tr>
              <th>住所</th>
              <td>
                <p>{selectedShop.address}</p>
                <iframe title="map" className="map" src={mapUrl} />
              </td>
            </tr>
            <tr>
              <th>アクセス</th>
              <td>
                {selectedShop.access.line}
                {selectedShop.access.station}
                {selectedShop.access.station_exit}徒歩
                {selectedShop.access.walk}分
              </td>
            </tr>
            <tr>
              <th>営業時間</th>
              <td>{selectedShop.opentime}</td>
            </tr>
            <tr>
              <th>店舗から</th>
              <td>{selectedShop.pr.pr_long}</td>
            </tr>
          </table>
        </div>
      </div>
    </Grid>
  );
}

SingleShop.propTypes = {
  selectedShop: PropTypes.string.isRequired,
  setSelectedShop: PropTypes.func.isRequired,
  setCurrentView: PropTypes.func.isRequired,
};
