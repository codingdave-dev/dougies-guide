import React from 'react';

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import {closeDialog} from "../../store/actions/dialogActions/dialogActions";
import {connect} from "react-redux";

import Grid from "@material-ui/core/Grid";
import DialogContentText from "@material-ui/core/DialogContentText";
import ChangePasswordForm from "../../ui/forms/user/ChangePasswordForm";

const actions = {
    closeDialog
}

const ChangeUserPasswordDialog = ({closeDialog, alert}) => {

    const handleClose = () => {
        closeDialog()
    }
    return (
        <Dialog open={true} onClose={handleClose}>
            <Grid container direction={'column'} style={{padding: '10px'}}>
                <Grid item>
                    <DialogTitle align={'center'}>Change Password</DialogTitle>
                </Grid>
                {alert && (
                    <Grid item>
                        <DialogContentText style={{fontSize: '0.9em'}} align={'center'}>{alert}</DialogContentText>
                    </Grid>
                )}
                <Grid item>
                    <ChangePasswordForm/>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default connect(null, actions)(ChangeUserPasswordDialog);