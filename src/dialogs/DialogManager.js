import React, { useState } from "react";
import { connect } from "react-redux";
import LoginDialog from "./auth/LoginDialog";
import RegisterDialog from "./auth/RegisterDialog";
import CheckinDialog from "./CheckinDialog";
import ReviewDialog from "./ReviewDialog";
import MainPhotoDialog from "./MainPhotoDialog";
import SubPhotoDialog from "./SubPhotoDialog";
import EditProfileDialog from "./user/EditProfileDialog";
import UserProfileImageDialog from "./user/UserProfileImageDialog";
import ChangeUserPasswordDialog from "./user/ChangeUserPasswordDialog";

const dialogLookup = {
  LoginDialog,
  RegisterDialog,
  CheckinDialog,
  ReviewDialog,
  MainPhotoDialog,
  SubPhotoDialog,
  EditProfileDialog,
  UserProfileImageDialog,
  ChangeUserPasswordDialog
};

const mapStateToProps = (state) => ({
  currentDialog: state.dialog,
});

const DialogManager = ({ currentDialog }) => {
  let renderedDialog;

  if (currentDialog) {
    const { dialogType, dialogProps } = currentDialog;
    const DialogComponent = dialogLookup[dialogType];

    renderedDialog = <DialogComponent {...dialogProps} />;
  }

  return <span>{renderedDialog}</span>;
};

export default connect(mapStateToProps)(DialogManager);
