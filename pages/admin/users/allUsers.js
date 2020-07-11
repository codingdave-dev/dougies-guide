import React, { useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import UserItem from "../../../src/ui/admin/UserItem";
import { connect } from "react-redux";
import Loader from "../../../src/ui/Loader";

const useStyles = makeStyles((theme) => ({
  userWrapper: {
    width: "80%",
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
  },
}));

const mapStateToProps = (state) => {
  let allUsers = [];

  if (state.admin.allUsers && state.admin.allUsers.length > 0) {
    allUsers = state.admin.allUsers;
  }

  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    admin: state.firebase.profile.admin,
    loading: state.loading.loading,
    allUsers: allUsers,
  };
};

const AllUsers = ({ loading, fetchAllUsers, allUsers, toggleUserType, toggleUserDisable, deleteUser, isAdmin }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <Grid container direction={"column"} alignItems={"center"}>
      <Grid
        item
        container
        direction={"column"}
        alignItems={"center"}
        className={classes.userWrapper}
      >
        {loading && <Loader pageLoader />}

        {!loading &&
          allUsers &&
          allUsers.map((user) => <UserItem key={user.id} user={user} toggleUserType={toggleUserType} toggleUserDisable={toggleUserDisable} deleteUser={deleteUser} isAdmin={isAdmin} />)}
      </Grid>
    </Grid>
  );
};

export default connect(mapStateToProps)(AllUsers);