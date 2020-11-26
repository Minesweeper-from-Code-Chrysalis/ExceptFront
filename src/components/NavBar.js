import React from "react";
import PropTypes from "prop-types";
import "../styles/navBar.css";
import Icon from "../images/icon.png";


export default function NavBar(props) {
  const { setAllShops, setSelectedShop, setCurrentView } = props;
  return (
    <div className="NavBar">
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
      {/* <button className = "login-button">Login</button> */}
    </div>
  );
}

NavBar.propTypes = {
  setAllShops: PropTypes.func.isRequired,
  setSelectedShop: PropTypes.func.isRequired,
  setCurrentView: PropTypes.func.isRequired,
};