import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {Field, reduxForm} from "redux-form";
import SelectInput from "../../../common/form/SelectInput";
import MenuItem from "@material-ui/core/MenuItem";
import TextArea from "../../../common/form/TextArea";
import {combineValidators, isRequired} from "revalidate";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Router from "next/router";
import {createBoardMember} from "../../../store/actions/adminActions/adminBoardActions";
import TextInput from "../../../common/form/TextInput";

const useStyles = makeStyles((theme) => ({
    formWrapper: {
        width: "60%",
        [theme.breakpoints.down("md")]: {
            width: "90%",
        },
        [theme.breakpoints.down("sm")]: {
            width: "95%",
        },
    },
    error: {
        color: theme.palette.error.main,
        fontWeight: 500,
    }
}));

const validate = combineValidators({
    boardRole: isRequired({ message: "Role is required" }),


});

const BoardMemberRoleForm = ({ handleSubmit, error, submitting, setValue, createBoardMemberRole }) => {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

    const onFormSubmit = async (values) => {
        try {
            createBoardMemberRole(values)
            setValue(0)
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = () => {
        setValue(0)
    };

    return (
        <Grid container direction={"column"} alignItems={"center"}>
            <Grid
                item
                container
                direction={"column"}
                className={classes.formWrapper}
            >
                <Grid item>
                    <form autoComplete={"off"} onSubmit={handleSubmit(onFormSubmit)}>

                        <Grid item container direction={"column"}>

                            <Grid item style={{ marginTop: "1em" }}>
                                <Field
                                    name={"boardRole"}
                                    label={"Role Type"}
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
                                    Submit
                                </Button>
                            </Grid>

                            <Grid item style={{ marginBottom: "1em" }}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    onClick={() => handleCancel()}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>

            </Grid>
        </Grid>

    );
};

export default reduxForm({
    form: "addBoardMemberRole",
    validate,
    destroyOnUnmount: true,
    forceUnregisterOnUnmount: true,
    enableReinitialize: true,
}) (BoardMemberRoleForm);
