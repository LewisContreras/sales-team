import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, MenuItem, Select, InputLabel, FormControl } from '@material-ui/core';
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
      dispatch(updateUser(currentId, { ...postData}));
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
      <form  autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.name}"` : 'Choose a User'}</Typography>
        <TextField required name="name" variant="outlined" disabled label="Name" fullWidth value={postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })} />
        <FormControl style={{margin: "0 0 10px 0"}} disabled={!post} required fullWidth >
        <InputLabel id="role-label">Role</InputLabel>
        <Select
          labelId="role-label"
          value={postData.role}
          name="role"
          label="Role"
          variant="outlined"
          onChange={(e) => setPostData({ ...postData, role: e.target.value })}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="seller">Seller</MenuItem>
        </Select>
        </FormControl>
        <FormControl disabled={!post} required fullWidth >
        <InputLabel id="state-label">State</InputLabel>
        <Select
          labelId="state-label"
          value={postData.state}
          name="state"
          label="State"
          variant="outlined"
          onChange={(e) => setPostData({ ...postData, state: e.target.value })}
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="authorized">Authorized</MenuItem>
          <MenuItem value="unauthorized">Unauthorized</MenuItem>
        </Select>
        </FormControl>
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default FormUsers;
