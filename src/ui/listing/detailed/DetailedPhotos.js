import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const DetailedPhotos = ({ listing, classes }) => {
  return (
    <Fragment>
      <Grid item container direction={"column"}>
        <Grid item>
          <Typography variant={"body1"} className={classes.listingTextTitle}>
            Photos:
          </Typography>
        </Grid>
        <Grid item container spacing={1} style={{ marginTop: 4 }}>
          {listing.photos &&
            listing.photos.map((photo) => (
              <Grid key={photo.id} item>
                <img
                  className={classes.subImage}
                  src={photo.photoURL}
                  alt={`Third Street Dive Sub Photo ${photo.photoName}`}
                />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default DetailedPhotos;
