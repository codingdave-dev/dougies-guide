import React from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    subTitle: {
        [theme.breakpoints.down("md")]: {
            fontSize: "2em",
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "1.5em",
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: "1.3em",
        },
    },
    text: {
        [theme.breakpoints.down("md")]: {
            fontSize: "1.2em",
        },
        [theme.breakpoints.down("sm")]: {
            fontSize: "1em",
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: "0.9em",
        },
    },
}));

const ContactSuccess = () => {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <Grid container alignItems={"center"} direction={"column"} style={{marginTop: '4em'}}>
            <Grid item>
                <Typography variant={'h3'} className={classes.subTitle}>Thank you for your message</Typography>
            </Grid>
            <Grid item style={{marginTop: '2em'}}>
                <Typography variant={'body1'} className={classes.text}>We will be in contact with you shortly.</Typography>
            </Grid>
        </Grid>
    );
};

export default ContactSuccess;