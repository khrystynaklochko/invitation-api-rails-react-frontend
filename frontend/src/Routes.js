// src/Routes.js

import React from 'react';
import { Switch, HashRouter as Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import InvitationIndex from './Invitation/Index';
import InvitationNew from './Invitation/New';
import InvitationEdit from './Invitation/Edit';

const history = createBrowserHistory();
const Routes = () =>
  <Router history={history}>
    <Switch>
      <Route path="/invitations/:id/edit" component={InvitationEdit} />
      <Route path="/invitations/new" component={InvitationNew} />
      <Route path="/invitations/" component={InvitationIndex} />
      <Route path="*" component={InvitationIndex} />
    </Switch>
  </Router>;

export default Routes;
