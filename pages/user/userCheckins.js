import React, {Fragment, useEffect} from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import ListingItem from "../../src/ui/listing/listingItem/ListingItem";
import { connect } from "react-redux";
import Router, { withRouter } from "next/router";
import { fetchAllListings } from "../../src/store/actions/listingActions/listingActions";
import {
  fetchUserCheckins,
  fetchUserFavourites,
} from "../../src/store/actions/userActions/userActions";
import Alert from "@material-ui/lab/Alert";
import Loader from "../../src/ui/Loader";

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
  let userCheckins = [];
  let checkins = [];

  if (state.listings.allListings && state.listings.allListings.length > 0) {
    allListings = state.listings.allListings;
  }

  if (state.user.userCheckins && state.user.userCheckins.length > 0) {
    userCheckins = state.user.userCheckins;

    const listings = allListings.filter((array) =>
      userCheckins.some((filter) => filter.listingId === array.id)
    );

    checkins = listings;
  }

  return {
    loading: state.loading.loading,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    checkins,
  };
};

const actions = {
  fetchAllListings,
  fetchUserCheckins,
};

const UserFavourites = ({
  router,
  fetchAllListings,
  fetchUserCheckins,
  checkins,
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
    fetchUserCheckins(userId);
  }, [authenticated, fetchAllListings, fetchUserCheckins, userId]);

  return (
      <Fragment>
        {authenticated && (
            <Grid container direction={"column"} alignItems={"center"}>
              <Grid
                  item
                  container
                  direction={"column"}
                  alignItems={"center"}
                  className={classes.listingWrapper}
              >
                <Grid item>
                  <Typography variant={"h1"} className={classes.title}>
                    {profile.firstName}'s Checkins
                  </Typography>
                </Grid>

                {checkins.length < 1 && (
                    <Grid item style={{ marginTop: "1em" }}>
                      <Alert severity="error">No Checkins found.</Alert>
                    </Grid>
                )}

                {loading && <Loader pageLoader/>}

                {!loading && checkins &&
                checkins.map((listing) => (
                    <ListingItem key={listing.id} listing={listing} />
                ))}
              </Grid>
            </Grid>
        )}
      </Fragment>
  );
};

export default withRouter(connect(mapStateToProps, actions)(UserFavourites));
