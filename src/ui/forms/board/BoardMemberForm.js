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
  uid: isRequired({ message: "Board Member is required" }),
  title: isRequired({ message: "Board Role is required" }),
  description: isRequired({ message: "Description is required" }),

});

const BoardMemberForm = ({ allAdminsAndUsers, boardRoles, handleSubmit, error, submitting, setValue, createBoardMember }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  const onFormSubmit = async (values) => {
    try {
      const user = allAdminsAndUsers.filter((array) => values.uid === array.uid)
      const uid = user[0].uid
      const fullName = user[0].fullName
      const photoURL = user[0].photoURL
      const title = values.title
      const description = values.description

      await createBoardMember(uid, fullName, photoURL, title, description)
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
                      name={"uid"}
                      label={"Board Member"}
                      component={SelectInput}
                      variant={"outlined"}
                  >
                    {allAdminsAndUsers.map((user) => (
                        <MenuItem key={user.id} value={user.uid}>
                          {user.fullName}
                        </MenuItem>
                    ))}
                  </Field>
                </Grid>

                <Grid item style={{ marginTop: "1em" }}>
                  <Field
                      name={"title"}
                      label={"Board Role"}
                      component={SelectInput}
                      variant={"outlined"}
                  >
                    {boardRoles.map((role) => (
                        <MenuItem key={role.id} value={role.boardRole}>
                          {role.boardRole}
                        </MenuItem>
                    ))}
                  </Field>
                </Grid>

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
  form: "addBoardMember",
  validate,
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true,
}) (BoardMemberForm);
