import React from "react";

export default function NavBar(props) {
  return (
    <div className="NavBar">
      <a href="#home" onClick={() => {
        props.setAllShops([]);
        props.setSelectedShop();
        props.setCurrentView("Search");
      }}>Home</a>
    </div>
  );
}