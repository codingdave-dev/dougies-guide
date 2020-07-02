import React, { Fragment } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  error: {
    color: theme.palette.error.main,
    fontWeight: 300,
  },
}));

const SelectInput = ({
  input,
  children,
  label,
  name,
  variant,
  meta: { touched, error },
}) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Fragment>
      <TextField
        fullWidth
        select
        {...input}
        name={name}
        variant={variant}
        label={label}
      >
        {children}
      </TextField>

      {touched && error && (
        <Typography variant={"subtitle1"} className={classes.error}>
          {error}
        </Typography>
      )}
    </Fragment>
  );
};

export default SelectInput;
