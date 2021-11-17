import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from '../../Form/styles';
import alertSuccess from '../../../helpers/succesAlert';
import { Redirect } from 'react-router-dom';
import { createProduct, updateProduct } from '../../../actions/products';

const FormProducts = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ nameProduct: '', productId: '', description: '', selectedFile: '', price: '', state: '' });
  const post = useSelector((state) => (currentId ? state.products.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ nameProduct: '', productId: '', description: '', selectedFile: '', price: 0, state: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createProduct({ ...postData, name: user?.result?.name}));
      clear();
    } else {
      dispatch(updateProduct(currentId, { ...postData, name: user?.result?.name }));
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
        <Typography variant="h6">{currentId ? `Editing "${post.nameProduct}"` : 'Creating a Product'}</Typography>
        <TextField required name="nameProduct" variant="outlined" label="Product Name" fullWidth value={postData.nameProduct} onChange={(e) => setPostData({ ...postData, nameProduct: e.target.value })} />
        <TextField required name="productId" variant="outlined" label="Product Identification" fullWidth value={postData.productId} disabled={!!currentId} onChange={(e) => setPostData({ ...postData, productId: e.target.value })} />
        <TextField required type="number" name="price" variant="outlined" label="Price" fullWidth value={postData.price} onChange={(e) => setPostData({ ...postData, price: e.target.value })} />
        <TextField required name="description" variant="outlined" label="Description" fullWidth value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} />
        <FormControl required fullWidth >
        <InputLabel id="state-label">State</InputLabel>
        <Select
          labelId="state-label"
          value={postData.state}
          name="state"
          label="State"
          variant="outlined"
          onChange={(e) => setPostData({ ...postData, state: e.target.value })}
        >
          <MenuItem value="available">Available</MenuItem>
          <MenuItem value="unavailable">Unavailable</MenuItem>
        </Select>
        </FormControl>
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default FormProducts;
