import React from "react";
import "../styles/error.css";
import PropTypes from "prop-types";

export default function Error(props) {
  const { setAllShops, setSelectedShop, setCurrentView } = props;
  return (
    <div className="Error">
      <p className="font">条件に一致するお店がありませんでした。</p>
      <p className="font">検索ワードを確認してください。</p>
      <button
        type="button"
        className="return-top"
        onClick={() => {
          setAllShops([]);
          setSelectedShop();
          setCurrentView("Search");
        }}
      >
        <span>トップページに戻る</span>
      </button>
    </div>
  );
}

Error.propTypes = {
  setAllShops: PropTypes.func.isRequired,
  setSelectedShop: PropTypes.func.isRequired,
  setCurrentView: PropTypes.func.isRequired,
};