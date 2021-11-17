import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
import moment from 'moment';


import { deletePost } from '../../../actions/posts';
import useStyles from './styles';
import alertSuccess from '../../../helpers/succesAlert';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));


  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.product} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.googleId === post?.seller || user?.result?._id === post?.seller || user?.result?.role === "admin") && (
      <div className={classes.overlay2}>
        <Button onClick={() => setCurrentId(post._id)} style={{ color: 'white' }} size="small">
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      )}
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">Product: {post.product}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">Client: {post.client}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">Client Document: {post.docClient}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">Sale Identification: {post.saleId}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">Total Price: {post.totalPrice}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {(user?.result?.googleId === post?.seller || user?.result?._id === post?.seller || user?.result?.role === "admin") && (
        <Button size="small" color="secondary" onClick={() => {
          dispatch(deletePost(post._id))
          alertSuccess()
        } }>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
