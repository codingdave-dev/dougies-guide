import React, {useEffect} from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import BoardMemberRoleForm from "../../../src/ui/forms/board/BoardMemberRoleForm";
import Head from "next/head";

const useStyles = makeStyles((theme) => ({
    // ADD STYLES HERE
}));



const AddBoardMemberRole = ({setValue, createBoardMemberRole}) => {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Grid container justify={"center"} direction={"column"}>
            <Head>
                <title key={"title"}>Add Board Member Role - Admin | Dougies Guide</title>
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
                <BoardMemberRoleForm setValue={setValue} createBoardMemberRole={createBoardMemberRole}/>
            </Grid>

        </Grid>
    );
};

export default AddBoardMemberRole;