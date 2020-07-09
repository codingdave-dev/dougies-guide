import React from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    // ADD STYLES HERE
}));

const Loader = ({pageLoader}) => {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <Grid container alignItems={"center"} direction={"column"} style={pageLoader ? {marginTop: '10em'} : null}>
            <Grid item>
                <CircularProgress color={'primary'} />
            </Grid>

        </Grid>
    );
};

export default Loader;