import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import {
  combineValidators,
  isRequired,
} from "revalidate";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../common/form/TextInput";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { updateUserProfile } from "../../../store/actions/userActions/userActions";

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    paddingLeft: "0.7em",
    paddingRight: "0.7em",
  },
  error: {
    color: theme.palette.error.main,
    fontWeight: 500,
  },
}));

const actions = {
  updateUserProfile,
};

const mapStateToProps = (state) => {
  return {
    initialValues: state.firebase.profile,
  };
};

const validate = combineValidators({
  firstName: isRequired({ message: "Enter first name" }),
  lastName: isRequired({ message: "Enter last name" }),
  email: isRequired({ message: "Enter Your Email" }),
});

const EditProfileForm = ({
  updateUserProfile,
  handleSubmit,
  error,
  submitting,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <form autoComplete={"off"} onSubmit={handleSubmit(updateUserProfile)}>
      <Grid container direction={"column"} className={classes.profileContainer}>
        <Grid item style={{ marginTop: "1em" }}>
          <Field
            label={"First Name"}
            name={"firstName"}
            type={"text"}
            variant={"outlined"}
            component={TextInput}
          />
        </Grid>

        <Grid item style={{ marginTop: "1em" }}>
          <Field
            label={"Last Name"}
            name={"lastName"}
            type={"text"}
            variant={"outlined"}
            component={TextInput}
          />
        </Grid>
        <Grid item style={{ marginTop: "1em" }}>
          <Field
            label={"Email"}
            name={"email"}
            type={"text"}
            variant={"outlined"}
            component={TextInput}
          />
        </Grid>

        {error && (
          <Grid item style={{ marginTop: "0.5em" }}>
            <Typography variant={"subtitle1"} className={classes.error}>
              {error}
            </Typography>
          </Grid>
        )}

        <Grid item style={{ marginTop: "1.2em", marginBottom: "1.2em" }}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            type={"submit"}
            disabled={submitting}
          >
            Update
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default connect(
  mapStateToProps,
  actions
)(
  reduxForm({
    form: "editProfileForm",
    validate,
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true,
    enableReinitialize: true,
  })(EditProfileForm)
);
