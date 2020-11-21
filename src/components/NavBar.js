import React from "react";
import "../styles/navBar.css";

export default function NavBar(props) {
  return (
    <div className="NavBar">
      <a className="home" onClick={() => {
        props.setAllShops([]);
        props.setSelectedShop();
        props.setCurrentView("Search");
      }}>Home</a>
    </div>
  );
}