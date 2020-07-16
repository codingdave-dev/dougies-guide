import React, {Fragment} from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {Grid} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";

import FacebookIcon from '@material-ui/icons/Facebook';

const useStyles = makeStyles((theme) => ({
    facebookButton: {
        backgroundColor: theme.palette.social.facebook,
        color: theme.palette.common.white
    },
    googleButton: {
        backgroundColor: theme.palette.social.google,
        color: theme.palette.common.white
    }
}));

const SocialLogin = ({socialLogin}) => {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <Fragment>
            <Grid item style={{marginBottom: '0.5em'}}>
                <Button variant="contained" className={classes.facebookButton} fullWidth type={'submit'} onClick={() => socialLogin('facebook')}>
                    Login With Facebook
                </Button>
            </Grid>
            <Grid item style={{marginBottom: '0.5em'}}>
                <Button variant="contained" className={classes.googleButton} fullWidth type={'submit'} onClick={() => socialLogin('google')}>
                    Login With Google
                </Button>
            </Grid>
        </Fragment>

    );
};

export default SocialLogin;