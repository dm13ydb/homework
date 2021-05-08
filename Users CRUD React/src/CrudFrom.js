import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class CrudForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      age: '',
      adress: '',
      js: false,
      phyton: false,
      php: false,
    };
  }

  inputHandler = (event) => {
    this.setState({
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value,
    });
  };

  render() {
    if (this.props.hidden) {
      return null;
    }

    return (
      <Row>
        <Col xs={5}>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter user name"
                value={this.state.name}
                onChange={this.inputHandler}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="formSurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                name="surname"
                placeholder="Enter user surname"
                value={this.state.surname}
                onChange={this.inputHandler}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                placeholder="Enter user age"
                value={this.state.age}
                max="125"
                min="1"
                onChange={this.inputHandler}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="formAdress">
              <Form.Label>Adress</Form.Label>
              <Form.Control
                as="textarea"
                name="adress"
                placeholder="Enter user adress"
                value={this.state.adress}
                rows={3}
                onChange={this.inputHandler}
              ></Form.Control>
            </Form.Group>
            <div>
              <Form.Check
                inline
                type="checkbox"
                name="js"
                label="JS"
                id="checkbox-js"
                checked={this.state.js}
                onChange={this.inputHandler}
              />
              <Form.Check
                inline
                type="checkbox"
                name="phyton"
                label="Phyton"
                id="checkbox-phyton"
                checked={this.state.phyton}
                onChange={this.inputHandler}
              />
              <Form.Check
                inline
                type="checkbox"
                name="php"
                label="PHP"
                id="checkbox-php"
                checked={this.state.php}
                onChange={this.inputHandler}
              />
            </div>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default CrudForm;
