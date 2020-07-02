import React, { useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";

import Router from "next/router";

const useStyles = makeStyles((theme) => ({
  // ADD STYLES HERE
}));

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    admin: state.firebase.profile.admin,
  };
};

const Index = ({ auth, profile, admin }) => {
  const authenticated =
    auth.isLoaded &&
    !auth.isEmpty &&
    profile.isLoaded &&
    !profile.isEmpty &&
    admin;

  useEffect(() => {
    if (!authenticated) {
      Router.push({ pathname: "/" });
    }
  }, [authenticated]);

  const classes = useStyles();
  const theme = useTheme();
  return (
    <Grid container direction={"row"}>
      <h1>ADMIN</h1>
    </Grid>
  );
};

export default connect(mapStateToProps)(Index);
