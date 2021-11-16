import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from '../../Form/styles';
import alertSuccess from '../../../helpers/succesAlert';
import { Redirect } from 'react-router-dom';
import { createUser, updateUser } from '../../../actions/users';

const FormUsers = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ name: '', role: '', state: '', selectedFile: ''});
  const post = useSelector((state) => (currentId ? state.users.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ name: '', role: '', state: '', selectedFile: ''});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createUser({ ...postData, name: user?.result?.name}));
      clear();
    } else {
      dispatch(updateUser(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
    alertSuccess()
  };

  if (!user?.result?.name) {
    return (
        <Redirect to="/auth" />
    );
  }

  return (
    <Paper  className={classes.paper}>
      <form  autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.product}"` : 'Creating a Product'}</Typography>
        <TextField name="name" variant="outlined" disabled label="Name" fullWidth value={postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })} />
        <TextField name="role" variant="outlined" label="Role" fullWidth value={postData.role} onChange={(e) => setPostData({ ...postData, role: e.target.value })} />
        <TextField name="state" variant="outlined" label="State" fullWidth value={postData.state} onChange={(e) => setPostData({ ...postData, state: e.target.value })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default FormUsers;
