import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { setAuthUser } from '../../store/actions';

import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);

            this.props.setAuthUser(
                JSON.parse(localStorage.getItem('authUser')),
            );
        }

        componentDidMount() {
            this.listener = this.props.firebase.onAuthUserListener(
                authUser => {
                    localStorage.setItem('authUser', JSON.stringify(authUser));
                    this.props.setAuthUser(authUser);
                },
                () => {
                    localStorage.removeItem('authUser');
                    this.props.setAuthUser(null);
                },
            );
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return <Component {...this.props} />;
        }
    }

    return compose(
        withFirebase,
        connect(
            null,
            { setAuthUser },
        ),
    )(WithAuthentication);
};

export default withAuthentication;