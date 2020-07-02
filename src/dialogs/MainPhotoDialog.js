import React from 'react';

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import {closeDialog} from "../store/actions/dialogActions/dialogActions";
import {connect} from "react-redux";

import Grid from "@material-ui/core/Grid";
import MainListingPhoto from "../ui/listing/photoControl/MainListingPhoto";

const actions = {
    closeDialog,
}

const MainPhotoDialog = ({closeDialog, profile, listing}) => {

    const handleClose = () => {
        closeDialog()
    }
    return (
        <Dialog open={true} onClose={handleClose}  >
            <Grid container direction={'column'} style={{padding: '10px'}}>
                <Grid item>
                    <DialogTitle align={'center'}>Change Main Photo</DialogTitle>
                </Grid>
                <Grid item>
                    <MainListingPhoto listing={listing} profile={profile}/>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default connect(null, actions)(MainPhotoDialog);