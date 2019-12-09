import React, { Component } from 'react';
import { withAuthorization } from 'components/Session';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'components/Firebase';
import { Container, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { setDay, setEntries } from 'store/actions';
import { firestore } from 'firebase';
import { push } from 'connected-react-router';
import { DAYS } from 'constants/routes';
import Loader from 'components/Loader';
import CalorieEntry from 'components/CalorieEntry';
import CreateEntryForm from 'components/CreateEntryForm';
import EditWeightForm from 'components/EditWeightForm';
import moment from 'moment';
    
class Day extends Component {
    constructor(props) {
        super(props);

        this.state = {
            componentLoading: false,
            entrySaving: false,
            weightSaving: false
        };
    }

    componentWillMount() {
        this.setState({componentLoading: true});
        
        this.dayDoc =  this.props.firebase.days()
            .doc(this.props.match.params.id);
        Promise.all([this.getDays(), this.getEntries()])
            .then(res => this.setState({componentLoading: false}))
            .catch(err => {
                this.props.push(DAYS);
            });
    }

    getDays() {
        return new Promise((resolve, reject) => {
            this.dayDoc
                .onSnapshot(snapshot => {
                    this.props.setDay(snapshot.data());
                    resolve();
                }, reject);
        });
    }

    getEntries() {
        return new Promise((resolve, reject) => {
            this.props.firebase.entries()
                .where('user', '==', this.props.authUser.uid)
                .where('day', '==', this.dayDoc)
                .orderBy('postedOn', 'asc')
                .onSnapshot(snapshot => {
                    this.props.setEntries(snapshot.docs.map(d => ({...d.data(), id: d.id})));
                    resolve();
                }, reject);
        });
    }

    createEntry(form, {resetForm}) {
        this.setState({entrySaving: true});
        this.props.firebase.entries()
            .add({
                name: form.name,
                day: this.dayDoc,
                user: this.props.authUser.uid,
                postedOn: new firestore.Timestamp.fromDate(new Date()),
                count: form.count
            }).finally(() => {
                this.setState({entrySaving: false});
                resetForm({});
            })
    }

    deleteEntry(entry) {
        this.props.firebase.entries().doc(entry.id).delete();
    }

    editWeight(form, {resetForm}) {
        this.setState({weightSaving: true});
        this.dayDoc.update({ weight: form.weight })
            .finally(() => {
                this.setState({weightSaving: false});
                resetForm({});
            })
    }

    render() {
        const {day} = this.props;

        if(this.state.componentLoading) return <Loader></Loader>;
        const date = day ? moment(day.date.toDate()).format('DD MMM YYYY') : null;

        const entries = this.props.entries.map(entry => (
            <Row key={entry.id} className="mb-2">
                <Col xs={12} md={{ span: 8, offset: 2 }}>
                    <CalorieEntry entry={entry} deleteEntry={this.deleteEntry.bind(this)}></CalorieEntry>
                </Col>
            </Row>
        ));
        

        return (
            <Container>
                <Row className="mt-5 mb-4">
                    <Col xs="12"><h1 className="text-center">Date: {date}</h1></Col>
                </Row>

                {entries}
                
                <Row className="mb-3">
                    <Col xs={12} md={{ span: 8, offset: 2 }} className="text-bold">
                        <CalorieEntry hideDelete={true} entry={{name: 'Total', count: day.totalCalories }}></CalorieEntry>
                    </Col>
                </Row>
                
                <Row className="mb-3">
                    <Col xs={12} md={{ span: 8, offset: 2 }} className="text-bold">
                        <h5>Weight: {day.weight}</h5>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col xs={12} md={{span: 8, offset: 2}}>
                        <CreateEntryForm isLoading={this.state.entrySaving} createEntry={this.createEntry.bind(this)}></CreateEntryForm>
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={{span: 8, offset: 2}}>
                        <EditWeightForm isLoading={this.state.weightSaving} editWeight={this.editWeight.bind(this)}></EditWeightForm>
                    </Col>
                </Row>
            </Container>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        authUser: state.authUser,
        day: state.days.day,
        entries: state.days.entries
    }
}

const condition = authUser => !!authUser;

export default compose(withFirebase, withRouter, withAuthorization(condition), connect(mapStateToProps, { setDay, setEntries, push }))(Day);