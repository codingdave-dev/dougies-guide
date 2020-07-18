import React, { Fragment, useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";

import Router from "next/router";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AdminUsers from "./users/users";
import AdminListings from "./listings/listings";
import AdminBoardMembers from "./board/board";
import Head from "next/head";

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

let adminRoutes = []


const Index = ({ auth, profile, admin }) => {
  const authenticated =
    auth.isLoaded &&
    !auth.isEmpty &&
    profile.isLoaded &&
    !profile.isEmpty &&
    admin;


  const [value, setValue] = useState(0);

  if (authenticated) {
    adminRoutes = [
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
        name: "The Board",
      },
    ];
  }

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
      <Head>
        <title key={"title"}>Admin Area | Dougies Guide</title>
        <meta
            name={"description"}
            key={"description"}
            content={
              "Admin Area"
            }
        />
        <meta
            property={"og:title"}
            content={"Admin Area | Dougies Guide"}
            key={"og:title"}
        />
        <meta
            property={"og:url"}
            content={"dougiesguide.com/admin"}
            key={"og:url"}
        />
        <link
            rel="canonical"
            key={"canonical"}
            href={"https://dougiesguide.com/admin"}
        />
      </Head>
      {authenticated && authenticated && (
        <Fragment>
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

          {value === 0 && <AdminUsers />}
          {value === 1 && <AdminListings />}
          {value === 2 && <AdminBoardMembers />}
        </Fragment>
      )}
    </Grid>
  );
};

export default connect(mapStateToProps)(Index);
