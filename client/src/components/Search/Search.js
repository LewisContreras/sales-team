import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from '../Form/styles';
import { findPost } from '../../actions/posts';


const Search = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({saleId: '', client: '', docClient: ''});
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(findPost(postData))
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
      </Paper>
    );
  }

  return (
    <Paper style={{marginBottom: "20px"}} className={classes.paper}>
      <form   autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <TextField style={{width: "25%"}} name="saleId" variant="outlined" label="Sale Identification"  value={postData.saleId} disabled={currentId} onChange={(e) => setPostData({ ...postData, saleId: e.target.value })} />
        <TextField style={{width: "20%"}} name="client" variant="outlined" label="Client"  value={postData.client} onChange={(e) => setPostData({ ...postData, client: e.target.value })} />
        <TextField style={{width: "25%"}} name="docClient" variant="outlined" label="Client Document"  value={postData.docClient} onChange={(e) => setPostData({ ...postData, docClient: e.target.value })} />
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" >Search</Button>
      </form>
    </Paper>
  );
};

export default Search;
