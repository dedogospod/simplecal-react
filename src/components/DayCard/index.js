import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import moment from 'moment';

export default (props) => {
    const date = moment(props.day.date.toDate()).format('DD MMM YYYY');
    return (
        <Card>
            <Card.Body>
                <Card.Title>{date}</Card.Title>
                <Card.Text>{props.day.totalCalories} calories</Card.Text>
                <Link to={'/days/' + props.day.id}><Button>Details</Button></Link>
                <Button variant="danger" className="margin-left__default" onClick={() => props.delete(props.day.id)}>Delete</Button>
            </Card.Body>
        </Card>
    )
}