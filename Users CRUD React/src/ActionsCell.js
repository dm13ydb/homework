import React from 'react';
import Button from 'react-bootstrap/Button';

class ActionsCell extends React.Component {
  viewClick = () => {
    this.props.viewHandler(this.props.userId);
  };

  editClick = () => {
    this.props.editHandler(this.props.userId);
  };

  render() {
    return (
      <td>
        <Button variant="info" className="btn-action" onClick={this.viewClick}>
          View
        </Button>
        <Button
          variant="primary"
          className="btn-action"
          onClick={this.editClick}
        >
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
