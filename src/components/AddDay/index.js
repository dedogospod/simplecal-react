import React, { Component } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import { firestore } from 'firebase';

import './AddDay.scss';
import "react-datepicker/dist/react-datepicker.css";

class AddDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            isLoading: false
        };
    }

    addDay = () => {
        if (this.state.isLoading) return;

        this.setState({ isLoading: true });
        let queryDate = new Date(this.state.startDate.getTime());
        queryDate.setHours(0)
        queryDate.setMilliseconds(0)
        queryDate.setMinutes(0)
        queryDate.setSeconds(0)

        this.props.firebase.days()
            .where('date', '==', queryDate)
            .where('user', '==', this.props.authUser.uid)
            .get()
            .then(snapshot => {
                if (snapshot.docs.length > 0) {
                    this.setState({ isLoading: false });
                    return toast('This day already exists!', { type: 'error' });
                }

                this.props.firebase.days()
                    .add({
                        date: new firestore.Timestamp.fromDate(queryDate),
                        user: this.props.authUser.uid,
                        weight: 0,
                        totalCalories: 0,
                        interval: this.state.interval
                    }).finally(() => {
                        this.setState({ isLoading: false });
                    })
            }).catch(err => {
                this.setState({ isLoading: false });
            });
    }

    handleDateChange = (date) => {
        this.setState({
            startDate: date
        });
    }

    handleIntervalChange = (event) => {
        this.setState({
            interval: event.target.value
        });
    }

    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>Add a new day!</Card.Title>
                    <Card.Text as='div'>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Date</Form.Label>
                            <div>

                                <DatePicker
                                    selected={this.state.startDate}
                                    onChange={this.handleDateChange}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Interval</Form.Label>
                            <Form.Control as="select" defaultValue={null} onChange={this.handleIntervalChange}>
                                <option value={null}>Choose interval</option>
                                {
                                    this.props.intervals && this.props.intervals.map(interval => (<option value={interval.id} key={interval.id}>{interval.name}</option>))
                                }
                            </Form.Control>
                        </Form.Group>
                    </Card.Text>
                    <Button onClick={this.addDay}>{this.state.isLoading ? 'Loading...' : 'Add'}</Button>
                </Card.Body>
            </Card>
        )
    }
}

export default AddDay; 