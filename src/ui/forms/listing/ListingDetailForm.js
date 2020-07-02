import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextInput from "../../../common/form/TextInput";
import { Field, reduxForm } from "redux-form";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";
import { combineValidators, isRequired } from "revalidate";

import SelectInput from "../../../common/form/SelectInput";

import StateLookup from "./formLookups/StateLookup";
import CountryLookup from "./formLookups/CountryLookup";
import MenuItem from "@material-ui/core/MenuItem";

const validate = combineValidators({
  title: isRequired({ message: "Title is required" }),
  address1: isRequired({ message: "Address is required" }),
  city: isRequired({ message: "City is required" }),
  state: isRequired({ message: "State is required" }),
  zipCode: isRequired({ message: "Zip Code is required" }),
  country: isRequired({ message: "Country is required" }),
});

const useStyles = makeStyles((theme) => ({
  formContainer: {
    paddingLeft: "0.7em",
    paddingRight: "0.7em",
    width: '100%',
    maxWidth: '40em'
  },
  error: {
    color: theme.palette.error.main,
    fontWeight: 500,
  }
}));



const ListingDetailForm = ({  cancel,  handleSubmit, error, submitting }) => {
  const classes = useStyles();
  const theme = useTheme();
  const states = StateLookup.states
  const countries = CountryLookup.country
  return (

      <Grid item className={classes.formContainer}>
        <form autoComplete={"off"} onSubmit={handleSubmit}>
        <Grid item container direction={'column'}>
          <Grid item style={{ marginTop: "1em" }}>
            <Field
                name={"title"}
                label={"Title"}
                component={TextInput}
                type={"text"}
                variant={"outlined"}
            />
          </Grid>
          <Grid item style={{ marginTop: "1em" }}>
            <Field
                name={"address1"}
                label={"Address 1"}
                component={TextInput}
                type={"text"}
                variant={"outlined"}
            />
          </Grid>
          <Grid item style={{ marginTop: "1em" }}>
            <Field
                name={"address2"}
                label={"Address 2"}
                component={TextInput}
                type={"text"}
                variant={"outlined"}
            />
          </Grid>
          <Grid item style={{ marginTop: "1em" }}>
            <Field
                name={"city"}
                label={"City"}
                component={TextInput}
                type={"text"}
                variant={"outlined"}
            />
          </Grid>
          <Grid item style={{ marginTop: "1em" }}>
            <Field

                name={'state'}
                label={'State'}
                component={SelectInput}
                variant={'outlined'}
            >
              {states.map(state => (
                  <MenuItem key={state.key} value={state.value}>{state.text}</MenuItem>
              ))}

            </Field>
          </Grid>
          <Grid item style={{ marginTop: "1em" }}>
            <Field
                name={"zipCode"}
                label={"Zip Code"}
                component={TextInput}
                type={"text"}
                variant={"outlined"}
            />
          </Grid>
          <Grid item style={{ marginTop: "1em" }}>
            <Field
                name={'country'}
                label={'Country'}
                component={SelectInput}
                variant={'outlined'}
            >
              {countries.map(country => (
                  <MenuItem key={country.key} value={country.value}>{country.text}</MenuItem>
              ))}

            </Field>
          </Grid>

          <Grid item style={{ marginTop: "1em" }}>
            <Field
                name={"phone"}
                label={"Phone"}
                component={TextInput}
                type={"text"}
                variant={"outlined"}
            />
          </Grid>
          <Grid item style={{ marginTop: "1em" }}>
            <Field
                name={"email"}
                label={"Email"}
                component={TextInput}
                type={"text"}
                variant={"outlined"}
            />
          </Grid>
          <Grid item style={{ marginTop: "1em" }}>
            <Field
                name={"webUrl"}
                label={"Web URL"}
                component={TextInput}
                type={"text"}
                variant={"outlined"}
            />
          </Grid>



          {error && (
              <Grid item style={{ marginTop: "0.5em" }}>
                <Typography variant={"subtitle1"} className={classes.error}>
                  {error}
                </Typography>
              </Grid>
          )}

          <Grid item style={{ marginTop: "1.2em", marginBottom: "1em" }}>
            <Button
                variant="outlined"
                color="primary"
                fullWidth
                type={"submit"}
                disabled={submitting}
            >
              Next
            </Button>
          </Grid>
          <Grid item style={{marginBottom: "1em" }}>
            <Button
                variant="outlined"
                color={theme.palette.common.grey}
                fullWidth
                onClick={cancel}
            >
              Cancel
            </Button>
          </Grid>

        </Grid>
        </form>
      </Grid>

  );
};

export default reduxForm({
  form: "newListing",
  validate,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true,
})(ListingDetailForm);
