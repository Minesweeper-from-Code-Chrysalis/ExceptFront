import React, { useState, useEffect } from "react";
import "./App.css";
import { useMediaQuery } from 'react-responsive'
import { Grid, Typography, Link } from "@material-ui/core";
import Search from "./components/Search";
import NavBar from "./components/NavBar";
import AllShops from "./components/AllShops";
import Mb_AllShops from "./components/Mb_AllShops";
import SingleShop from "./components/SingleShop";
import Error from "./components/Error";

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}
// const Tablet = ({ children }) => {
//   const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
//   return isTablet ? children : null
// }
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}
// const Default = ({ children }) => {
//   const isNotMobile = useMediaQuery({ minWidth: 768 })
//   return isNotMobile ? children : null
// }

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
    <div>
    <Desktop>
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
        <Typography variant="body2" color="textSecondary" align="center">
          Supported by
          <Link color="inherit" href="https://api.gnavi.co.jp/api/scope/" target="_blank">
            ぐるなびWebService
          </Link>
        </Typography>
      </Grid>
    </Grid>
    </Desktop>
    <Mobile>
    <Grid container alignItems="center" className="App">
      {(String(currentView).valueOf() === "Search" || String(currentView).valueOf() === "AllShops") && (
        <Search setCurrentView={setCurrentView} allShops={allShops} setAllShops={setAllShops} setSelectedShop={setSelectedShop} />
      )}
      {String(currentView).valueOf() === "AllShops" && <Mb_AllShops setCurrentView={setCurrentView} allShops={allShops} setSelectedShop={setSelectedShop} />}
      {String(currentView).valueOf() === "SingleShop" && <SingleShop selectedShop={selectedShop} setSelectedShop={setSelectedShop} setCurrentView={setCurrentView} />}
      {String(currentView).valueOf() === "Error" && <Error setCurrentView={setCurrentView} setAllShops={setAllShops} setSelectedShop={setSelectedShop} />}
      <div id="page_top">
        <a href="#">
          <i />
        </a>
      </div>
    </Grid>
    </Mobile>
    </div>
  );
}

export default App;
