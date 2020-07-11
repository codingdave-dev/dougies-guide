import React from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AllAdmins from "../users/allAdmins";
import AllUsers from "../users/allUsers";
import ApprovedUsers from "../users/approvedUsers";
import UnapprovedUsers from "../users/unapprovedUsers";
import {connect} from "react-redux";
import Loader from "../../../src/ui/Loader";
import BoardItem from "../../../src/ui/admin/BoardItem";

const useStyles = makeStyles((theme) => ({
    // ADD STYLES HERE
}));

const actions = {

}

const mapStateToProps = (state) => {

    let boardMembers = [];

    if (state.admin.boardMembers && state.admin.boardMembers.length > 0) {
        boardMembers = state.admin.boardMembers;
    }

    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        admin: state.firebase.profile.admin,
        boardMembers: boardMembers
    };
};

const AdminBoardMembers = ({loading, boardMembers}) => {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <Grid
            container
            direction={"column"}
            alignItems={"center"}
            justify={"center"}
            style={{ marginTop: "1em" }}
        >
            <Grid
                item
                container
                direction={"column"}
                alignItems={"center"}
                className={classes.userWrapper}
            >
                {loading && <Loader pageLoader />}

                {!loading &&
                boardMembers &&
                boardMembers.map((member) => <BoardItem key={member.id} member={member}  />)}
            </Grid>

        </Grid>
    );
};

export default connect(mapStateToProps, actions) (AdminBoardMembers);