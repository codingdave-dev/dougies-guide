import React, { Fragment, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { connect } from "react-redux";
import format from "date-fns/format";
import { openDialog } from "../../src/store/actions/dialogActions/dialogActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Router from "next/router";

const useStyles = makeStyles((theme) => ({
  spinner: {
    width: "16em",
    height: "16em",
    [theme.breakpoints.down("sm")]: {
      width: "10em",
      height: "10em",
    },
    [theme.breakpoints.down("xs")]: {
      width: "8em",
      height: "8em",
    },
  },
  avatar: {
    borderRadius: "100%",
    width: "16em",
    [theme.breakpoints.down("sm")]: {
      width: "10em",
    },
    [theme.breakpoints.down("xs")]: {
      width: "8em",
    },
  },
  infoContainer: {
    marginTop: "1em",
    width: "80%",
  },
  textTitleContainer: {
    marginRight: "0.3em",
  },
  textTitle: {
    color: theme.palette.primary.main,
  },
}));

const mapStateToProps = (state) => {
  return {
    loading: state.loading.loading,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const actions = {
  openDialog,
};

const UserProfile = ({ loading, auth, profile, openDialog }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const authenticated =
    auth.isLoaded && !auth.isEmpty && profile.isLoaded && !profile.isEmpty;

  useEffect(() => {
    if (!authenticated) {
      Router.push({ pathname: "/" });
    }
  }, [authenticated]);

  return (
    <Fragment>
      {authenticated && (
        <Grid container direction={"column"} alignItems={"center"}>
          <Grid item>
            {loading && (
              <Grid
                item
                container
                justify={"center"}
                alignItems={"center"}
                className={classes.spinner}
              >
                <CircularProgress />
              </Grid>
            )}
            {!loading && (
              <img className={classes.avatar} src={profile.photoURL} alt="" />
            )}
          </Grid>
          <Grid item>
            <Typography variant={"h3"}>{profile.fullName}</Typography>
          </Grid>
          <Grid item>
            <Typography variant={"body1"}>
              {profile.admin ? "Administrator" : "User"}
            </Typography>
          </Grid>

          <Grid
            item
            container
            direction={"column"}
            className={classes.infoContainer}
            spacing={1}
          >
            {/*PROFILE INFO*/}
            <Grid item>
              <Grid item container>
                <Grid item className={classes.textTitleContainer}>
                  <Typography
                    variant={"subtitle2"}
                    className={classes.textTitle}
                    style={{ fontWeight: 600 }}
                  >
                    Profile Details
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid item container>
                <Grid item className={classes.textTitleContainer}>
                  <Typography
                    variant={"subtitle2"}
                    className={classes.textTitle}
                  >
                    Profile Name:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant={"subtitle2"}>
                    {profile.fullName}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid item container>
                <Grid item className={classes.textTitleContainer}>
                  <Typography
                    variant={"subtitle2"}
                    className={classes.textTitle}
                  >
                    Email Address:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant={"subtitle2"}>{profile.email}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid item container>
                <Grid item className={classes.textTitleContainer}>
                  <Typography
                    variant={"subtitle2"}
                    className={classes.textTitle}
                  >
                    Member Since:
                  </Typography>
                </Grid>
                {profile.createdAt && (
                  <Grid item>
                    <Typography variant={"subtitle2"}>
                      {format(profile.createdAt.toDate(), "do LLLL yyyy")}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item>
              <Grid
                item
                container
                direction={matchesSM ? "column" : "row"}
                spacing={1}
                style={{ marginTop: "0.5em" }}
              >
                <Grid item>
                  <Button
                    variant="outlined"
                    size={"small"}
                    style={{
                      color: theme.palette.primary.main,
                      borderColor: theme.palette.primary.main,
                    }}
                    startIcon={<CreateIcon />}
                    fullWidth
                    onClick={() => openDialog("EditProfileDialog")}
                  >
                    Edit Profile
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    size={"small"}
                    style={{
                      color: theme.palette.primary.main,
                      borderColor: theme.palette.primary.main,
                    }}
                    startIcon={<AddAPhotoIcon />}
                    fullWidth
                    onClick={() =>
                      openDialog("UserProfileImageDialog", { profile })
                    }
                  >
                    Change Profile Photo
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    size={"small"}
                    style={{
                      color: theme.palette.error.main,
                      borderColor: theme.palette.error.main,
                    }}
                    startIcon={<VpnKeyIcon />}
                    fullWidth
                    onClick={() => openDialog("ChangeUserPasswordDialog")}
                  >
                    Change Password
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            {/*ANALYTICS*/}
            <Grid item style={{ marginTop: "1em" }}>
              <Grid item container>
                <Grid item className={classes.textTitleContainer}>
                  <Typography
                    variant={"subtitle2"}
                    className={classes.textTitle}
                    style={{ fontWeight: 600 }}
                  >
                    Analytics
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid item container>
                <Grid item className={classes.textTitleContainer}>
                  <Typography
                    variant={"subtitle2"}
                    className={classes.textTitle}
                  >
                    Number of Posts:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant={"subtitle2"}>333</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid item container>
                <Grid item className={classes.textTitleContainer}>
                  <Typography
                    variant={"subtitle2"}
                    className={classes.textTitle}
                  >
                    Number of Favourites:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant={"subtitle2"}>222</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid item container>
                <Grid item className={classes.textTitleContainer}>
                  <Typography
                    variant={"subtitle2"}
                    className={classes.textTitle}
                  >
                    Number of Checkins:
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant={"subtitle2"}>555</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};

export default connect(mapStateToProps, actions)(UserProfile);
