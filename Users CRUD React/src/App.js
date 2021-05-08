import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import CrudTable from './CrudTable';
import CrudForm from './CrudFrom';

class App extends React.Component {
  constructor() {
    super();
    this.state = { formIsHidden: true };
  }

  activateForm = () => {
    this.setState({ formIsHidden: false });
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <Button
              variant="success"
              className="btn-add"
              onClick={this.activateForm}
            >
              Add User
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <CrudTable />
          </Col>
        </Row>
        <CrudForm hidden={this.state.formIsHidden} />
      </Container>
    );
  }
}

export default App;
