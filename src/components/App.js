import React from 'react';
import Login from 'routes/Login';
import Home from 'routes/Home';
import Day from 'routes/Day';
import { withAuthentication } from './Session';
import Header from './Header';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as ROUTES from 'constants/routes';
import Progress from 'routes/Progress';

function App() {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Route path={ROUTES.LOGIN} component={Login} />
        <Route exact path={ROUTES.DAYS} component={Progress} />
        <Route exact path={ROUTES.DAY} component={Day} />
        <Route exact path={ROUTES.HOME} component={Home} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default withAuthentication(App);
