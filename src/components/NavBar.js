import React from "react";
import "../styles/navBar.css";
import Icon from '../images/icon.png'

export default function NavBar(props) {
  return (
    <div className="NavBar">
      <img className="icon" src={Icon} alt="icon" onClick={() => {
        props.setAllShops([]);
        props.setSelectedShop();
        props.setCurrentView("Search");
      }}/>
      <button className = "login-button">Login</button>
    </div>
  );
}