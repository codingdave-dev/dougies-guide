import React, { useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import { withRouter } from "next/router";

import { connect } from "react-redux";
import { fetchListing } from "../../src/store/actions/listingActions/listingActions";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import Divider from "@material-ui/core/Divider";
import DetailedHeader from "../../src/ui/listing/detailed/DetailedHeader";
import DetailedDescription from "../../src/ui/listing/detailed/DetailedDescription";
import DetailedPhotos from "../../src/ui/listing/detailed/DetailedPhotos";
import DetailedReviews from "../../src/ui/listing/detailed/DetailedReviews";
import {
  addUserCheckin,
  toggleUserFavourtie,
} from "../../src/store/actions/userActions/userActions";
import { openDialog } from "../../src/store/actions/dialogActions/dialogActions";
import DetailedInfomation from "../../src/ui/listing/detailed/DetailedInfomation";
import DetailedActivities from "../../src/ui/listing/detailed/DetailedActivities";
import DetailedExtras from "../../src/ui/listing/detailed/DetailedExtras";

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
  },
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
  cityState: {
    [theme.breakpoints.down("md")]: {
      fontSize: "2.5em",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1em",
    },
  },

  mainImage: {
    borderRadius: "5px",
    width: 250,
    [theme.breakpoints.down("md")]: {
      width: 240,
    },
    [theme.breakpoints.down("sm")]: {
      width: 225,
    },
    [theme.breakpoints.down("xs")]: {
      width: 200,
    },
  },
  subImage: {
    borderRadius: "5px",
    width: 125,
    [theme.breakpoints.down("md")]: {
      width: 100,
    },
    [theme.breakpoints.down("sm")]: {
      width: 75,
    },
    [theme.breakpoints.down("xs")]: {
      width: 55,
    },
  },
  listingTextTitle: {
    color: theme.palette.primary.main,
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
  listingText: {
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
  reviewAvatar: {
    width: 50,
    borderRadius: "100%",
  },
  reviewRating: {
    fontSize: "0.8em",
  },
}));

const mapStateToProps = (state) => {
  let listingDetailed = [];
  let isFavourite = null;
  let favouriteId = null;
  let isCheckin = null;
  let checkinId = null;

  if (state.listings.listing && state.listings.listing.length > 0) {
    listingDetailed = state.listings.listing;
  }

  if (state.user.userFavourites && state.user.userFavourites.length > 0) {
    let favourites = state.user.userFavourites;

    const favourite = favourites.filter((array) =>
      listingDetailed.some((filter) => filter.id === array.listingId)
    );

    if (favourite && favourite.length > 0) {
      isFavourite = favourite[0].isFavourite;
      favouriteId = favourite[0].id;
    } else {
      isFavourite = false;
      favouriteId = null;
    }
  }

  if (state.user.userCheckins && state.user.userCheckins.length > 0) {
    let checkins = state.user.userCheckins;

    const checkin = checkins.filter((array) =>
      listingDetailed.some((filter) => filter.id === array.listingId)
    );

    if (checkin && checkin.length > 0) {
      isCheckin = checkin[0].isCheckin;
      checkinId = checkin[0].id;
    } else {
      isCheckin = false;
      checkinId = null;
    }
  }

  return {
    listingDetailed,
    isFavourite,
    favouriteId,
    isCheckin,
    checkinId,
    loading: state.loading.loading,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const actions = {
  fetchListing,
  toggleUserFavourtie,
  addUserCheckin,
  openDialog,
};

const ListingDetailed = ({
  fetchListing,
  toggleUserFavourtie,
  addUserCheckin,
  openDialog,
  listingDetailed,
  isFavourite,
  favouriteId,
  isCheckin,
  checkinId,
  loading,
  auth,
  profile,
  router,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const authenticated =
    auth.isLoaded && !auth.isEmpty && profile.isLoaded && !profile.isEmpty;
  const listingId = router.query.id;

  useEffect(() => {
    fetchListing(listingId, auth.uid);
  }, [fetchListing, listingId, auth]);


  return (
    <Grid container direction={"column"} alignItems={"center"}>
      <Backdrop open={loading}>
        <CircularProgress color={"inherit"} />
      </Backdrop>

      {/*PHOTO & ADDRESS*/}
      {!loading &&
        listingDetailed &&
        listingDetailed.map((listing) => (
          <Grid
            key={listing.id}
            item
            container
            direction={"column"}
            alignItems={"center"}
            className={classes.listingWrapper}
          >
            {/*HEADER*/}
            <DetailedHeader
              listing={listing}
              isFavourite={isFavourite}
              favouriteId={favouriteId}
              isCheckin={isCheckin}
              checkinId={checkinId}
              openDialog={openDialog}
              classes={classes}
              theme={theme}
              matchesSM={matchesSM}
              authenticated={authenticated}
              profile={profile}
              loading={loading}
              toggleUserFavourtie={toggleUserFavourtie}
              addUserCheckin={addUserCheckin}
            />

            <Divider className={classes.divider} />

            {/*DESCRIPTION*/}
            <DetailedDescription listing={listing} classes={classes} />

            <Divider className={classes.divider} />

            {/*INFORMATION*/}
            <DetailedInfomation listing={listing} classes={classes} />

            <Divider className={classes.divider} />

            {/*EXTRAS*/}
            <DetailedExtras listing={listing} classes={classes} />

            <Divider className={classes.divider} />


            {/*PHOTOS*/}
            <DetailedPhotos listing={listing} classes={classes} />

            <Divider className={classes.divider} />

            {/*REVIEWS*/}
            <DetailedReviews listing={listing} classes={classes} />
          </Grid>
        ))}
    </Grid>
  );
};

export default withRouter(connect(mapStateToProps, actions)(ListingDetailed));
