import React, { Fragment, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { fetchAllApprovedListings } from "../src/store/actions/listingActions/listingActions";
import { connect } from "react-redux";

import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import ListingItem from "../src/ui/listing/listingItem/ListingItem";
import Loader from "../src/ui/Loader";
import Head from "next/head";

const useStyles = makeStyles((theme) => ({
  listingWrapper: {
    width: "80%",
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
  },
  title: {
    [theme.breakpoints.down("md")]: {
      fontSize: "4em",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "2.5em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5em",
    },
  },
}));

const actions = {
  fetchAllApprovedListings,
};

const mapStateToProps = (state) => {
  let allApprovedListings = [];

  if (
    state.listings.allApprovedListings &&
    state.listings.allApprovedListings.length > 0
  ) {
    allApprovedListings = state.listings.allApprovedListings;
  }

  return {
    allApprovedListings,
    loading: state.loading.loading,
  };
};

const Listings = ({
  fetchAllApprovedListings,
  allApprovedListings,
  loading,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    fetchAllApprovedListings();
  }, [fetchAllApprovedListings]);

  return (
    <Grid container direction={"column"} alignItems={"center"}>
      <Head>
        <title key={"title"}>Listings | Dougies Guide</title>
        <meta
            name={"description"}
            key={"description"}
            content={
              "View all listings added by your fellow roadies."
            }
        />
        <meta
            property={"og:title"}
            content={"Dives and Restaurants | Listings"}
            key={"og:title"}
        />
        <meta
            property={"og:url"}
            content={"dougiesguide.com/listings"}
            key={"og:url"}
        />
        <link
            rel="canonical"
            key={"canonical"}
            href={"https://dougiesguide.com/listings"}
        />
      </Head>
      <Grid
        item
        container
        direction={"column"}
        alignItems={"center"}
        className={classes.listingWrapper}
      >
        <Grid item>
          <Typography variant={"h1"} className={classes.title}>
            Listings
          </Typography>
        </Grid>

        {loading && <Loader pageLoader />}

        {!loading &&
          allApprovedListings &&
          allApprovedListings.map((listing) => (
            <ListingItem key={listing.id} listing={listing} />
          ))}
      </Grid>
    </Grid>
  );
};

export default connect(mapStateToProps, actions)(Listings);
