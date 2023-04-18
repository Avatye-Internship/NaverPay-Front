import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Button } from '@mui/material';
import Product from './product';

function App() {
  return (
    <div>
      <Button variant="contained" color="primary" href="/product">
        Product
      </Button>
      <Switch>
        <Route path="/product">
          <Product />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
