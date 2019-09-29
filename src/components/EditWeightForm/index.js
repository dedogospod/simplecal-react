import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

const schema = yup.object({
    weight: yup.string().required('How fat are you, fatty?')
})

export default ({editWeight, isLoading}) => {
    return (
        <Formik onSubmit={editWeight} validationSchema={schema}>
            {
                ({handleSubmit, values, touched, errors, handleChange, resetForm}) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <h3>Edit Weight</h3>
                        <Form.Group controlId="name">
                            <Form.Control onChange={handleChange} 
                                isValid={touched.weight && !errors.weight}
                                isInvalid={touched.weight && errors.weight}
                                value={values.weight || ''}
                                name="weight" type="number" 
                                placeholder="100 tons" />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                            {/* <Form.Text className="text-muted">
                                What did you eat, fatty?
                            </Form.Text> */}
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