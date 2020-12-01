import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardMedia, Grid, Typography } from "@material-ui/core";
import TrainIcon from "@material-ui/icons/Train";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";

export default function AllShops(props) {
  const items = [];
  const { allShops, setSelectedShop } = props;

  Object.entries(allShops[0]).map(([key, value]) => {
    const shop = value;
    return items.push(
      <Grid
        item
        sm={12}
        md={4}
        className="shop"
        key={key}
        role="presentation"
        onClick={() => {
          setSelectedShop(shop);
        }}
        onKeyDown={() => {
          setSelectedShop(shop);
        }}
      >
        <Card style={{ color: "#fff", backgroundColor: "#383737", height: "100%" }}>
          <CardMedia style={{ height: 200 }} image={shop.image_url.shop_image1} title="shop_image" />
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom noWrap>
              {shop.name}
            </Typography>
            <Grid container direction="row" alignItems="center" justify="center" spacing={5}>
              <Grid item>
                <TrainIcon />
                {shop.access.station}
              </Grid>
              <Grid item>
                <DirectionsWalkIcon />
                {shop.access.walk}
                {"分"}
              </Grid>
              <Grid item>
                <MonetizationOnIcon />
                {shop.budget}円
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    );
  });

  return (
    <Grid
      container
      style={{
        backgroundColor: "#252627",
        padding: "30px 0",
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
