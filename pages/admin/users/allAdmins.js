import React, { useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import UserItem from "../../../src/ui/admin/UserItem";
import { connect } from "react-redux";
import Loader from "../../../src/ui/Loader";
import Head from "next/head";

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
    let allAdmins = [];

    if (state.admin.allAdmins && state.admin.allAdmins.length > 0) {
        allAdmins = state.admin.allAdmins;
    }

    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        admin: state.firebase.profile.admin,
        loading: state.loading.loading,
        allAdmins: allAdmins,
    };
};

const AllAdmins = ({ loading, fetchAllAdmins, allAdmins, toggleUserType, toggleUserDisable, deleteUser, isAdmin }) => {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        fetchAllAdmins();
    }, [fetchAllAdmins]);

    return (
        <Grid container direction={"column"} alignItems={"center"}>
            <Head>
                <title key={"title"}>Users - Admin | Dougies Guide</title>
                <meta
                    name={"description"}
                    key={"description"}
                    content={
                        "Admin Area for our Users"
                    }
                />
                <meta
                    property={"og:title"}
                    content={"Users | User"}
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
            <Grid
                item
                container
                direction={"column"}
                alignItems={"center"}
                className={classes.userWrapper}
            >
                {loading && <Loader pageLoader />}

                {!loading &&
                allAdmins &&
                allAdmins.map((user) => <UserItem key={user.id} user={user} toggleUserType={toggleUserType} toggleUserDisable={toggleUserDisable} deleteUser={deleteUser} isAdmin={isAdmin} />)}
            </Grid>
        </Grid>
    );
};

export default connect(mapStateToProps)(AllAdmins);
