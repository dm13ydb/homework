import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import CrudTable from './CrudTable';
import CrudForm from './CrudForm';

const emptyFormData = {
  name: '',
  surname: '',
  age: '',
  adress: '',
  skills: [],
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      formData: emptyFormData,
      formDisabled: true,
      inputsDisabled: false,
      submitRendered: false,
    };
  }

  enableForm = () => {
    this.setState({ formDisabled: false });
  };

  disableForm = () => {
    this.setState({ formDisabled: true });
  };

  enableInputs = () => {
    this.setState({ inputsDisabled: false });
  };

  disableInputs = () => {
    this.setState({ inputsDisabled: true });
  };

  hideSubmit = () => {
    this.setState({ submitRendered: false });
  };

  showSubmit = () => {
    this.setState({ submitRendered: true });
  };

  clearForm = () => {
    this.setState({ formData: emptyFormData });
  };

  updateForm = (data) => {
    this.setState({ formData: data });
  };

  addButtonHandler = () => {
    this.clearForm();
    this.enableInputs();
    this.showSubmit();
    this.enableForm();
  };

  viewButtonHandler = (data) => {
    this.updateForm(data);
    this.disableInputs();
    this.hideSubmit();
    this.enableForm();
  };

  editButtonHandler = (data) => {
    this.updateForm(data);
    this.enableInputs();
    this.showSubmit();
    this.enableForm();
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <Button
              variant="success"
              className="btn-add"
              onClick={this.addButtonHandler}
            >
              Add User
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <CrudTable
              viewButtonHandler={this.viewButtonHandler}
              editButtonHandler={this.editButtonHandler}
            />
          </Col>
        </Row>
        <CrudForm
          hidden={this.state.formDisabled}
          disabled={this.state.inputsDisabled}
          submit={this.state.submitRendered}
          data={this.state.formData}
          updateForm={this.updateForm}
        />
      </Container>
    );
  }
}

export default App;
