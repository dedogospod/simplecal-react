import React from 'react';
import Home from 'routes/Home';
import Day from 'routes/Day';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { withAuthentication } from './Session';
import Header from './Header';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as ROUTES from 'constants/routes';
import Progress from 'routes/Progress';
import './App.scss';

function App(props) {
    return (
        <div className={'app ' + (props.location.pathname === ROUTES.HOME ? 'home' : '')}>
            <Header />

            <Switch>
                <Route exact path={ROUTES.DAYS} component={Progress} />
                <Route exact path={ROUTES.DAY} component={Day} />
                <Route exact path={ROUTES.HOME} component={Home} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default compose(withAuthentication, withRouter)(App);
