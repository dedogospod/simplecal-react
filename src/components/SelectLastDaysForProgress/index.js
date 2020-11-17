import React from "react";
import { Form } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

export default ({ selectLastDays }) => {
  return (
    <Row>
      <Col>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Last N Days</Form.Label>
          <Form.Control as="select" onChange={selectLastDays}>
            <option>7</option>
            <option>14</option>
            <option>21</option>
            <option>28</option>
            <option>56</option>
          </Form.Control>
        </Form.Group>
      </Col>
    </Row>
  );
};
