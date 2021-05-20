import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MyRoute from 'Router/route';

function Router() {
  return (
    <Switch>
      <Route exact path="/" component={MyRoute.MainPage} />
      <Route exact path="/process" component={MyRoute.ProcessPage} />
      <Route exact path="/robot" component={MyRoute.RobotPage} />
      <Route exact path="/community" component={MyRoute.CommunityPage} />
      <Route exact path="/community/post/:postId" component={MyRoute.PostDetailPage} />
      <Route exact path="/about" component={MyRoute.AboutPage} />
      <Route exact path="/test" component={MyRoute.testPage} />
    </Switch>
  );
}

export default Router;
