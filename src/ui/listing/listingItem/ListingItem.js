import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Router from "next/router";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
  image: {
    borderRadius: "5px",
    width: 225,
    [theme.breakpoints.down("md")]: {
      width: 200,
    },
    [theme.breakpoints.down("sm")]: {
      width: 150,
    },
    [theme.breakpoints.down("xs")]: {
      width: 100,
    },
  },
  listingTitle: {
    [theme.breakpoints.down("md")]: {
      fontSize: "1.75em",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.2em",
    },
  },
  listingCity: {
    [theme.breakpoints.down("md")]: {
      fontSize: "1.4em",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1em",
    },
  },
  listingRating: {
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
  listingRatingText: {
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
  listingDescription: {
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

const ListingItem = ({ listing }) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Grid
      item
      container
      style={{ marginTop: 50, flexWrap: "nowrap", cursor: "pointer" }}
      onClick={() => {
        Router.push({
          pathname: "/listing/detailed",
          query: { id: listing.id },
        });
      }}
    >
      <Grid item>
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
            <Typography variant={"h6"} className={classes.listingCity}>
              {listing.city},{listing.state}
            </Typography>
          </Grid>
          <Grid item container>
            <Grid item>
              <Rating
                value={listing.rating}
                precision={0.5}
                readOnly
                className={classes.listingRating}
              />
            </Grid>
            <Grid item style={{ marginLeft: 5 }}>
              <Typography
                variant={"body1"}
                className={classes.listingRatingText}
              >
                {listing.numberOfReviews}{" "}
                {listing.numberOfReviews <= 1 ? "review" : "reviews"}
              </Typography>
            </Grid>
          </Grid>
          <Grid item style={{ marginTop: 4 }}>
            <Typography
              variant={"body1"}
              className={classes.listingDescription}
            >
              {listing.description}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ListingItem;
