import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './pages/Main';
import Repository from './pages/Repository';
import Description from './pages/Description';
import SingIn from './pages/SingIn';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SingIn} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/repository" component={Repository} />
        <Route path="/description" component={Description} />
      </Switch>
    </BrowserRouter>
  );
}
