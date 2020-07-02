import React from 'react';

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import {closeDialog} from "../store/actions/dialogActions/dialogActions";
import {connect} from "react-redux";

import Grid from "@material-ui/core/Grid";
import ReviewForm from "../ui/forms/ReviewForm";

const actions = {
    closeDialog
}

const ReviewDialog = ({closeDialog, profile, listing}) => {

    const handleClose = () => {
        closeDialog()
    }
    return (
        <Dialog open={true} onClose={handleClose}>
            <Grid container direction={'column'} style={{padding: '10px'}}>
                <Grid item>
                    <DialogTitle align={'center'}>Review {listing.title}</DialogTitle>
                </Grid>
                <Grid item>
                    <ReviewForm profile={profile} listing={listing}/>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default connect(null, actions)(ReviewDialog);