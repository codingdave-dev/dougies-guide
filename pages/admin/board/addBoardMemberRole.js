import React, {useEffect} from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import BoardMemberRoleForm from "../../../src/ui/forms/board/BoardMemberRoleForm";

const useStyles = makeStyles((theme) => ({
    // ADD STYLES HERE
}));



const AddBoardMemberRole = ({setValue, createBoardMemberRole}) => {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Grid container justify={"center"} direction={"column"}>
            <Grid item style={{marginTop: '1em'}}>
                <BoardMemberRoleForm setValue={setValue} createBoardMemberRole={createBoardMemberRole}/>
            </Grid>

        </Grid>
    );
};

export default AddBoardMemberRole;