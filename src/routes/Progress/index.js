import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFirebase } from 'components/Firebase';
import DayCard from 'components/DayCard';
import { setDays } from 'store/actions';
import AddDayCard from 'components/AddDay';
import { withAuthorization } from 'components/Session';

class Progress extends Component {
    componentWillMount() {
        this.unsubscribe = this.props.firebase.days()
            .where('user', '==', this.props.authUser.uid)
            .orderBy('date', 'desc')
            .onSnapshot(snapshot => {
                const days = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
                this.props.setDays(days);
            });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    deleteDay(dayId) {
        this.props.firebase.days().doc(dayId).delete();
    }

    render() {
        const days = this.props.days.map(day =>
            <Col xs={12} sm={6} md={4} key={day.id} className="mb-3">
                <DayCard day={day} remove={this.deleteDay.bind(this)}></DayCard>
            </Col>
        );

        return (
            <Container>
                <h1 className="mt-5 mb-4">Your Progress</h1>
                <Row>
                    <Col xs={12} sm={6} md={4} key='add' className="mb-3"><AddDayCard firebase={this.props.firebase} authUser={this.props.authUser}></AddDayCard></Col>
                    {days}
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authUser: state.authUser,
        days: state.days.list
    }
}

const condition = authUser => !!authUser;

export default compose(withFirebase, withAuthorization(condition), connect(mapStateToProps, { setDays }))(Progress);