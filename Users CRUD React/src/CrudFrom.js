import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class CrudForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Form>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter user name"
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="formSurname">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter user surname"
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="formAge">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter user age"
            max="125"
            min="1"
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="formAdress">
          <Form.Label>Adress</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter user adress"
            rows={3}
          ></Form.Control>
        </Form.Group>
        <div>
          <Form.Check inline type="checkbox" label="JS" id="checkbox-js" />
          <Form.Check
            inline
            type="checkbox"
            label="Phyton"
            id="checkbox-phyton"
          />
          <Form.Check inline type="checkbox" label="PHP" id="checkbox-php" />
        </div>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default CrudForm;
