import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Button from "@material-ui/core/Button";

// ICONS
import CreateIcon from "@material-ui/icons/Create";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PlaceIcon from "@material-ui/icons/Place";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import PhotoIcon from "@material-ui/icons/Photo";
import Alert from "@material-ui/lab/Alert";

const DetailedHeader = ({
  listing,
  isFavourite,
  favouriteId,
  isCheckin,
  checkinId,
  matchesSM,
  classes,
  theme,
  authenticated,
  profile,
  loading,
  toggleUserFavourtie,
  addUserCheckin,
  openDialog,
}) => {
  return (
    <Fragment>
      <Grid item>
        <Typography variant={"h1"} className={classes.title}>
          {listing.title}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant={"h3"} className={classes.cityState}>
          {listing.city}, {listing.state}
        </Typography>
      </Grid>
      {listing.approved === false && (
          <Grid item>
            <Alert severity="error">Listing Pending Review</Alert>
          </Grid>
      )}


      <Grid
        item
        container
        style={{ marginTop: 20 }}
        direction={matchesSM ? "column" : "row"}
      >
        <Grid
          item
          container={matchesSM}
          justify={matchesSM ? "center" : undefined}
        >
          <Grid item>
            <img
              className={classes.mainImage}
              src={listing.photoURL}
              alt={`${listing.title} photo`}
            />
          </Grid>
        </Grid>

        <Grid item style={matchesSM ? { marginTop: 10 } : undefined}>
          <Grid
            item
            container
            direction={matchesSM ? "row" : "column"}
            style={matchesSM ? { marginLeft: 0 } : { marginLeft: 15 }}
          >
            <Grid item container direction={matchesSM ? "row" : "column"}>
              <Grid item>
                <Typography
                  variant={"body1"}
                  className={classes.listingTextTitle}
                >
                  Address:
                </Typography>
              </Grid>
              <Grid item style={matchesSM ? { marginLeft: 4 } : undefined}>
                <Typography variant={"body1"} className={classes.listingText}>
                  {listing.address1},
                </Typography>
              </Grid>
              <Grid item style={matchesSM ? { marginLeft: 4 } : undefined}>
                <Typography variant={"body1"} className={classes.listingText}>
                  {listing.address2} {listing.address2 ? "," : undefined}
                </Typography>
              </Grid>
              <Grid item style={matchesSM ? { marginLeft: 4 } : undefined}>
                <Typography variant={"body1"} className={classes.listingText}>
                  {listing.city}, {listing.state},
                </Typography>
              </Grid>
              <Grid item style={matchesSM ? { marginLeft: 4 } : undefined}>
                <Typography variant={"body1"} className={classes.listingText}>
                  {listing.zipCode},
                </Typography>
              </Grid>
              <Grid item style={matchesSM ? { marginLeft: 4 } : undefined}>
                <Typography variant={"body1"} className={classes.listingText}>
                  {listing.country}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              item
              container
              direction={matchesSM ? "row" : "column"}
              style={matchesSM ? { marginTop: 5 } : { marginTop: 15 }}
            >
              <Grid item>
                <Typography
                  variant={"body1"}
                  className={classes.listingTextTitle}
                >
                  Contact:
                </Typography>
              </Grid>
              <Grid item style={matchesSM ? { marginLeft: 4 } : undefined}>
                <Typography variant={"body1"} className={classes.listingText}>
                  Phone: {listing.phone},
                </Typography>
              </Grid>
              <Grid item style={matchesSM ? { marginLeft: 4 } : undefined}>
                <Typography variant={"body1"} className={classes.listingText}>
                  Web: {listing.url},
                </Typography>
              </Grid>
              <Grid item style={matchesSM ? { marginLeft: 4 } : undefined}>
                <Typography variant={"body1"} className={classes.listingText}>
                  Email: {listing.email}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              item
              container
              direction={matchesSM ? "row" : "column"}
              style={matchesSM ? { marginTop: 5 } : { marginTop: 15 }}
            >
              <Grid item>
                <Typography
                  variant={"body1"}
                  className={classes.listingTextTitle}
                >
                  Rating:
                </Typography>
              </Grid>
              <Grid item style={matchesSM ? { marginLeft: 4 } : undefined}>
                <Grid item container direction={"row"}>
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/*BUTTONS*/}
        <Grid item style={{ marginLeft: "auto" }}>
          <Grid
            item
            container
            direction={matchesSM ? "row" : "column"}
            spacing={1}
          >
            {authenticated && (
              <Fragment>
                <Grid item>
                  <Button
                    variant="outlined"
                    size={"small"}
                    style={{
                      color: theme.palette.error.main,
                      borderColor: theme.palette.error.main,
                    }}
                    startIcon={
                      isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />
                    }
                    fullWidth
                    onClick={() =>
                      toggleUserFavourtie(
                        profile.uid,
                        listing.id,
                        !isFavourite,
                        favouriteId
                      )
                    }
                  >
                    Favourite
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    size={"small"}
                    color="primary"
                    startIcon={<CreateIcon />}
                    fullWidth
                    onClick={() =>
                      openDialog("ReviewDialog", { profile, listing })
                    }
                  >
                    Review
                  </Button>
                </Grid>

                <Grid item>
                  <Button
                    variant="outlined"
                    size={"small"}
                    style={{ color: theme.palette.common.green }}
                    startIcon={<PlaceIcon />}
                    fullWidth
                    onClick={() =>
                      !isCheckin
                        ? addUserCheckin(profile.uid, listing.id)
                        : openDialog("CheckinDialog", {
                            userId: profile.uid,
                            listingId: listing.id,
                            checkinId: checkinId,
                          })
                    }
                  >
                    {isCheckin ? "Checked In" : "Check In"}
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    size={"small"}
                    style={{ color: theme.palette.common.grey }}
                    startIcon={<AddAPhotoIcon />}
                    fullWidth
                    onClick={() => openDialog("SubPhotoDialog", { profile, listing })}
                  >
                    Add Photo
                  </Button>
                </Grid>
                {((profile.admin === true) || (listing.addedByUid === profile.uid)) &&
                <Grid item>
                  <Button
                      variant="outlined"
                      size={"small"}
                      style={{ color: theme.palette.common.grey }}
                      startIcon={<PhotoIcon />}
                      fullWidth
                      onClick={() => openDialog("MainPhotoDialog", { profile, listing })}
                  >
                    Main Photo
                  </Button>
                </Grid>
                }

              </Fragment>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default DetailedHeader;
