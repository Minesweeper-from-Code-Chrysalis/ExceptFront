import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import './App.css';
import Search from "./components/Search";
import NavBar from "./components/NavBar";
import AllShops from "./components/AllShops";
import SingleShop from "./components/SingleShop";


function App() {
　
  const [currentView, setCurrentView] = useState(["Search"]);

  useEffect(() => {
    
  }, []);


  return (
    <div className="App">
     <NavBar
      setCurrentView = {setCurrentView}/>

     {String(currentView).valueOf() === "Search" && (
     <Search
     setCurrentView = {setCurrentView}
     />
     )}
      {String(currentView).valueOf() === "AllShops" && (
     <AllShops
     setCurrentView = {setCurrentView}/>

      )}

       {String(currentView).valueOf() === "SingleShop" && (
     <SingleShop/>
       )}

       
    </div>
  );
}

export default App;
