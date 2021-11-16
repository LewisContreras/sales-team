import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import CardsProducts from './CardsProducts/CardsProducts';
import FormProducts from './FormProducts/FormProducts';
import SearchProducts from './SearchProducts/SearchProducts';
import { getProducts } from '../../actions/products';

const Products = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    dispatch(getProducts());
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
            <SearchProducts/>
            <CardsProducts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormProducts currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Products;
