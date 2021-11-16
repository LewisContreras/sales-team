import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from '../../Form/styles';
import { findProduct } from '../../../actions/products';


const SearchProducts = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({productId: '', description: ''});
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(findProduct(postData))
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
        <TextField style={{width: "30%"}} name="productId" variant="outlined" label="Product Identification"  value={postData.productId} disabled={currentId} onChange={(e) => setPostData({ ...postData, productId: e.target.value })} />
        <TextField style={{width: "30%"}} name="description" variant="outlined" label="Description"  value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} />
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" >Search</Button>
      </form>
    </Paper>
  );
};

export default SearchProducts;
