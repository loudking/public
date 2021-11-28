import React from "react";
import { Button, Col } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { Form as ReactFinalForm, Field } from "react-final-form";
import Form from 'react-bootstrap/Form';

import { DataModel } from "../../../types/Instrument";

/**
 * Add order props
 */
interface AddOrderProps {
    title: string;
    show: boolean;
    handleClose: () => void;
    onSubmit: (values: any) => void;
    instrument: DataModel;
    type: string;
    showPriceField: boolean;
}

/**
 * Common component for adding orders
 * @param props Add order props
 */
export default function AddOrder(props: AddOrderProps) {
  const required = (value: any) => (value ? undefined : 'Required');

    return (
        <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactFinalForm
            onSubmit={values => {
              props.onSubmit(values);
              props.handleClose();
            }}
            render={({ handleSubmit, form, submitting, pristine, values}) => (
              <Form onSubmit={handleSubmit}>
                <Field name="instrumentId" validate={required} initialValue={props.instrument.id} >
                  {({ input, meta }) => (
                    <Form.Group as={Form.Row} controlId="instrumentId">
                      <Form.Label column sm={4}>
                      Instrument Id
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control type="text" {...input} disabled />
                      </Col>
                    </Form.Group>
                  )}
                </Field>
                <Field name="instrumentName" validate={required} initialValue={props.instrument.name} >
                  {({ input, meta }) => (
                    <Form.Group as={Form.Row} controlId="instrumentName">
                      <Form.Label column sm={4}>
                      Instrument Name
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control type="text" {...input} disabled />
                      </Col>
                    </Form.Group>
                  )}
                </Field>
                <Field name="type" validate={required} initialValue={props.type} >
                  {({ input, meta }) => (
                    <Form.Group as={Form.Row} controlId="type">
                      <Form.Label column sm={4}>
                        Type
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control type="text" {...input} disabled />
                      </Col>
                    </Form.Group>
                  )}
                </Field>
                <Field name="quantity" validate={required}>
                  {({ input, meta }) => (
                    <Form.Group as={Form.Row} controlId="quantity">
                      <Form.Label column sm={4}>
                        Quantity
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control type="number" placeholder="Quantity" {...input} />
                        {meta.error && meta.touched && <Form.Text id="hint1" muted>{meta.error}</Form.Text>}
                      </Col>
                    </Form.Group>
                  )}
                </Field>
                {props.showPriceField && 
                    <Field name="price" validate={required}>
                    {({ input, meta }) => (
                      <Form.Group as={Form.Row} controlId="price">
                        <Form.Label column sm={4}>
                          Price
                        </Form.Label>
                        <Col sm={8}>
                          <Form.Control type="number" placeholder="price" {...input} />
                          {meta.error && meta.touched && <Form.Text id="hint2" muted>{meta.error}</Form.Text>}
                        </Col>
                      </Form.Group>
                    )}
                  </Field>
                }
                <div style={{ display: "flex", justifyContent: "center", marginTop: 10}}>
                  <div style={{ marginRight: 20}}>
                    <Button type="submit" variant="success" disabled={submitting}>
                      Submit
                    </Button>
                  </div>
                  <Button variant="secondary" onClick={props.handleClose}>
                    Close
                  </Button>
                </div>
              </Form>
            )}
          />
        </Modal.Body>
      </Modal>
    );
}