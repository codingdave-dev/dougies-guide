import React, {useEffect} from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Loader from "../../../src/ui/Loader";
import BoardItem from "../../../src/ui/admin/BoardItem";
import {connect} from "react-redux";
import Head from "next/head";

const useStyles = makeStyles((theme) => ({
    boardWrapper: {
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
    let boardMembers = [];


    if (state.admin.boardMembers && state.admin.boardMembers.length > 0) {
        boardMembers = state.admin.boardMembers;
    }



    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile,
        admin: state.firebase.profile.admin,
        loading: state.loading.loading,
        boardMembers: boardMembers,

    }
}

const AllBoardMembers = ({loading, setValue, boardMembers, openDialog, fetchBoardMembers}) => {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {

        fetchBoardMembers()
    }, [ fetchBoardMembers])
    return (
        <Grid container direction={"column"} alignItems={"center"}>
            <Head>
                <title key={"title"}>All Board Members - Admin | Dougies Guide</title>
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
            <Grid
                item
                container
                direction={"column"}
                alignItems={"center"}
                className={classes.boardWrapper}
            >
                {loading && <Loader pageLoader />}

                {!loading &&
                boardMembers &&
                boardMembers.map((member) => <BoardItem key={member.id} setValue={setValue} member={member}  openDialog={openDialog}/>)}
            </Grid>
        </Grid>
    );
};

export default connect(mapStateToProps) (AllBoardMembers);