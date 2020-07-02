import React, {Fragment} from 'react';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
    error: {
        color: theme.palette.error.main,
        fontWeight: 300
    }
}));

const TextArea = ({input, label, type, variant, rows, required, width, meta:{touched, error}}) => {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Fragment>
            <TextField
                style={{width: width}}
                {...input}
                required={required}
                label={label}
                type={type}
                variant={variant}
                multiline
                rows={rows}
                fullWidth
            />
            {touched && error && (
                <Typography variant={'subtitle1'} className={classes.error}>{error}</Typography>
            )}
        </Fragment>

    );
};

export default TextArea;