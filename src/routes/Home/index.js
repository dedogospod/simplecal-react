import React from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import * as ROUTES from 'constants/routes';
import JarallaxBlock from 'components/Jarallax';
import coverPhoto from 'assets/img/cover.jpg';
import { Slide } from 'react-reveal';
import './Home.scss';

const Home = ({ authUser }) => {
    return (
        <main className="home">
            <JarallaxBlock image={coverPhoto} height={600} customClassName="cover-photo">
                    <Container className="d-flex justify-content-center align-items-center">
                        <Row className="cover-content text-center">
                            <Col xs={12}>
                                <Slide top>
                                    <h1 className="text-center">It Counts, <br className="d-block d-md-none"/>You Don't</h1>
                                    <hr className="my-4" />
                                    <h4 className="mb-4">
                                        Count calories, lose weight. Simple.
                                    </h4>
                                    <LinkContainer to={authUser ? ROUTES.DAYS : ROUTES.LOGIN}>
                                        <Button variant="outline-light">{authUser ? 'See Days' : 'Login'}</Button>
                                    </LinkContainer>
                                </Slide>
                            </Col>
                        </Row>
                    </Container>
            </JarallaxBlock>
            <section>
                <Container></Container>
            </section>
        </main>
    )
}

const mapStateToProps = state => ({
    authUser: state.authUser
});

export default connect(mapStateToProps)(Home);