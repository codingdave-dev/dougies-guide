import React, { Fragment, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import ListingItem from "../../src/ui/listing/listingItem/ListingItem";
import { connect } from "react-redux";
import Router, { withRouter } from "next/router";
import { fetchAllListings } from "../../src/store/actions/listingActions/listingActions";
import { fetchUserFavourites } from "../../src/store/actions/userActions/userActions";
import Alert from "@material-ui/lab/Alert";
import Loader from "../../src/ui/Loader";
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

const mapStateToProps = (state) => {
  let allListings = [];
  let userFavourites = [];
  let favourites = [];

  if (state.listings.allListings && state.listings.allListings.length > 0) {
    allListings = state.listings.allListings;
  }

  if (state.user.userFavourites && state.user.userFavourites.length > 0) {
    userFavourites = state.user.userFavourites;

    const listings = allListings.filter((array) =>
      userFavourites.some((filter) => filter.listingId === array.id)
    );

    favourites = listings;
  }

  return {
    loading: state.loading.loading,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    favourites,
  };
};

const actions = {
  fetchAllListings,
  fetchUserFavourites,
};

const UserFavourites = ({
  router,
  fetchAllListings,
  fetchUserFavourites,
  favourites,
  loading,
  auth,
  profile,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const authenticated =
    auth.isLoaded && !auth.isEmpty && profile.isLoaded && !profile.isEmpty;
  const userId = router.query.id;

  useEffect(() => {
    if (!authenticated) {
      Router.push({ pathname: "/" });
    }
    fetchAllListings();
    fetchUserFavourites(userId);
  }, [authenticated, fetchAllListings, fetchUserFavourites, userId]);

  return (
    <Fragment>
      {authenticated && (
        <Grid container direction={"column"} alignItems={"center"}>
          <Head>
            <title key={"title"}>Your Favourites | Dougies Guide</title>
            <meta
                name={"description"}
                key={"description"}
                content={
                  "View Your Favourites"
                }
            />
            <meta
                property={"og:title"}
                content={"Your Favourites | Dougies Guide"}
                key={"og:title"}
            />
            <meta
                property={"og:url"}
                content={"dougiesguide.com/user/userFavourites"}
                key={"og:url"}
            />
            <link
                rel="canonical"
                key={"canonical"}
                href={"https://dougiesguide.com/user/userFavourites"}
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
                {profile.provider === 'Email' ? profile.firstName + `'s Favourites` : 'Your Favourites'}
              </Typography>
            </Grid>

            {favourites.length < 1 && (
              <Grid item style={{ marginTop: "1em" }}>
                <Alert severity="error">No Favourites found.</Alert>
              </Grid>
            )}

            {loading && <Loader pageLoader />}

            {!loading &&
              favourites &&
              favourites.map((listing) => (
                <ListingItem key={listing.id} listing={listing} />
              ))}
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};

export default withRouter(connect(mapStateToProps, actions)(UserFavourites));
