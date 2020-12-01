import React, { useState, useEffect } from "react";
import "./App.css";
import { Grid, Typography, Link } from "@material-ui/core";
import Search from "./components/Search";
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
      setCurrentView("AllShops");
    }
  }, [allShops.length, selectedShop]);
  return (
    <Grid container alignItems="center" className="App">
      {(String(currentView).valueOf() === "Search" || String(currentView).valueOf() === "AllShops") && (
        <Search setCurrentView={setCurrentView} allShops={allShops} setAllShops={setAllShops} setSelectedShop={setSelectedShop} />
      )}
      {String(currentView).valueOf() === "AllShops" && <AllShops setCurrentView={setCurrentView} allShops={allShops} setSelectedShop={setSelectedShop} />}
      {String(currentView).valueOf() === "SingleShop" && <SingleShop selectedShop={selectedShop} setSelectedShop={setSelectedShop} setCurrentView={setCurrentView} />}
      {String(currentView).valueOf() === "Error" && <Error setCurrentView={setCurrentView} setAllShops={setAllShops} setSelectedShop={setSelectedShop} />}
      <Grid id="page_top" item xs={12}>
        <a href="#">
          <i />
        </a>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © Teleto"}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        Supported by
        <Link color="inherit" href="https://api.gnavi.co.jp/api/scope/" target="_blank">
          ぐるなびWebService
        </Link>
      </Grid>
    </Grid>
  );
}

export default App;
