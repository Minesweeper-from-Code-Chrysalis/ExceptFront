import React from "react";
import PropTypes from "prop-types";
import "../styles/navBar.css";
import Icon from "../images/icon.png";


export default function NavBar(props) {
  const { setAllShops, setSelectedShop, setCurrentView } = props;
  return (
    <div className="NavBar">
      <div className="imgbox">
      <img
        className="icon"
        src={Icon}
        alt="icon"
        role="presentation"
        onClick={() => {
          setAllShops([]);
          setSelectedShop();
          setCurrentView("Search");
        }}
        onKeyDown={() => {
          setAllShops([]);
          setSelectedShop();
          setCurrentView("Search");
        }}
      />
      </div>
      {/* <button className = "login-button">Login</button> */}
      <div className="gurunabi">
        <a  href="https://api.gnavi.co.jp/api/scope/" target="_blank" rel="noopener noreferrer">
          <img src="https://api.gnavi.co.jp/api/img/credit/api_155_20.gif" width="155" height="20" border="0" alt="グルメ情報検索サイト　ぐるなび"/>
        </a>
      </div>
    </div>
  );
}

NavBar.propTypes = {
  setAllShops: PropTypes.func.isRequired,
  setSelectedShop: PropTypes.func.isRequired,
  setCurrentView: PropTypes.func.isRequired,
};