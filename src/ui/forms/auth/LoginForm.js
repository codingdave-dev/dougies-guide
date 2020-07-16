import React, {useState} from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextInput from "../../../common/form/TextInput";
import { Field, reduxForm } from "redux-form";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {login, resetPassword, socialLogin} from "../../../store/actions/authActions/authActions";
import Typography from "@material-ui/core/Typography";
import SocialLogin from "./SocialLogin";

const actions = {
    login,
  socialLogin,
  resetPassword
}

const useStyles = makeStyles((theme) => ({
  loginContainer: {
    paddingLeft: "0.7em",
    paddingRight: "0.7em",
  },
  error: {
    color: theme.palette.error.main,
    fontWeight: 500
  },
  forgotPassword: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    fontSize: '0.8em'
  }
}));

const LoginForm = ({login, socialLogin, resetPassword, handleSubmit, error, submitting}) => {
  const classes = useStyles();
  const theme = useTheme();

  const [loginScreen, setLoginScreen] = useState(true)
  const [resetPasswordScreen, setResetPasswordScreen] = useState(false)

  const handleResetPassword = () => {
    setLoginScreen(false)
    setResetPasswordScreen(true)
  }

  const handleLogin = () => {
    setLoginScreen(true)
    setResetPasswordScreen(false)
  }

  return (
    <form autoComplete={"off"} onSubmit={handleSubmit(loginScreen ? login : resetPassword)}>
      <Grid container direction={"column"} className={classes.loginContainer}>
        <Grid item style={{ marginTop: "1em" }}>
          <Field
            label={"Email"}
            name={"email"}
            type={'text'}
            variant={"outlined"}
            component={TextInput}
          />
        </Grid>

        {loginScreen && (
            <Grid item style={{ marginTop: "1.5em" }}>
              <Field
                  label={"Password"}
                  name={"password"}
                  type={'password'}
                  variant={"outlined"}
                  component={TextInput}
              />
            </Grid>
        )}


        {error &&
        <Grid item style={{marginTop: '0.5em'}} >
          <Typography variant={'subtitle1'} className={classes.error}>{error}</Typography>
        </Grid>
        }

        <Grid item style={{ marginTop: "1.2em", marginBottom: "1.2em" }}>
          <Button variant="outlined" color="primary" fullWidth type={'submit'} disabled={submitting}>
            {loginScreen ? 'Login' : 'Reset Password'}
          </Button>
        </Grid>

        <SocialLogin socialLogin={socialLogin}/>

        {!resetPasswordScreen && (
            <Grid item style={{marginTop: '0.8em', marginBottom: "0.8em"}}>
              <Typography variant={'subtitle2'} className={classes.forgotPassword} align={'center'} onClick={() => handleResetPassword()}>Forgot password?</Typography>
            </Grid>
        )}
        {resetPasswordScreen && (
            <Grid item style={{marginBottom: "0.8em"}}>
              <Typography variant={'subtitle2'} className={classes.forgotPassword} align={'center'} onClick={() => handleLogin()}>Login?</Typography>
            </Grid>
        )}


      </Grid>
    </form>
  );
};

export default connect(null, actions) (reduxForm({ form: "loginForm" })(LoginForm));
