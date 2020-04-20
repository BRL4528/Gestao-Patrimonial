import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SingIn from '../pages/SingIn';

import Dashboard from '../pages/Main';
import Repository from '../pages/Repository';
import Description from '../pages/Description';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SingIn} />
      <Route path="/dashboard" exact component={Dashboard} isPrivate />
      <Route path="/repository" exact component={Repository} isPrivate />
      <Route path="/description" exact component={Description} isPrivate />
    </Switch>
  );
}
