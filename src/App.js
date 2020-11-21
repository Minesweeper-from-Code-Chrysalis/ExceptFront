import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import './App.css';
import Search from "./components/Search";
import NavBar from "./components/NavBar";
import AllShops from "./components/AllShops";
import SingleShop from "./components/SingleShop";


function App() {
  const [currentView, setCurrentView] = useState(["Search"]);
  const [allShops, setAllShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState();

  useEffect(() => {
    console.log("test");
    if (allShops.length > 0){
      setCurrentView("AllShops")
    }
  }, [allShops.length]);

  useEffect(() => {
    //console.log(selectedShop.name);
    console.log("選択された");
    if (selectedShop != undefined){
      console.log(selectedShop.name);
      setCurrentView("SingleShop")
    }
  }, [selectedShop]);

  return (
    <div className="App">
     <NavBar
      setCurrentView = {setCurrentView}
      setAllShops = {setAllShops}
      />

     {String(currentView).valueOf() === "Search" && (
     <Search
     setCurrentView = {setCurrentView}
     setAllShops = {setAllShops}
     />
     )}
      {String(currentView).valueOf() === "AllShops" && (
     <AllShops
     setCurrentView = {setCurrentView}
     allShops ={allShops}
     setSelectedShop = {setSelectedShop}
     />

      )}

       {String(currentView).valueOf() === "SingleShop" && (
     <SingleShop
     selectedShop = {selectedShop}
     />
       )}

       
    </div>
  );
}

export default App;
