import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { connect } from "react-redux";
import AllBoardMembers from "./allBoardMembers";
import {
  createBoardMember,
  createBoardMemberRole,
  fetchBoardMembers,
  fetchBoardRoles,
} from "../../../src/store/actions/adminActions/adminBoardActions";

import AddBoardMember from "./addBoardMember";
import AddBoardMemberRole from "./addBoardMemberRole";
import { openDialog } from "../../../src/store/actions/dialogActions/dialogActions";
import Head from "next/head";

const useStyles = makeStyles((theme) => ({
  // ADD STYLES HERE
}));

const actions = {
  fetchBoardMembers,
  createBoardMember,
  createBoardMemberRole,
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    admin: state.firebase.profile.admin,
  };
};

const boardRoutes = [
  {
    id: 1,
    name: "All Member",
  },
  {
    id: 2,
    name: "Add New Member",
  },
  {
    id: 3,
    name: "Add Role",
  },
];

const AdminBoardMembers = ({
  fetchBoardMembers,
  createBoardMember,
  createBoardMemberRole,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid
      container
      direction={"column"}
      alignItems={"center"}
      justify={"center"}
      style={{ marginTop: "1em" }}
    >
      <Head>
        <title key={"title"}>Board - Admin | Dougies Guide</title>
        <meta
            name={"description"}
            key={"description"}
            content={
              "Admin Area for our Board Members"
            }
        />
        <meta
            property={"og:title"}
            content={"Board Members | Board"}
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
      <Grid item>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
        >
          {boardRoutes.map((board) => (
            <Tab key={board.id} label={board.name} />
          ))}
        </Tabs>
      </Grid>

      {value === 0 && <AllBoardMembers setValue={setValue} fetchBoardMembers={fetchBoardMembers} />}
      {value === 1 && (
        <AddBoardMember
          setValue={setValue}
          createBoardMember={createBoardMember}
        />
      )}
      {value === 2 && (
        <AddBoardMemberRole
          setValue={setValue}
          createBoardMemberRole={createBoardMemberRole}
        />
      )}
    </Grid>
  );
};

export default connect(mapStateToProps, actions)(AdminBoardMembers);
