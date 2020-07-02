import React from 'react';

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import {closeDialog} from "../../store/actions/dialogActions/dialogActions";
import {connect} from "react-redux";

import Grid from "@material-ui/core/Grid";
import EditProfileForm from "../../ui/forms/user/EditProfileForm";

const actions = {
    closeDialog
}

const EditProfileDialog = ({closeDialog}) => {

    const handleClose = () => {
        closeDialog()
    }
    return (
        <Dialog open={true} onClose={handleClose}>
            <Grid container direction={'column'} style={{padding: '10px'}}>
                <Grid item>
                    <DialogTitle align={'center'}>Edit Your Profile</DialogTitle>
                </Grid>
                <Grid item>
                    <EditProfileForm />
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default connect(null, actions)(EditProfileDialog);