import React from 'react';

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import {closeDialog} from "../../store/actions/dialogActions/dialogActions";
import {connect} from "react-redux";
import RegisterForm from "../../ui/forms/auth/RegisterForm";
import Grid from "@material-ui/core/Grid";

const actions = {
    closeDialog
}

const RegisterDialog = ({closeDialog}) => {

    const handleClose = () => {
        closeDialog()
    }
    return (
        <Dialog open={true} onClose={handleClose}>
            <Grid container direction={'column'} style={{padding: '10px'}}>
                <Grid item>
                    <DialogTitle align={'center'}>Sign Up to Dougies Guide</DialogTitle>
                </Grid>
                <Grid item>
                    <RegisterForm/>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default connect(null, actions)(RegisterDialog);