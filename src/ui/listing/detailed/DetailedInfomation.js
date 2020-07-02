import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const DetailedInfomation = ({ listing, classes }) => {
  const topMargin = 8;
  const leftMargin = 8;

  const information = [
    {
      key: "category",
      text: "Category",
      value: listing.category ? listing.category : 'N/A',
    },
    {
      key: "cost",
      text: "Cost",
      value: listing.cost ? listing.cost : 'N/A',
    },
    {
      key: "smoking",
      text: "Smoking",
      value: listing.smoking ? listing.smoking : 'N/A',
    },
    {
      key: "takeout/delivery",
      text: "Takeout / Delivery",
      value: listing.takeoutDelivery ? listing.takeoutDelivery : 'N/A',
    },
  ];

  return (
    <Fragment>
      <Grid item container direction={"column"}>
        <Grid item>
          <Typography variant={"body1"} className={classes.listingTextTitle}>
            Information:
          </Typography>
        </Grid>
        {information &&
          information.map((info) => (
            <Grid key={info.key} item style={{ marginTop: topMargin }}>
              <Grid item container>
                <Grid item>
                  <Typography variant={"body1"} className={classes.listingText}>
                    {info.text}:
                  </Typography>
                </Grid>
                <Grid item style={{ marginLeft: leftMargin }}>
                  <Typography variant={"body1"} className={classes.listingText}>
                    {info.value}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
      </Grid>
    </Fragment>
  );
};

export default DetailedInfomation;
