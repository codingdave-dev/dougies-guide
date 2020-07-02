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
import TextArea from "../../../common/form/TextArea";

const validate = combineValidators({
    description: isRequired({ message: "Description is required" }),

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



const ListingDescriptionForm = ({ onBack, cancel,  handleSubmit, error, submitting }) => {
    const classes = useStyles();
    const theme = useTheme();

    return (

        <Grid item className={classes.formContainer}>
            <form autoComplete={"off"} onSubmit={handleSubmit}>
                <Grid item container direction={'column'}>
                    <Grid item style={{ marginTop: "1em" }}>
                        <Field
                            name={"description"}
                            label={"Description"}
                            component={TextArea}
                            type={"text"}
                            variant={"outlined"}
                            rows={12}
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
                            Submit
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
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true,
    enableReinitialize: true,
})(ListingDescriptionForm);
