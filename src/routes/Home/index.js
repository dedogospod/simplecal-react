import React, { Component } from 'react';
import { compose } from 'redux';
import { Row, Col, Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { push } from 'connected-react-router';
import { withFirebase } from 'components/Firebase';
import * as ROUTES from 'constants/routes';
import JarallaxBlock from 'components/Jarallax';
import coverPhoto from 'assets/img/cover.jpg';
import { Slide, Reveal } from 'react-reveal';
import { ReactComponent as CalorieSvg} from 'assets/icons/calorie.svg';
import { ReactComponent as WeightSvg } from 'assets/icons/weight.svg';
import { ReactComponent as AccuracySvg } from 'assets/icons/accuracy.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import LineChart from 'components/LineChart';
import weightGraphData from './weightGraphData';
import './Home.scss';
import gymImg from 'assets/img/gym.jfif';
import numbersImg from 'assets/img/barbell.jfif';

class Home extends Component {
    login() {
        this.props.firebase.login().then(() => {
            this.props.push('/days');
        });
    }
    
    render() {
        const { authUser } = this.props;
        
        return (
            <main className="home">
                <JarallaxBlock image={coverPhoto} height={600} customClassName="cover-photo d-flex justify-content-center align-items-center">
                    <Container>
                        <Row className="cover-content text-center justify-content-center">
                            <Slide top>
                                <div>
                                    <h1 className="text-center">It Counts, <br className="d-block d-md-none"/>You Don't</h1>
                                    <hr className="my-4" />
                                    <h4 className="mb-4">
                                        Count calories, lose weight. Simple.
                                    </h4>
                                    {authUser ? (
                                    <LinkContainer to={ROUTES.DAYS}>
                                        <Button variant="outline-light">See Progress</Button>
                                    </LinkContainer>
                                    ) : (
                                        <Button variant="outline-light" onClick={this.login.bind(this)}>Login</Button>
                                    ) }
                                </div>
                            </Slide>
                        </Row>
                    </Container>
                </JarallaxBlock>
                <Container>
                    <Reveal effect="fade-in">
                        <Row className="my-5 pt-4 pb-3 row fade-in">
                            <Col xs={12}><h3 className="text-center text-uppercase mt-4 mb-5">Track Progress</h3></Col>
                            <Col xs={12} sm={{span: 10, offset: 1}} md={{span:8, offset: 2}}>
                                <p className="text-center text-secondary mb-5">
                                    It Counts really does count everything for you. It gives you the ability to track your progress daily, giving you important information about your weight loss goals.
                                </p>
                            </Col>
                            <Col xs={12} sm={4} className="text-center">
                                <CalorieSvg className="icon mb-4" />
                                <h5>Calories</h5>
                                <p className="text-secondary my-4">
                                    Track daily calorie intake by entering what you ate and how many calories it is. Track caloric expenditure through entering your BMR and exercise.
                                </p>
                            </Col>
                            <Col xs={12} sm={4} className="text-center">
                                <WeightSvg className="icon mb-4" />
                                <h5>Weight</h5>
                                <p className="text-secondary my-4">
                                    See the pounds coming off as you record your daily weight progress. Keep track of how much weight you have lost for the last week/month/year.
                                </p>
                            </Col>
                            <Col xs={12} sm={4} className="text-center">
                                <AccuracySvg className="icon mb-4"/>
                                <h5>Accuracy</h5>
                                <p className="text-secondary my-4">
                                    Not sure you are recording your calories properly? It Counts will calculate how accurate your entries are by comparing lost weight with caloric balance.
                                </p>
                            </Col>
                        </Row>
                    </Reveal>
                </Container>
                <div className="streak" style={{backgroundImage: `url(${gymImg})`}}>
                    <div className="streak-mask streak-mask--light d-flex justify-content-center align-items-center py-3">
                        <div className="text-center">
                            <h2 className="mb-5 px-5 font-weight-normal">
                                <FontAwesomeIcon className="mr-3" icon={faQuoteLeft}></FontAwesomeIcon> 
                                I was sooo tired of searching the calorie info of my food. This app is <br className="d-none d-xl-block"/> everything I need to keep track of my calories! Fast and easy!
                                <FontAwesomeIcon className="ml-3" icon={faQuoteRight}></FontAwesomeIcon> 
                            </h2>   
                            <Reveal effect="fade-in">
                                <h5 className="text-center font-italic font-weight-light">~ Siyana Madzharova</h5>
                            </Reveal>
                        </div>
                    </div>
                </div>
                <Container className="my-5 pt-4 pb-3">
                    <Reveal effect="fade-in">
                        <h3 className="text-center text-uppercase mt-4 mb-4">See Your Journey</h3>
                        <LineChart data={weightGraphData} y="Weight" x="Month" tooltip={({point: {data}}) => { return `${data.x}: ${data.y}lbs`; }}></LineChart>
                        <p className="text-secondary text-center my-4">
                            It Counts creates charts with your progress over the weeks and months to help you visualize your success.
                        </p>
                    </Reveal>
                </Container>
                <div className="streak" style={{backgroundImage: `url(${numbersImg})`}}>
                    <div className="streak-mask streak-mask--dark d-flex justify-content-center align-items-center py-3">
                        <Container>
                            <Reveal effect="fade-in">
                                <h3 className="mb-5 text-uppercase text-center">Some Numbers</h3>
                                <Row className="text-white text-center">
                                    <Col md={3}>
                                        <h1 className="text-warning mb-1">214</h1>
                                        <p>Users</p>
                                    </Col>
                                    <Col md={3}>
                                        <h1 className="text-warning mb-1">9,630</h1>
                                        <p>Daily Records</p>
                                    </Col>
                                    <Col md={3}>
                                        <h1 className="text-warning mb-1">16,371k</h1>
                                        <p>Calories Counted</p>
                                    </Col>
                                    <Col md={3}>
                                        <h1 className="text-warning mb-1">1,898lbs</h1>
                                        <p>Weight Lost</p>
                                    </Col>
                                </Row>
                            </Reveal>
                        </Container>
                    </div>
                </div>
                <footer className="py-3 text-center">
                    <Container fluid={true}>
                        © 2019 Copyright: <a href="https://asen.rocks/" target="_blank" rel="noopener noreferrer">Asen Mitrev</a>
                    </Container>
                </footer>
            </main>
        )
    }
}

const mapStateToProps = state => ({
    authUser: state.authUser
});

export default compose(withFirebase, connect(mapStateToProps, { push }))(Home);