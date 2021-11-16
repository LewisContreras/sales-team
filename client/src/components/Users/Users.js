import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import CardsUsers from './CardsUsers/CardsUsers';
import FormUsers from './FormUsers/FormUsers';
import { getUsers } from '../../actions/users';

const Users = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    dispatch(getUsers());
  }, [currentId, dispatch]);

  if (user?.result?.role !== "admin") {
    return (
        <Redirect to="/sales" />
    );
  }

  return (
    <Grow in>
      <Container>
        <Grid container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
            <CardsUsers setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormUsers currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Users;
