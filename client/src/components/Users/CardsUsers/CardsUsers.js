import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import useStyles from '../../Posts/styles';
import CardUser from './CardUser';

const CardsUsers = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.users);
  const classes = useStyles();

  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <CardUser post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default CardsUsers;