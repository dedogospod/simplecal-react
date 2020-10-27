import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { compose } from "redux";
import { withFirebase } from "components/Firebase";
import DayCard from "components/DayCard";
import { setDays, setIntervals } from "store/actions";
import AddDayCard from "components/AddDay";
import LineChart from "components/LineChart";
import moment from "moment";
import { withAuthorization } from "components/Session";
import progressImg from "assets/img/progress.jfif";
import "./Progress.scss";

class Progress extends Component {
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
        return ld.weight === 0
            ? this.getProperWeight(arr[ind + 1], ind + 1, arr)
            : ld.weight;
    }

    roundTwoDigits(n) {
        return Math.round(n * 100) / 100;
    }

    render() {
        const days = this.props.days.map((day) => (
            <Col xs={12} sm={6} md={4} key={day.id} className="mb-3">
                <DayCard day={day} remove={this.deleteDay.bind(this)}></DayCard>
            </Col>
        ));

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

        const calorieBalance = this.props.days
            .slice(0, 7)
            .reduce(
                (totalCalories, currentDay) => totalCalories + currentDay.totalCalories,
                0
            );

        const weightLoss =
            this.props.days.length > 13
                ? this.props.days[0].weight -
                (this.props.days[5].weight +
                    this.props.days[6].weight +
                    this.props.days[7].weight) /
                3
                : 0;

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
                    <LineChart data={chartData}></LineChart>
                    <h2 className="mt-4 mb-3">Recording Accuracy</h2>
                    <Row>
                        <Col xs={6}>
                            <h5>Calorie Balance 14 days</h5>
                            <p>{calorieBalance}kcal</p>
                            <h5>Expected Weight Balance 14 days</h5>
                            <p>{this.roundTwoDigits(calorieBalance / 7777)}kg</p>
                        </Col>
                        <Col xs={6}>
                            <h5>Actual Weight Lost</h5>
                            <p>{this.roundTwoDigits(weightLoss)}kg</p>
                            <h5>Actual Caloric Balance</h5>
                            <p>{this.roundTwoDigits(weightLoss * 7777)}kcal</p>
                        </Col>
                    </Row>
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
        days: state.days.list,
    };
};

const condition = (authUser) => !!authUser;

export default compose(
    withFirebase,
    withAuthorization(condition),
    connect(mapStateToProps, { setDays, setIntervals })
)(Progress);
