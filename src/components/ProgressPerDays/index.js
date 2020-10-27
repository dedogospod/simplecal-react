import React from "react";
import { Row, Col } from "react-bootstrap";

export default ({ days, lastDays }) => {
  const calorieBalance = days
    .slice(0, lastDays)
    .reduce(
      (totalCalories, currentDay) => totalCalories + currentDay.totalCalories,
      0
    );

  const weightLoss =
    days.length > lastDays
      ? days[0].weight -
        (days[lastDays - 2].weight +
          days[lastDays - 1].weight +
          days[lastDays].weight) /
          3
      : 0;
  return (
    <div>
      <Row>
        <Col xs={6}>
          <h5>Calorie Balance {lastDays} days</h5>
          <p>{calorieBalance}kcal</p>
          <h5>Expected Weight Balance {lastDays} days</h5>
          <p>{roundTwoDigits(calorieBalance / 7777)}kg</p>
        </Col>
        <Col xs={6}>
          <h5>Actual Weight Lost</h5>
          <p>{roundTwoDigits(weightLoss)}kg</p>
          <h5>Actual Caloric Balance</h5>
          <p>{roundTwoDigits(weightLoss * 7777)}kcal</p>
        </Col>
      </Row>
    </div>
  );
};

function roundTwoDigits(n) {
  return Math.round(n * 100) / 100;
}
