import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import { firestore } from 'firebase';

import './AddDay.scss';
import "react-datepicker/dist/react-datepicker.css";

class AddDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
        this.addDay = this.addDay.bind(this);
    }

    addDay() {
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
                if(snapshot.docs.length > 0) {
                    return toast('This day already exists!', { type: 'error' });
                }
                
                this.props.firebase.days()
                    .add({
                        date: new firestore.Timestamp.fromDate(queryDate),
                        user: this.props.authUser.uid,
                        totalCalories: 0
                    })
            });
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>Add a new day!</Card.Title>
                    <Card.Text as='div'>
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                        />
                    </Card.Text>
                    <Button onClick={this.addDay}>Add</Button>
                </Card.Body>
            </Card>
        )
    }
}

export default AddDay;