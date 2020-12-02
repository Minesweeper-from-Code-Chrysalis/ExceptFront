import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardMedia, Grid, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import TrainIcon from "@material-ui/icons/Train";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";

const useStyles = makeStyles(() => ({
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
    width: 100,
  },
}));

export default function MbAllShops(props) {
  const classes = useStyles();
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
        style={{paddingBottom: "4px"}}
      >
        <Card className={classes.root} style={{ backgroundColor: "#383737", height: "100%"}}>
          <CardMedia className={classes.cover} image={shop.image_url.shop_image1} title="shop_image" />
          <div className={classes.details}>
          <CardContent className={classes.content}>
            <div style={{overflow: "hidden", textOverflow: "ellipsis", width: '14rem', fontSize: 12}}> 
            <Typography variant="body2" component="body2" 
            // noWrap
            >
              {shop.name}
            </Typography>
            <Grid container direction="row" alignItems="center" justify="left" spacing={0}>
              <Grid item>
                <TrainIcon fontSize="small"/>
              </Grid>
              <Grid>
                {shop.access.station}
              </Grid>
              <Grid item>
                <DirectionsWalkIcon fontSize="small" />
              </Grid>
              <Grid>
                {shop.access.walk}
                {"分"}
              </Grid>
              <Grid item>
                <MonetizationOnIcon fontSize="small" />
              </Grid>
              <Grid>
                {shop.budget}円
              </Grid>
            </Grid>
            </div>
          </CardContent>
          </div>
        </Card>
      </Grid>
    );
  });

  return (
   <div style={{padding:"5px", backgroundColor: "#252627"}}>
      <Grid container item xs={12} justify="center">
        {items}
      </Grid>
    </div>
  );
}

MbAllShops.propTypes = {
  allShops: PropTypes.string.isRequired,
  setSelectedShop: PropTypes.func.isRequired,
};
