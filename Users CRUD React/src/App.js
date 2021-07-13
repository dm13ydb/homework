import React, { useContext } from 'react';
import { FormContext } from './FormContext';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CRUDTable from './CRUDTable';
import CRUDForm from './CRUDForm';

const emptyFormData = {
  name: '',
  surname: '',
  age: '',
  adress: '',
  skills: [],
};

export default function App() {
  const setFormDisabled = useContext(FormContext).setFormDisabled;
  const setSubmitHidden = useContext(FormContext).setSubmitHidden;
  const inputsDisabled = useContext(FormContext).setInputsDisabled;
  const setSubmitDisabled = useContext(FormContext).setSubmitDisabled;
  const setInitialFormData = useContext(FormContext).setInitialFormData;
  const setFormData = useContext(FormContext).setFormData;

  const addButtonHandler = () => {
    setInitialFormData(emptyFormData);
    setFormData(emptyFormData);
    setSubmitDisabled(true);
    setSubmitHidden(false);
    inputsDisabled(false);
    setFormDisabled(false);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Button
            variant="success"
            className="btn-add"
            onClick={addButtonHandler}
          >
            Add User
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <CRUDTable />
        </Col>
      </Row>
      <Row>
        <Col>
          <CRUDForm />
        </Col>
      </Row>
    </Container>
  );
}
