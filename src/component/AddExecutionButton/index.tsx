import React from "react";
import { Button, Col } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Form as ReactFinalForm, Field } from "react-final-form";

import {DataModel } from "../../types/Instrument";

/**
 * Add execution button props
 */
interface AddExecutionButtonProps {
    isButtonDisabled: boolean,
    onSubmit: (values: any) => void,
    instrument: DataModel,
}

/**
 * Add execution button: Button and modal window
 * @param props Add execution button props
 */
export default function AddExecutionButton(props: AddExecutionButtonProps) {
    const required = (value: any) => (value ? undefined : 'Required');
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
    <>
      <Button variant="success" onClick={handleShow} disabled={props.isButtonDisabled}>
        Add Execution
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Execution</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ReactFinalForm
            onSubmit={values => {
              props.onSubmit(values);
              handleClose();
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
                <Field name="definedPrice" validate={required}>
                  {({ input, meta }) => (
                    <Form.Group as={Form.Row} controlId="definedPrice">
                      <Form.Label column sm={4}>
                        Defined Price
                      </Form.Label>
                      <Col sm={8}>
                        <Form.Control type="number" placeholder="Defined Price" {...input} />
                        {meta.error && meta.touched && <Form.Text id="hint2" muted>{meta.error}</Form.Text>}
                      </Col>
                    </Form.Group>
                  )}
                </Field>
                <div style={{ display: "flex", justifyContent: "center", marginTop: 10}}>
                  <div style={{ marginRight: 20}}>
                    <Button type="submit" variant="success" disabled={submitting}>
                      Submit
                    </Button>
                  </div>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </div>
              </Form>
            )}
          />
        </Modal.Body>
      </Modal>
    </>
    );
}