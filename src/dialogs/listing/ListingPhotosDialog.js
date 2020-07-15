import React, { useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { closeDialog } from "../../store/actions/dialogActions/dialogActions";
import { connect } from "react-redux";

import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  image: {
    width: 450,
    [theme.breakpoints.down("sm")]: {
      width: 300,
    },
  },
  icon: {
    fontSize: "4em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "3em",
    },
  },
}));

const actions = {
  closeDialog,
};

const ListingPhotosDialog = ({
  closeDialog,
  index,
  listing,
  listingPhotos,
}) => {
  const classes = useStyles();

  const [imageIndex, setImageIndex] = useState(index);
  const [photoURL, setPhotoURL] = useState(listingPhotos[imageIndex].photoURL);

  let count = 0;
  for (let i = 0; i < listingPhotos.length; ++i) {
    count++;
  }

  const handleClose = () => {
    closeDialog();
  };
  const handleForward = () => {
    if (imageIndex === count - 1) {
      setImageIndex(0);
      setPhotoURL(listingPhotos[0].photoURL);
    } else {
      setImageIndex(imageIndex + 1);
      setPhotoURL(listingPhotos[imageIndex + 1].photoURL);
    }
  };

  const handleBack = () => {
    if (imageIndex === 0) {
      setImageIndex(count - 1);
      setPhotoURL(listingPhotos[count - 1].photoURL);
    } else {
      setImageIndex(imageIndex - 1);
      setPhotoURL(listingPhotos[imageIndex - 1].photoURL);
    }
  };


  return (
    <Dialog open={true} onClose={handleClose}>
      <Grid container direction={"column"} style={{ padding: "10px" }}>
        <Grid item>
          <DialogTitle align={"center"}>{listing.title}</DialogTitle>
        </Grid>
        <Grid item>
          <img className={classes.image} src={photoURL} alt={`${listing.title} ${photoURL}`} />
        </Grid>
        <Grid item style={{ marginTop: "4em" }}>
          <Grid item container justify={"center"}>
            <Grid
              item
              style={{ marginRight: "3em", cursor: "pointer" }}
              onClick={() => handleBack()}
            >
              <ArrowBackIcon className={classes.icon} />
            </Grid>
            <Grid
              item
              style={{ marginLeft: "3em", cursor: "pointer" }}
              onClick={() => handleForward()}
            >
              <ArrowForwardIcon className={classes.icon} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default connect(null, actions)(ListingPhotosDialog);
