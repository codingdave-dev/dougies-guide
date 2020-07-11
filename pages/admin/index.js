import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";

import Router from "next/router";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Users from "./users/users";

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

const adminRoutes = [
  {
    id: 1,
    name: "Users",
  },
  {
    id: 2,
    name: "Listings",
  },
  {
    id: 3,
    name: "Other",
  },
];

const Index = ({ auth, profile, admin }) => {
  const authenticated =
    auth.isLoaded &&
    !auth.isEmpty &&
    profile.isLoaded &&
    !profile.isEmpty &&
    admin;

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!authenticated) {
      Router.push({ pathname: "/" });
    }
  }, [authenticated]);

  const classes = useStyles();
  const theme = useTheme();
  return (
    <Grid
      container
      direction={"column"}
      alignItems={"center"}
      justify={"center"}
    >
      <Grid item>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          {adminRoutes.map((admin) => (
            <Tab key={admin.id} label={admin.name} />
          ))}
        </Tabs>
      </Grid>

      {value === 0 && <Users />}
    </Grid>
  );
};

export default connect(mapStateToProps)(Index);
