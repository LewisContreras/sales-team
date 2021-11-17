import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';
import alertSuccess from '../../helpers/succesAlert';
import { Redirect } from 'react-router-dom';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ product: '', message: '', saleId: '', selectedFile: '', price: '', quantity: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ price: 0, saleId: '' , quantity: 0, product:'',client: '', selectedFile: '', docClient: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name, totalPrice: postData.price * postData.quantity }));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, totalPrice: postData.price * postData.quantity }));
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
        <Typography variant="h6">{currentId ? `Editing "${post.product}"` : 'Creating a Sale'}</Typography>
        <TextField required name="product" variant="outlined" label="Product" fullWidth value={postData.product} onChange={(e) => setPostData({ ...postData, product: e.target.value })} />
        <TextField required name="saleId" variant="outlined" label="Sale Identification" fullWidth value={postData.saleId} disabled={!!currentId} onChange={(e) => setPostData({ ...postData, saleId: e.target.value })} />
        <TextField required type="number" name="price" variant="outlined" label="Price" fullWidth value={postData.price} onChange={(e) => setPostData({ ...postData, price: e.target.value })} />
        <TextField required type="number" name="quantity" variant="outlined" label="Quantity" fullWidth value={postData.quantity} onChange={(e) => setPostData({ ...postData, quantity: e.target.value })} />
        <TextField required name="client" variant="outlined" label="Client" fullWidth value={postData.client} onChange={(e) => setPostData({ ...postData, client: e.target.value })} />
        <TextField required name="docClient" variant="outlined" label="Client Document" fullWidth value={postData.docClient} onChange={(e) => setPostData({ ...postData, docClient: e.target.value })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
