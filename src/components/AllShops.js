import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardMedia, Grid, Typography } from "@material-ui/core";
import TrainIcon from "@material-ui/icons/Train";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import NoImage from "../images/no_image.png";

export default function AllShops(props) {
  const items = [];
  const { allShops, setSelectedShop } = props;

  if (allShops[0].length) {
    Object.entries(allShops[0]).map(([key, value]) => {
      const shop = value;
      return items.push(
        <Grid
          item
          container
          xs={12}
          sm={6}
          md={6}
          lg={4}
          xl={4}
          className="shop"
          key={key}
          direction="row"
          justify="center"
          alignItems="stretch"
          role="presentation"
          onClick={() => {
            setSelectedShop(shop);
          }}
          onKeyDown={() => {
            setSelectedShop(shop);
          }}
        >
          <Card style={{ color: "#fff", backgroundColor: "#383737", height: "100%", width: "100%" }}>
            <CardMedia style={{ height: 200 }} image={!shop.image_url.shop_image1 ? NoImage : shop.image_url.shop_image1} title="shop_image" />
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom noWrap>
                {shop.name}
              </Typography>
              <Grid container direction="row" justify="center" spacing={3}>
                <Grid
                  item
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <TrainIcon
                    style={{
                      marginRight: "5px",
                    }}
                  />
                  {shop.access.station}
                </Grid>
                <Grid
                  item
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <DirectionsWalkIcon
                    style={{
                      marginRight: "5px",
                    }}
                  />
                  {shop.access.walk}
                  {"分"}
                </Grid>
                <Grid
                  item
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <MonetizationOnIcon
                    style={{
                      marginRight: "5px",
                    }}
                  />
                  {shop.budget}円
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      );
    });
  } else {
    items.push(
      <Grid item container xs={12} className="shop" direction="row" justify="center" alignItems="center" role="presentation">
        <Card style={{ color: "#fff", backgroundColor: "#383737", height: "100%", width: "100%" }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              検索結果がありません
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
    return items;
  }

  return (
    <Grid
      container
      style={{
        backgroundColor: "#252627",
        padding: "30px",
      }}
    >
      <Grid item md={2} />
      <Grid container item md={8} spacing={5} justify="center">
        {items}
      </Grid>
      <Grid item md={2} />
    </Grid>
  );
}

AllShops.propTypes = {
  allShops: PropTypes.string.isRequired,
  setSelectedShop: PropTypes.func.isRequired,
};
