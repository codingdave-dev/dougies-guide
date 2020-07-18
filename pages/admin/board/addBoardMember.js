import React, {useEffect} from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {connect} from "react-redux";
import BoardMemberForm from "../../../src/ui/forms/board/BoardMemberForm";
import {fetchAllAdminsAndUsers} from "../../../src/store/actions/adminActions/adminUserActions";
import {createBoardMember, fetchBoardRoles} from "../../../src/store/actions/adminActions/adminBoardActions";
import Head from "next/head";

const useStyles = makeStyles((theme) => ({
    // ADD STYLES HERE
}));

const actions = {
    fetchBoardRoles,
fetchAllAdminsAndUsers,
}

const mapStateToProps = (state) => {

    let allAdminsAndUsers = [];
    let boardRoles = [];

    if (state.admin.allAdminsAndUsers && state.admin.allAdminsAndUsers.length > 0) {
        allAdminsAndUsers = state.admin.allAdminsAndUsers;
    }

    if (state.admin.boardRoles && state.admin.boardRoles.length > 0) {
        boardRoles = state.admin.boardRoles;
    }

    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        admin: state.firebase.profile.admin,
        loading: state.loading.loading,
        allAdminsAndUsers: allAdminsAndUsers,
        boardRoles: boardRoles,
    };
}

const AddBoardMember = ({fetchAllAdminsAndUsers, fetchBoardRoles, allAdminsAndUsers, boardRoles, setValue, createBoardMember}) => {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
    useEffect(() => {
        fetchAllAdminsAndUsers()
            fetchBoardRoles()
    }, [fetchAllAdminsAndUsers, fetchBoardRoles])
    return (
        <Grid container justify={"center"} direction={"column"}>
            <Head>
                <title key={"title"}>Add Board Member - Admin | Dougies Guide</title>
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
            <Grid item style={{marginTop: '1em'}}>
                <BoardMemberForm allAdminsAndUsers={allAdminsAndUsers} boardRoles={boardRoles} setValue={setValue} createBoardMember={createBoardMember}/>
            </Grid>

        </Grid>
    );
};

export default connect(mapStateToProps, actions) (AddBoardMember);