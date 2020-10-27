import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { compose } from "redux";
import { withFirebase } from "components/Firebase";
import DayCard from "components/DayCard";
import { setDays } from "store/actions";
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
  connect(mapStateToProps, { setDays })
)(Progress);
