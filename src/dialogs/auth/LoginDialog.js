import React from 'react';

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import {closeDialog} from "../../store/actions/dialogActions/dialogActions";
import {connect} from "react-redux";
import LoginForm from "../../ui/forms/auth/LoginForm";
import Grid from "@material-ui/core/Grid";
import DialogContentText from "@material-ui/core/DialogContentText";

const actions = {
    closeDialog
}

const LoginDialog = ({closeDialog, alert}) => {

    const handleClose = () => {
        closeDialog()
    }
    return (
      <Dialog open={true} onClose={handleClose}>
          <Grid container direction={'column'} style={{padding: '10px'}}>
             <Grid item>
                 <DialogTitle align={'center'}>Login to Dougies Guide</DialogTitle>
             </Grid>
              {alert && (
                  <Grid item>
                      <DialogContentText style={{fontSize: '0.9em'}} align={'center'}>{alert}</DialogContentText>
                  </Grid>
              )}
              <Grid item>
                  <LoginForm/>
              </Grid>
          </Grid>
      </Dialog>
    );
};

export default connect(null, actions)(LoginDialog);