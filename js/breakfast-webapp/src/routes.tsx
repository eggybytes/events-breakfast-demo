import React from 'react';
import { Switch, Route } from 'react-router-dom';

import OrderBreakfastScreen from './screens/OrderBreakfastScreen';
import NotFoundScreen from './screens/NotFoundScreen';

export default (
  <Switch>
    <Route exact path="/order" component={OrderBreakfastScreen} />

    <Route path="/public" onEnter={() => window.location.reload()} />
    <Route status={404} component={NotFoundScreen} />
  </Switch>
);
