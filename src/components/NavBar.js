import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import Icon from "../images/except.png";

export default function NavBar(props) {
  const { setAllShops, setSelectedShop, setCurrentView } = props;
  return (
    <Grid container item xs={12} direction="row" justify="center" style={{ backgroundColor: "#fff" }}>
      <Grid item xs={4} />
      <Grid container item justify="center" alignItems="center" xs={4}>
        <img
          src={Icon}
          width="60%"
          alt="icon"
          role="presentation"
          onClick={() => {
            setAllShops([]);
            setSelectedShop();
            setCurrentView("Search");
          }}
          onKeyDown={() => {
            setAllShops([]);
            setSelectedShop();
            setCurrentView("Search");
          }}
        />
      </Grid>
      {/* <button className = "login-button">Login</button> */}
      <Grid container item xs={4} direction="row" justify="flex-end" alignItems="center">
        <a href="https://api.gnavi.co.jp/api/scope/" target="_blank" rel="noopener noreferrer">
          <img src="https://api.gnavi.co.jp/api/img/credit/api_155_20.gif" alt="グルメ情報検索サイトぐるなび" />
        </a>
      </Grid>
    </Grid>
  );
}

NavBar.propTypes = {
  setAllShops: PropTypes.func.isRequired,
  setSelectedShop: PropTypes.func.isRequired,
  setCurrentView: PropTypes.func.isRequired,
};
