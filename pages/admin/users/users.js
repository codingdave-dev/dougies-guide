import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { connect } from "react-redux";
import AllUsers from "./allUsers";
import ApprovedUsers from "./approvedUsers";
import UnapprovedUsers from "./unapprovedUsers";
import {
  deleteUser,
  fetchAllAdmins,
  fetchAllUsers,
  fetchApprovedUsers,
  fetchUnapprovedUsers, toggleUserDisable, toggleUserType
} from "../../../src/store/actions/adminActions/adminUserActions";
import AllAdmins from "./allAdmins";

const useStyles = makeStyles((theme) => ({
  // ADD STYLES HERE
}));

const actions = {
  fetchAllAdmins,
  fetchAllUsers,
  fetchApprovedUsers,
  fetchUnapprovedUsers,
  toggleUserType,
  toggleUserDisable,
  deleteUser
};

const mapStateToProps = (state) => {

  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    admin: state.firebase.profile.admin,
  };
};

const userRoutes = [
  {
    id: 1,
    name: "Admins",
  },
  {
    id: 2,
    name: "Users",
  },
  {
    id: 3,
    name: "Approved",
  },
  {
    id: 4,
    name: "Unapproved",
  },
];

const AdminUsers = ({profile, fetchAllAdmins, fetchAllUsers, fetchApprovedUsers, fetchUnapprovedUsers, toggleUserType, toggleUserDisable, deleteUser}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [value, setValue] = useState(0);

  const isAdmin = profile.admin

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleUserType = (id, userType) => {
    toggleUserType(id, userType)
  }

  const handleUserDisable = (id, userDisabled) => {
    toggleUserDisable(id, userDisabled)
  }

  const handleUserDelete = (id, photoName, photoURL, admin, provider) => {
    deleteUser(id, photoName, photoURL, admin, provider)
  }

  return (
    <Grid
      container
      direction={"column"}
      alignItems={"center"}
      justify={"center"}
      style={{ marginTop: "1em" }}
    >
      <Grid item>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          {userRoutes.map((user) => (
            <Tab key={user.id} label={user.name} />
          ))}
        </Tabs>
      </Grid>

      {value === 0 && <AllAdmins fetchAllAdmins={fetchAllAdmins} toggleUserType={handleUserType} toggleUserDisable={handleUserDisable} deleteUser={handleUserDelete} isAdmin={isAdmin}/>}
      {value === 1 && <AllUsers fetchAllUsers={fetchAllUsers} toggleUserType={handleUserType} toggleUserDisable={handleUserDisable} deleteUser={handleUserDelete} isAdmin={isAdmin}/>}
      {value === 2 && <ApprovedUsers fetchApprovedUsers={fetchApprovedUsers} toggleUserType={handleUserType} toggleUserDisable={handleUserDisable} deleteUser={handleUserDelete} isAdmin={isAdmin}/>}
      {value === 3 && <UnapprovedUsers fetchUnapprovedUsers={fetchUnapprovedUsers} toggleUserType={handleUserType} toggleUserDisable={handleUserDisable} deleteUser={handleUserDelete} isAdmin={-isAdmin}/>}
    </Grid>
  );
};

export default connect(mapStateToProps, actions)(AdminUsers);
