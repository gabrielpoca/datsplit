import ReactDOM from 'react-dom';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Group from './group';
import Dashboard from './dashboard';
import Onboarding from './onboarding';

import './index.css';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/group/:id" component={Group} />
      <Route path="/" component={Dashboard} />
    </Switch>
  </HashRouter>,
  document.getElementById('root')
);
