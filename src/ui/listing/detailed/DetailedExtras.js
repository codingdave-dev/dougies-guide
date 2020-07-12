import React, { Fragment } from "react";

import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import DetailedActivities from "./DetailedActivities";

import DetailedEntertainment from "./DetailedEntertainment";

const DetailedExtras = ({ listing, classes }) => {
  return (
    <Fragment>
      <Grid item container direction={"column"}>
        <Grid item>
          <Typography variant={"body1"} className={classes.listingTextTitle}>
            Extras:
          </Typography>
        </Grid>
        <Grid item style={{ marginTop: "0.7em" }}>
          <Grid item container>
            <Grid item style={{marginRight: '3em'}}>
              <DetailedActivities listing={listing} classes={classes} />
            </Grid>
            <Grid item>
              <DetailedEntertainment listing={listing} classes={classes} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default DetailedExtras;
