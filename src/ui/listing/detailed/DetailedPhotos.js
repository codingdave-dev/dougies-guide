import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const DetailedPhotos = ({ listing, classes, openDialog }) => {
  return (
    <Fragment>
      <Grid item container direction={"column"}>
        <Grid item>
          <Typography variant={"body1"} className={classes.listingTextTitle}>
            Photos:
          </Typography>
        </Grid>
        {listing.photos.length < 1 && (
          <Grid item style={{ marginTop: 20 }}>
            <Typography variant={"subtitle2"}>No Photos!</Typography>
          </Grid>
        )}
        <Grid item container spacing={1} style={{ marginTop: 4 }}>
          {listing.photos &&
            listing.photos.map((photo, index) => (
              <Grid
                key={photo.id}
                item
                style={{cursor: 'pointer'}}
                onClick={() => openDialog("ListingPhotosDialog", {
                  index: index,
                  listing: listing,
                  listingPhotos: listing.photos,
                })}
              >
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
