import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextInput from "../../../common/form/TextInput";
import { Field, reduxForm } from "redux-form";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";
import { combineValidators, isRequired } from "revalidate";

import SelectInput from "../../../common/form/SelectInput";

import CategoryLookup from "./formLookups/CategoryLookup";
import OptionsLookup from "./formLookups/OptionsLookup";
import MenuItem from "@material-ui/core/MenuItem";
import CheckboxInput from "../../../common/form/CheckboxInput";

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
    width: "100%",
    maxWidth: "40em",
  },
  error: {
    color: theme.palette.error.main,
    fontWeight: 500,
  },
  checkboxTitle: {
    color: theme.palette.primary.main,
    fontWeight: 500,
    fontSize: "1em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8em",
    },
  },
  checkbox: {
    "& .MuiSvgIcon-fontSizeSmall": {
      fontSize: "0.8em",
    },
  },
  checkboxLabel: {
    "& .MuiTypography-body1": {
      fontSize: "1em",
    },
  },
}));

const ListingDetailForm = ({ cancel, onBack, handleSubmit, error, submitting }) => {
  const classes = useStyles();
  const theme = useTheme();

  const categories = CategoryLookup.category;
  const costs = OptionsLookup.cost;
  const smoking = OptionsLookup.smoking;
  const takeoutDelivery = OptionsLookup.takeoutDelivery;
  const entertainment = OptionsLookup.entertainment;
  const activities = OptionsLookup.activities;

  return (
    <Grid item className={classes.formContainer}>
      <form autoComplete={"off"} onSubmit={handleSubmit}>
        <Grid item container direction={"column"}>
          <Grid item style={{ marginTop: "1em" }}>
            <Field
              name={"category"}
              label={"Category"}
              component={SelectInput}
              variant={"outlined"}
            >
              {categories.map((category) => (
                <MenuItem key={category.key} value={category.value}>
                  {category.text}
                </MenuItem>
              ))}
            </Field>
          </Grid>

          <Grid item style={{ marginTop: "1em" }}>
            <Field
              name={"cost"}
              label={"Cost"}
              component={SelectInput}
              variant={"outlined"}
            >
              {costs.map((cost) => (
                <MenuItem key={cost.key} value={cost.value}>
                  {cost.text}
                </MenuItem>
              ))}
            </Field>
          </Grid>

          <Grid item style={{ marginTop: "1em" }}>
            <Field
              name={"smoking"}
              label={"Smoking"}
              component={SelectInput}
              variant={"outlined"}
            >
              {smoking.map((smoke) => (
                <MenuItem key={smoke.key} value={smoke.value}>
                  {smoke.text}
                </MenuItem>
              ))}
            </Field>
          </Grid>

          <Grid item style={{ marginTop: "1em" }}>
            <Field
              name={"takeoutDelivery"}
              label={"Takeout / Delivery"}
              component={SelectInput}
              variant={"outlined"}
            >
              {takeoutDelivery.map((takeout) => (
                <MenuItem key={takeout.key} value={takeout.value}>
                  {takeout.text}
                </MenuItem>
              ))}
            </Field>
          </Grid>

          {/*CHECKBOXES*/}
          <Grid item style={{ marginTop: "1em" }}>
            <Grid item container justify={"space-around"}>

              {/*ACTIVITIES*/}
              <Grid item>
                <Grid
                  item
                  container
                  direction={"column"}

                >
                  <Grid item style={{ marginTop: "0.5em" }}>
                    <Typography
                      variant={"body1"}
                      className={classes.checkboxTitle}
                    >
                      Activities
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    container
                    direction={"column"}
                    style={{ marginTop: "0.5em" }}
                  >
                    {activities.map((activity) => (
                      <Grid
                        key={activity.key}
                        item
                        style={{ marginBottom: "-8px" }}
                      >
                        <Field
                          name={`activity_` + activity.value}
                          label={activity.text}
                          component={CheckboxInput}
                          checkboxClass={classes.checkbox}
                          checkboxLabelClass={classes.checkboxLabel}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>

              {/*ENTERTAINMENT*/}
              <Grid item>
                <Grid
                  item
                  container
                  direction={"column"}
                >
                  <Grid item style={{ marginTop: "0.5em" }}>
                    <Typography
                      variant={"body1"}
                      className={classes.checkboxTitle}
                    >
                      Entertainment
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    container
                    direction={"column"}
                    style={{ marginTop: "0.5em" }}
                  >
                    {entertainment.map((ent) => (
                      <Grid key={ent.key} item style={{ marginBottom: "-8px" }}>
                        <Field
                          name={`entertainment_` + ent.value}
                          label={ent.text}
                          component={CheckboxInput}
                          checkboxClass={classes.checkbox}
                          checkboxLabelClass={classes.checkboxLabel}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
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
                color="primary"
                fullWidth
                type={"submit"}
                disabled={submitting}
                onClick={onBack}
            >
              Back
            </Button>
          </Grid>
          <Grid item style={{marginBottom: "1em" }}>
            <Button
                variant="outlined"
                // color={theme.palette.common.grey}
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
