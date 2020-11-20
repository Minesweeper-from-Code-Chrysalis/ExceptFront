import React, { useState, useEffect } from "react";


export default function NavBar(props) {

return (
<div className ="NavBar">
    <a href="#home" onClick={ () =>{
      props.setCurrentView("Search");
      props.setAllShops([]);
        }
    } >HOME</a>
</div>
);
}