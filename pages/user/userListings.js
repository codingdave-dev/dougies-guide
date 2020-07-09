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
  fetchUserFavourites,
  fetchUserListings,
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
  let userListings = [];

  if (state.user.userListings && state.user.userListings.length > 0) {
    userListings = state.user.userListings;
  }

  return {
    loading: state.loading.loading,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    userListings,
  };
};

const actions = {
  fetchUserListings,
};

const UserFavourites = ({
  router,
  fetchUserListings,
  userListings,
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
    fetchUserListings(userId);
  }, [authenticated,fetchUserListings, userId]);

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
                  {profile.firstName}'s Listings
                </Typography>
              </Grid>

              {userListings.length < 1 && (
                  <Grid item style={{ marginTop: "1em" }}>
                    <Alert severity="error">No Listings found.</Alert>
                  </Grid>
              )}

              {loading && <Loader pageLoader/>}

              {!loading && userListings &&
              userListings.map((listing) => (
                  <ListingItem key={listing.id} listing={listing} />
              ))}
            </Grid>
          </Grid>
      )}
    </Fragment>
  );
};

export default withRouter(connect(mapStateToProps, actions)(UserFavourites));
