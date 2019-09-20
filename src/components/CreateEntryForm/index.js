import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

const schema = yup.object({
    name: yup.string().required('What did you eat, fatty?'),
    count: yup.number().required('How much was it?')
})

export default ({createEntry, isLoading}) => {
    return (
        <Formik onSubmit={createEntry} validationSchema={schema}>
            {
                ({handleSubmit, values, touched, errors, handleChange, resetForm}) => (
                    <Form noValidate className="create-entry-form" onSubmit={handleSubmit}>
                        <h3>Enter Food</h3>
                        <Form.Group controlId="name">
                            <Form.Label>Food Name</Form.Label>
                            <Form.Control onChange={handleChange} 
                                isValid={touched.name && !errors.name}
                                isInvalid={touched.name && errors.name}
                                value={values.name || ''}
                                name="name" type="text" 
                                placeholder="Delicious French Fries" />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                            {/* <Form.Text className="text-muted">
                                What did you eat, fatty?
                            </Form.Text> */}
                        </Form.Group>
            
                        <Form.Group controlId="count">
                            <Form.Label>Calorie Count</Form.Label>
                            <Form.Control onChange={handleChange}
                                isValid={touched.count && !errors.count}
                                isInvalid={touched.count && errors.count}
                                value={values.count || ''}
                                name="count" type="number"
                                placeholder="1 000 000" />
                            <Form.Control.Feedback type="invalid">
                                {errors.count}
                            </Form.Control.Feedback>
                        </Form.Group>
            
                        <Button variant="primary" type="submit">
                            {isLoading ? 'Loading' : 'Submit'}
                        </Button>
                    </Form>
                )
            }
        </Formik>
    )
}