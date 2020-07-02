import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Field, reduxForm } from "redux-form";
import Grid from "@material-ui/core/Grid";
import {
  combineValidators,
  composeValidators,
  matchesField,
  isRequired,
} from "revalidate";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";
import { addListingReview } from "../../store/actions/listingActions/listingActions";
import TextArea from "../../common/form/TextArea";

import Rating from "@material-ui/lab/Rating";
import {closeDialog} from "../../store/actions/dialogActions/dialogActions";

const actions = {
  addListingReview,
  closeDialog
};

const useStyles = makeStyles((theme) => ({
  reviewContainer: {
    paddingLeft: "0.7em",
    paddingRight: "0.7em",
  },
  error: {
    color: theme.palette.error.main,
    fontWeight: 500,
  },
}));

const validate = combineValidators({
  review: isRequired({ message: "Enter your review" }),
});

const ReviewForm = ({
    closeDialog,
  profile,
  listing,
  addListingReview,
  handleSubmit,
  error,
  submitting,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const [ratingValue, setRatingValue] = useState(0);

  return (
    <form
      autoComplete={"off"}
      onSubmit={handleSubmit((review) => {
        addListingReview(profile, listing, review, ratingValue);
        closeDialog()
      })}
    >
      <Grid container direction={"column"} className={classes.loginContainer}>
        <Grid item style={{ marginTop: "1em" }}>
          <Field
            label={"Review"}
            name={"description"}
            type={"text"}
            variant={"outlined"}
            component={TextArea}
            rows={5}
          />
        </Grid>

        <Grid item style={{ marginTop: 5 }}>
          <Rating
            name={"reviewRating"}
            value={ratingValue}
            precision={0.5}
            onChange={(event, newValue) => {
              setRatingValue(newValue);
            }}
          />
        </Grid>

        {error && (
          <Grid item style={{ marginTop: "0.5em" }}>
            <Typography variant={"subtitle1"} className={classes.error}>
              {error}
            </Typography>
          </Grid>
        )}

        <Grid item style={{ marginTop: "1.2em", marginBottom: "0.5em" }}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            type={"submit"}
            disabled={submitting}
          >
            ADD REVIEW
          </Button>
        </Grid>
        <Grid item style={{ marginBottom: "1.2em" }}>
          <Button
              variant="outlined"
              style={{color: theme.palette.common.grey, borderColor: theme.palette.common.grey}}
              fullWidth
              onClick={() => closeDialog()}
          >
            CANCEL
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: "reviewForm", validate })(ReviewForm));
