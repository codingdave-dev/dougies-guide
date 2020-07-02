import React, {Fragment} from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";


const useStyles = makeStyles((theme) => ({
    error: {
        color: theme.palette.error.main,
        fontWeight: 300
    }
}));

const CheckboxInput = ({input, label, value, checkboxClass, checkboxLabelClass, meta:{touched, error}}) => {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Fragment>
            <FormControlLabel
                control={
                    <Checkbox
                        // checked={input.value ? true : false}
                        checked={value}
                        onChange={input.onChange}
                        color={'primary'}
                        size={'small'}
                        className={checkboxClass}
                    />
                }
                className={checkboxLabelClass}
                label={label}
            />
            {touched && error && (
                <Typography variant={'subtitle1'} className={classes.error}>{error}</Typography>
            )}
        </Fragment>

    );
};

export default CheckboxInput;