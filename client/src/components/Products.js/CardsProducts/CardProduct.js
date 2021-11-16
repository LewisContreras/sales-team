import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import useStyles from '../../Posts/Post/styles';
import { deleteProduct } from '../../../actions/products';

const CardProduct = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.nameProduct} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.nameProduct}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button onClick={() => setCurrentId(post._id)} style={{ color: 'white' }} size="small">
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.description}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.price}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="secondary" onClick={() => dispatch(deleteProduct(post._id))}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardProduct;
