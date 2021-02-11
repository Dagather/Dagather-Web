import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MyRoute from 'Router/route';

function Router() {
  return (
    <Switch>
      <Route exact path="/" component={MyRoute.MainPage} />
      <Route exact path="/process" component={MyRoute.ProcessPage} />
    </Switch>
  );
}

export default Router;
