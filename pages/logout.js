import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    // ADD STYLES HERE
}));

const Logout = () => {
    const router = useRouter()

    useEffect(() => {
        router.push('/')
    })
    return (
        <Grid container direction={'row'}>

        </Grid>
    );
};

export default Logout;