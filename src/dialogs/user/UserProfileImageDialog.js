import React from 'react';

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import {closeDialog} from "../../store/actions/dialogActions/dialogActions";
import {connect} from "react-redux";

import Grid from "@material-ui/core/Grid";
import UserProfilePhoto from "../../ui/forms/user/photoControl/UserProfilePhoto";

const actions = {
    closeDialog,
}

const UserProfileImageDialog = ({closeDialog, profile}) => {

    const handleClose = () => {
        closeDialog()
    }
    return (
        <Dialog open={true} onClose={handleClose}  >
            <Grid container direction={'column'} style={{padding: '10px'}}>
                <Grid item>
                    <DialogTitle align={'center'}>Change Profile Photo</DialogTitle>
                </Grid>
                <Grid item>
                    <UserProfilePhoto profile={profile}/>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default connect(null, actions)(UserProfileImageDialog);