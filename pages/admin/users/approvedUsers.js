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
    let approvedUsers = [];

    if (state.admin.approvedUsers && state.admin.approvedUsers.length > 0) {
        approvedUsers = state.admin.approvedUsers;
    }

    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        admin: state.firebase.profile.admin,
        loading: state.loading.loading,
        approvedUsers: approvedUsers,
    };
};

const ApprovedUsers = ({ loading, fetchApprovedUsers, approvedUsers, toggleUserType, toggleUserDisable, deleteUser, isAdmin }) => {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        fetchApprovedUsers();
    }, [fetchApprovedUsers]);

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
                approvedUsers &&
                approvedUsers.map((user) => <UserItem key={user.id} user={user} toggleUserType={toggleUserType} toggleUserDisable={toggleUserDisable} deleteUser={deleteUser} isAdmin={isAdmin}/>)}
            </Grid>
        </Grid>
    );
};

export default connect(mapStateToProps)(ApprovedUsers);
