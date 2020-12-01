import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardMedia, Grid, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TrainIcon from "@material-ui/icons/Train";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    // display: 'flex',
    // flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    marginTop: '-10px',
    textAlign: 'left',
    color: 'white',
  },
  cover: {
    height: 100,
    width: 101,
  },
  controls: {
    // display: 'flex',
    // alignItems: 'center',
    // paddingLeft: theme.spacing(1),
    // paddingBottom: theme.spacing(1),
  }
}));

export default function AllShops(props) {
  const classes = useStyles();
  const theme = useTheme();
  const items = [];
  const { allShops, setSelectedShop } = props;

  Object.entries(allShops[0]).map(([key, value]) => {
    const shop = value;
    return items.push(
      <Grid
        item
        xs={12}
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
        {/* <Card className={classes.root} > */}
        <Card className={classes.root} style={{ backgroundColor: "#383737", height: "100%" }}>
          <CardMedia className={classes.cover} image={shop.image_url.shop_image1} title="shop_image" />
          <div className={classes.details}>
          <CardContent className={classes.content}>
            <div style={{overflow: "hidden", textOverflow: "ellipsis", width: '12rem'}}> 
            <Typography variant="body2" component="body2" noWrap>
              {shop.name}
            </Typography>
            </div>
            {/* <Grid container direction="row" alignItems="center" justify="center" spacing={5}> */}
              {/* <Grid item>
                <TrainIcon />
                {shop.access.line}
                {shop.access.station}
              </Grid>
              <Grid item>
                <MonetizationOnIcon />
                {shop.budget}円
              </Grid> */}
            {/* </Grid> */}
          </CardContent>
          </div>
        </Card>
      </Grid>
    );
  });

  return (
    <Grid
      container
      spacing={5}
      style={{
        backgroundColor: "#fff",
      }}
    >
      <Grid item xs={2} />
      <Grid container item xs={10} spacing={5} justify="center">
        {items}
      </Grid>
      <Grid item xs={2} />
    </Grid>
  );
}

AllShops.propTypes = {
  allShops: PropTypes.string.isRequired,
  setSelectedShop: PropTypes.func.isRequired,
};
