import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class CrudForm extends React.Component {
  inputHandler = (event) => {
    let data = this.props.data;

    if (event.target.type === 'checkbox') {
      let skills = data.skills.slice();

      skills.includes(event.target.name)
        ? (skills = skills.filter((skill) => skill !== event.target.name))
        : skills.push(event.target.name);
      data = { ...data, skills };
    } else {
      let input = { [event.target.name]: event.target.value };

      data = { ...data, ...input };
    }

    this.props.updateForm(data);
  };

  render() {
    if (this.props.hidden) {
      return null;
    }

    let button = null;

    if (this.props.submit) {
      button = (
        <Button variant="primary" type="submit" disabled={this.props.disabled}>
          Submit
        </Button>
      );
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
                disabled={this.props.disabled}
                value={this.props.data.name}
                onChange={this.inputHandler}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="formSurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                name="surname"
                placeholder="Enter user surname"
                disabled={this.props.disabled}
                value={this.props.data.surname}
                onChange={this.inputHandler}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                placeholder="Enter user age"
                disabled={this.props.disabled}
                value={this.props.data.age}
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
                disabled={this.props.disabled}
                value={this.props.data.adress}
                rows={3}
                onChange={this.inputHandler}
              ></Form.Control>
            </Form.Group>
            <div>
              <Form.Check
                inline
                type="checkbox"
                name="JS"
                label="JS"
                id="checkbox-js"
                checked={this.props.data.skills.includes('JS')}
                disabled={this.props.disabled}
                onChange={this.inputHandler}
              />
              <Form.Check
                inline
                type="checkbox"
                name="Python"
                label="Python"
                id="checkbox-python"
                checked={this.props.data.skills.includes('Python')}
                disabled={this.props.disabled}
                onChange={this.inputHandler}
              />
              <Form.Check
                inline
                type="checkbox"
                name="PHP"
                label="PHP"
                id="checkbox-php"
                checked={this.props.data.skills.includes('PHP')}
                disabled={this.props.disabled}
                onChange={this.inputHandler}
              />
            </div>
            {button}
          </Form>
        </Col>
      </Row>
    );
  }
}

export default CrudForm;
