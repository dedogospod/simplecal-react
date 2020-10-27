import React, { Component } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { compose } from "redux";
import { withFirebase } from "components/Firebase";
import DayCard from "components/DayCard";
import { setDays, setIntervals, setSelectedInterval } from "store/actions";
import AddDayCard from "components/AddDay";
import LineChart from "components/LineChart";
import ProgressPerDays from "components/ProgressPerDays";
import SelectLastDaysForProgress from "components/SelectLastDaysForProgress";
import moment from "moment";
import { withAuthorization } from "components/Session";
import progressImg from "assets/img/progress.jfif";
import "./Progress.scss";

class Progress extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lastDays: 7,
        };
    }
    componentWillMount() {
        this.unsubscribeIntervals = this.props.firebase
            .intervals()
            .where("user", "==", this.props.authUser.uid)
            .onSnapshot((snapshot) => {
                const intervals = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                this.props.setIntervals(intervals);
            });
        this.unsubscribe = this.props.firebase
            .days()
            .where("user", "==", this.props.authUser.uid)
            .orderBy("date", "desc")
            .onSnapshot((snapshot) => {
                const days = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                this.props.setDays(days);
            });
    }

    componentWillUnmount() {
        this.unsubscribe();
        this.unsubscribeIntervals();
    }

    deleteDay(dayId) {
        this.props.firebase.days().doc(dayId).delete();
    }

    formatDateForChart(date) {
        return moment(date).format("DD, MMM");
    }

    getProperWeight(ld, ind, arr) {
        if (!ld) return 0;
        return ld.weight
    }

    roundTwoDigits(n) {
        return Math.round(n * 100) / 100;
    }

    handleIntervalChange = (e) => {
        this.props.setSelectedInterval(e.target.value)
    }
    selectLastDays(e) {
        this.setState({ lastDays: e.target.value });
    }

    render() {
        const days = this.props.days.map((day) => (
            <Col xs={12} sm={6} md={4} key={day.id} className="mb-3">
                <DayCard day={day} remove={this.deleteDay.bind(this)}></DayCard>
            </Col>
        ));
        const { lastDays } = this.state;

        const chartData = [
            {
                id: "Weight Progress",
                data: this.props.days
                    .map((ld, ind, arr) => ({
                        x: this.formatDateForChart(ld.date.toDate()),
                        y: this.getProperWeight(ld, ind, arr),
                    }))
                    .reverse(),
            },
        ];

        return (
            <main className="progress-route">
                <div
                    className="streak"
                    style={{ backgroundImage: `url(${progressImg})` }}
                >
                    <div className="streak-mask d-flex justify-content-center align-items-end py-3">
                        <h1
                            className="mt-5 text-center text-uppercase text-danger"
                            style={{ opacity: 0.7 }}
                        >
                            Your Progress
                        </h1>
                    </div>
                </div>
                <Container>
                    <h2 className="mt-4 mb-3">Selected Interval</h2>

                    <Form.Control as="select" defaultValue={null} onChange={this.handleIntervalChange}>
                        <option value={null}>Choose interval</option>
                        {
                            this.props.intervals && this.props.intervals.map(interval => (<option value={interval.id} key={interval.id}>{interval.name}</option>))
                        }
                    </Form.Control>
                    <h2 className="mt-4 mb-3">Progress Chart</h2>
                    <LineChart data={chartData}></LineChart>
                    <h2 className="mt-4 mb-3">Recording Accuracy</h2>
                    <SelectLastDaysForProgress
                        selectLastDays={this.selectLastDays.bind(this)}
                    ></SelectLastDaysForProgress>
                    <ProgressPerDays
                        days={this.props.days}
                        lastDays={lastDays}
                    ></ProgressPerDays>
                    <h2 className="mt-4 mb-3">Your daily expenditure</h2>
                    <Row>
                        <Col xs={12} sm={6} md={4} key="add" className="mb-3">
                            <AddDayCard
                                firebase={this.props.firebase}
                                authUser={this.props.authUser}
                                intervals={this.props.intervals}
                            ></AddDayCard>
                        </Col>
                        {days}
                    </Row>
                </Container>
            </main>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        authUser: state.authUser,
        intervals: state.intervals.intervals,
        days: state.days.list.filter(day => day.interval === state.intervals.selectedInterval || !state.intervals.selectedInterval),
    };
};

const condition = (authUser) => !!authUser;

export default compose(
    withFirebase,
    withAuthorization(condition),
    connect(mapStateToProps, { setDays, setIntervals, setSelectedInterval })
)(Progress);
