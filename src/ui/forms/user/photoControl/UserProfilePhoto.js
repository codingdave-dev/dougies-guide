import React, { Fragment, useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelIcon from "@material-ui/icons/Cancel";
import {
  closeDialog,
  openDialog,
} from "../../../../store/actions/dialogActions/dialogActions";
import DropzoneInput from "../../../../dropzone/DropzoneInput";
import CropperInput from "../../../../dropzone/CropperInput";

import {
  addListingMainPhoto,
  deleteListingMainPhoto,
} from "../../../../store/actions/listingActions/listingActions";
import {
  addUserProfilePhoto,
  deleteUserProfilePhoto,
  updateUserProfilePhoto,
} from "../../../../store/actions/userActions/userActions";

const useStyles = makeStyles((theme) => ({
  mainImage: {
    borderRadius: "100%",
    width: 250,
    [theme.breakpoints.down("md")]: {
      width: 240,
    },
    [theme.breakpoints.down("sm")]: {
      width: 225,
    },
    [theme.breakpoints.down("xs")]: {
      width: 200,
    },
  },
}));



const actions = {
  closeDialog,
  addUserProfilePhoto,
  updateUserProfilePhoto,
  deleteUserProfilePhoto,
};

const UserProfilePhoto = ({

  closeDialog,
  listing,
  profile,
  addUserProfilePhoto,
  updateUserProfilePhoto,
  deleteUserProfilePhoto,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);

  const [defaultPhoto, setDefaultPhoto] = useState(false);
  const [mainPhoto, setMainPhoto] = useState(true);

  const [showDropzone, setShowDropzone] = useState(false);
  const [showCropper, setShowCropper] = useState(false);

  const [updateImage, setUpdateImage] = useState(false);

  useEffect(() => {
    if (profile.photoURL === "/assets/avatar/user.png") {
      setDefaultPhoto(true);
    }
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files, listing]);

  // HANDLERS

  const handleDropzone = () => {
    setMainPhoto(false);
    setShowDropzone(true);
  };

  const handleCropper = () => {
    setShowCropper(true);
    setShowDropzone(false);
    setMainPhoto(false);
  };

  const handleUploadImage = async () => {
    setShowCropper(false);
    setMainPhoto(true);
    // closeDialog();
    try {
      await addUserProfilePhoto(image);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateImage = async () => {
    setShowCropper(false);
    setMainPhoto(true);
    // closeDialog();
    try {
      await updateUserProfilePhoto(image, profile.photoName);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteImage = async () => {
    // closeDialog();
    try {
      await deleteUserProfilePhoto(profile.photoName);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container direction={"column"} alignItems={"center"}>
      {/*MAIN PHOTO*/}
      {mainPhoto && (
        <Fragment>
          {/*MAIN IMAGE*/}
          <Grid item>
            <img
                className={classes.mainImage}
                src={profile.photoURL}
                alt={`${profile.fullName} profile photo`}
            />

          </Grid>
          {/*BUTTONS*/}
          <Grid
            item
            container
            justify={"center"}
            spacing={1}
            style={{ marginTop: 3 }}
          >
            {defaultPhoto && (
              <Grid item>
                <Button
                  variant="outlined"
                  size={"small"}
                  style={{
                    color: theme.palette.common.green,
                    borderColor: theme.palette.common.green,
                  }}
                  startIcon={<AddAPhotoIcon />}
                  fullWidth
                  onClick={() => handleDropzone()}
                >
                  Add Photo
                </Button>
              </Grid>
            )}

            {!defaultPhoto && (
              <Fragment>
                <Grid item>
                  <Button
                    variant="outlined"
                    size={"small"}
                    style={{
                      color: theme.palette.primary.main,
                      borderColor: theme.palette.primary.main,
                    }}
                    startIcon={<AddAPhotoIcon />}
                    fullWidth
                    onClick={() => {
                      handleDropzone();
                      setUpdateImage(true);
                    }}
                  >
                    Update
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    size={"small"}
                    style={{
                      color: theme.palette.error.main,
                      borderColor: theme.palette.error.main,
                    }}
                    startIcon={<DeleteIcon />}
                    fullWidth
                    onClick={() => handleDeleteImage()}
                  >
                    Delete
                  </Button>
                </Grid>
              </Fragment>
            )}

            <Grid item>
              <Button
                variant="outlined"
                size={"small"}
                style={{
                  color: theme.palette.common.grey,
                  borderColor: theme.palette.common.grey,
                }}
                startIcon={<CancelIcon />}
                fullWidth
                onClick={() => closeDialog()}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Fragment>
      )}

      {/*DROPZONE*/}
      {showDropzone && (
        <Fragment>
          <Grid item>
            <DropzoneInput
              setFiles={setFiles}
              showCropper={() => handleCropper()}
            />
          </Grid>
          <Grid
            item
            container
            justify={"center"}
            spacing={2}
            style={{ marginTop: 3 }}
          >
            <Grid item>
              <Button
                variant="outlined"
                size={"small"}
                style={{
                  color: theme.palette.common.grey,
                  borderColor: theme.palette.common.grey,
                }}
                startIcon={<CancelIcon />}
                fullWidth
                onClick={() => closeDialog()}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Fragment>
      )}

      {/*CROPPER*/}
      {showCropper && (
        <Fragment>
          <Grid item style={{ maxWidth: "100%" }}>
            <CropperInput setImage={setImage} imagePreview={files[0].preview} />
          </Grid>
          <Grid
            item
            container
            justify={"center"}
            spacing={2}
            style={{ marginTop: 3 }}
          >
            <Grid item>
              <Button
                variant="outlined"
                size={"small"}
                style={{
                  color: theme.palette.common.green,
                  borderColor: theme.palette.common.green,
                }}
                startIcon={<AddAPhotoIcon />}
                fullWidth
                onClick={() =>
                  updateImage ? handleUpdateImage() : handleUploadImage()
                }
              >
                Upload
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
                startIcon={<CancelIcon />}
                fullWidth
                onClick={() => closeDialog()}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Fragment>
      )}
    </Grid>
  );
};

export default connect(null, actions)(UserProfilePhoto);
