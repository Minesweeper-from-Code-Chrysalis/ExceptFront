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
      {String(currentView).valueOf() === "Search" && (
        <Search
          setCurrentView={setCurrentView}
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
          setCurrentView={setCurrentView}
        />
      )}
      <div className="footer">
        <a href="https://api.gnavi.co.jp/api/scope/" target="_blank">
          <img src="https://api.gnavi.co.jp/api/img/credit/api_155_20.gif" width="155" height="20" border="0" alt="グルメ情報検索サイト　ぐるなび"/>
        </a>
      </div>
    </div>
  );
}

export default App;
