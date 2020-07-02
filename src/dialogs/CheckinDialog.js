import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { closeDialog } from "../store/actions/dialogActions/dialogActions";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import DialogContentText from "@material-ui/core/DialogContentText";

import Button from "@material-ui/core/Button";
import { useTheme } from "@material-ui/core/styles";

import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import { deleteUserCheckin } from "../store/actions/userActions/userActions";

const actions = {
  closeDialog,
  deleteUserCheckin,
};

const CheckinDialog = ({
  closeDialog,
  deleteUserCheckin,
  userId,
  listingId,
  checkinId,
}) => {
  const theme = useTheme();

  const handleClose = () => {
    closeDialog();
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <Grid container direction={"column"} style={{ padding: "10px" }}>
        <Grid item>
          <DialogTitle align={"center"}>Already Checked In</DialogTitle>
        </Grid>
        <Grid item>
          <DialogContentText align={"center"}>
            What do you wish to do?
          </DialogContentText>
        </Grid>

        <Grid
          item
          container
          direction={"column"}
          spacing={1}
          style={{ marginTop: 10 }}
        >
          <Grid item>
            <Button
              variant="outlined"
              size={"small"}
              style={{
                color: theme.palette.error.main,
                borderColor: theme.palette.error.main,
              }}
              startIcon={<DeleteIcon />}
              onClick={() => {
                deleteUserCheckin(userId, listingId, checkinId);
                handleClose();
              }}
              fullWidth
            >
              Remove Checkin
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              size={"small"}
              style={{
                color: theme.palette.common.grey,
                borderColor: theme.palette.common.grey,
              }}
              fullWidth
              startIcon={<CancelIcon />}
              onClick={() => handleClose()}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
};

export default connect(null, actions)(CheckinDialog);
