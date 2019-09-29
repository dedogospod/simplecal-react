import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import moment from 'moment';

export default ({day, remove}) => {
    const date = moment(day.date.toDate()).format('DD MMM YYYY');
    return (
        <Card>
            <Card.Body>
                <Card.Title>{date}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>Calories: {day.totalCalories}</ListGroupItem>
                <ListGroupItem>Weight: {day.weight}</ListGroupItem>
            </ListGroup>
            <Card.Body>
                <Link to={'/days/' + day.id}><Button className="mr-2">Details</Button></Link>
                <Button variant="danger" onClick={() => remove(day.id)}>Delete</Button>
            </Card.Body>
        </Card>
    )
}