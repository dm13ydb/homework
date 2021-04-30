import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import CrudTable from './CrudTable';
import CrudForm from './CrudFrom';

class App extends React.Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <Button variant="success" className="btn-add">
              Add User
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <CrudTable />
          </Col>
        </Row>
        <Row>
          <Col xs={5}>
            <CrudForm />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
