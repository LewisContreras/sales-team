import React from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Icon from './icon';
import { signin } from '../../actions/auth';
import useStyles from './styles';

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    console.log(res.profileObj)

    try {
      dispatch(signin({result, token}, history));
      history.push('/sales');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => alert('Google Sign In was unsuccessful. Try again later');

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">Sign in</Typography>
        <form className={classes.form} >
          <GoogleLogin
            clientId="66986515561-a27jmg2uptacohmhgoljfjvarqiudtnk.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
