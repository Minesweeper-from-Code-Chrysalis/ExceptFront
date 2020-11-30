import React, { useState, useEffect } from "react";
import './App.css';
import Search from "./components/Search";
import NavBar from "./components/NavBar";
import AllShops from "./components/AllShops";
import SingleShop from "./components/SingleShop";
import Error from "./components/Error";

function App() {
  const [currentView, setCurrentView] = useState(["Search"]);
  const [allShops, setAllShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState();


  useEffect(() => {
    if (selectedShop !== undefined) {
      setCurrentView("SingleShop");
    } else if (allShops.length > 0) {
      setCurrentView("AllShops")
    }
  }, [allShops.length, selectedShop]);
  return (
    
    <div className="App">

      <NavBar
        setCurrentView={setCurrentView}
        setAllShops={setAllShops}
        setSelectedShop={setSelectedShop}
      />
      {(String(currentView).valueOf() === "Search" || String(currentView).valueOf() === "AllShops") && (
        <Search
          setCurrentView={setCurrentView}
          allShops={allShops}
          setAllShops={setAllShops}
        />
      )}
      {String(currentView).valueOf() === "AllShops" && (
        <AllShops
          setCurrentView={setCurrentView}
          allShops={allShops}
          setSelectedShop={setSelectedShop}
        />
      )}
      {String(currentView).valueOf() === "SingleShop" && (
        <SingleShop
          selectedShop={selectedShop}
          setSelectedShop={setSelectedShop}
          setCurrentView={setCurrentView}
        />
      )}
       {String(currentView).valueOf() === "Error" && (
        <Error
        setCurrentView={setCurrentView}
        setAllShops={setAllShops}
        setSelectedShop={setSelectedShop}
        />
      )}
      <div id="page_top"><a href="#">a</a></div>
    </div>
  );
}

export default App;
