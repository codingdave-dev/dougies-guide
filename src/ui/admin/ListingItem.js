import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Router from "next/router";
import Typography from "@material-ui/core/Typography";

import format from "date-fns/format";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  image: {
    borderRadius: "5px",
    width: 100,
    [theme.breakpoints.down("md")]: {
      width: 90,
    },
    [theme.breakpoints.down("sm")]: {
      width: 80,
    },
    [theme.breakpoints.down("xs")]: {
      width: 70,
    },
  },
  listingTitle: {
    fontSize: "1.5em",
    [theme.breakpoints.down("md")]: {
      fontSize: "1.2em",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9em",
    },
  },
  listingSubText: {
    fontSize: "0.98em",
    [theme.breakpoints.down("md")]: {
      fontSize: "1em",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.7em",
    },
  },
}));

const ListingItem = ({ listing, toggleListingApprove, deleteListing, deletePhotos }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Grid
      item
      container
      style={{ marginTop: 50, flexWrap: "nowrap", cursor: "pointer" }}
    >
      <Grid
        item
        onClick={() => {
          Router.push({
            pathname: "/listing/detailed",
            query: { id: listing.id },
          });
        }}
      >
        <img
          className={classes.image}
          src={listing.photoURL}
          alt={`${listing.title} photo`}
        />
      </Grid>

      <Grid item style={{ marginLeft: 15 }}>
        <Grid item container direction={"column"}>
          <Grid item>
            <Typography variant={"h5"} className={classes.listingTitle}>
              {listing.title}
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant={"body1"} className={classes.listingSubText}>
              Added By: {listing.addedBy}
            </Typography>
          </Grid>

          <Grid item style={{ marginTop: "0.3em" }}>
            <Typography variant={"body1"} className={classes.listingSubText}>
              Created - {format(listing.createdAt.toDate(), "do LLLL yyyy")}
            </Typography>
          </Grid>

          {/*BUTTONS*/}
          <Grid item style={{ marginTop: "0.8em" }}>
            <Grid item container>
              <Grid item style={{ marginRight: "0.5em" }}>
                <Button
                  variant="outlined"
                  size={"small"}
                  style={{ color: theme.palette.primary.main }}
                  fullWidth
                  onClick={() => toggleListingApprove(listing.id, listing.approved)}
                >
                  {listing.approved ? "Unapprove" : "Approve"}
                </Button>
              </Grid>

              <Grid item style={{ marginRight: "0.5em" }}>
                <Button
                  variant="outlined"
                  size={"small"}
                  style={{ color: theme.palette.error.main }}
                  fullWidth
                  onClick={() => deleteListing(listing.id, listing.photoName, listing.photoURL)}
                >
                  Delete
                </Button>
              </Grid>

            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ListingItem;
