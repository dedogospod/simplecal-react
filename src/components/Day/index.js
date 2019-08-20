import React, { Component } from 'react';
import { withAuthorization } from '../Session';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from '../Firebase';
import { Container, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { setDay } from '../../store/actions';

class Day extends Component {
    componentWillMount() {
        this.props.firebase.days()
            .doc(this.props.match.params.id)
            .onSnapshot(snapshot => {
                this.props.setDay(snapshot.data())
            });
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col xs={12} md={{ span: 8, offset: 2 }}>
                        { JSON.stringify(this.props.day)}
                    </Col>
                </Row>
            </Container>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        authUser: state.authUser,
        day: state.days.day
    }
}

const condition = authUser => !!authUser;

export default compose(withFirebase, withRouter, withAuthorization(condition), connect(mapStateToProps, { setDay }))(Day);