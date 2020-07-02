import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const DetailedDescription = ({ listing, classes }) => {
  return (
    <Fragment>
      <Grid item container direction={"column"}>
        <Grid item>
          <Typography variant={"body1"} className={classes.listingTextTitle}>
            Description:
          </Typography>
        </Grid>
        <Grid item style={{ marginTop: 4 }}>
          <Typography variant={"body1"} className={classes.listingText}>
            {listing.description}
          </Typography>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default DetailedDescription;
