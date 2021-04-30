import React from 'react';
import Button from 'react-bootstrap/Button';

class ActionsCell extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <td>
        <Button variant="info" className="btn-action">
          View
        </Button>
        <Button variant="primary" className="btn-action">
          Edit
        </Button>
        <Button variant="danger" className="btn-action">
          Delete
        </Button>
      </td>
    );
  }
}

export default ActionsCell;
