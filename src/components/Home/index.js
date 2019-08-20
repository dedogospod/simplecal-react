import React from 'react';
import { Jumbotron, Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import * as ROUTES from '../../constants/routes';

const Home = ({authUser}) => {
    return (
        <Container>
            <Jumbotron>
                <h1>It Counts, You Don't</h1>
                <p>
                    This is the simplest, easiest to use calorie calculator. You don't need to track macros or micros, just calories? Do it here.
                </p>
                <p>
                    You will count calories for each single day. Create the day first, then add whatever you've written and how many calories it is. The calculator does the rest.
                </p>
                <p>
                    <LinkContainer to={authUser ? ROUTES.DAYS : ROUTES.LOGIN}>
                        <Button variant="primary">{authUser ? 'See Days' : 'Login'}</Button>
                    </LinkContainer>
                </p>
            </Jumbotron>
        </Container>
    )
}

const mapStateToProps = state => ({
    authUser: state.authUser
});

export default connect(mapStateToProps)(Home);