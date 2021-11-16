import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import Products from './components/Products.js/Products';
import Users from './components/Users/Users';

const App = () => {

  return (
    <BrowserRouter>
    <Container maxWidth="lg">
      <Navbar />
      <Switch>
        <Route path="/auth" exact component={Auth} />
        <Route path="/sales" exact component={Home} />
        <Route path="/products" exact component={Products} />
        <Route path="/users" exact component={Users} />
      </Switch>
    </Container>
  </BrowserRouter>
  )
}

 
  


export default App;
