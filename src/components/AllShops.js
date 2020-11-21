import React, { useState, useEffect } from "react";
import "../styles/allShops.css";


export default function AllShops(props) {

    console.log(props.allShops);
console.log(props.allShops[0][0].name);
console.log(props.allShops[0][0].category);
console.log(props.allShops[0][0].access.line + props.allShops[0][0].access.station);
const items =[];


for (let key in props.allShops[0]) {
    items.push(
      <div className = "shop" onClick = {() =>{
        props.setSelectedShop(props.allShops[0][key]);

      }}>
      <p>{props.allShops[0][key].name}</p>
      <p>{props.allShops[0][key].category}</p>
      <p>{props.allShops[0][key].access.line}{props.allShops[0][key].access.station}</p>
      </div>
    );
  }

return (
<div>{items}</div>
);
}