import React, { Component } from 'react';
import { compose } from 'redux';
import { Container, Row, Button } from 'react-bootstrap';
import { withFirebase } from 'components/Firebase';
import { push } from 'connected-react-router';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


class Login extends Component {
    login() {
        this.props.firebase.login().then(() => {
            this.props.push('/days');
        });
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Button variant="primary" onClick={() => this.login()}>Login</Button>
                </Row>
            </Container>
        )
    }
}

export default compose(withFirebase, withRouter, connect(null, { push }))(Login);