import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Test from './components/Test.js';



export default (
  <Switch>
    <Route path="/auth" component={ Test }  />

  </Switch>
)
