import React from 'react';
import Table from 'react-bootstrap/Table';
import ActionsCell from './ActionsCell';

class CrudTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headings: ['ID', 'Name', 'Surname', 'Age', 'Adress', 'Skills', 'Actions'],
      users: [
        {
          name: 'Jack',
          surname: 'White',
          age: 26,
          adress: 'USA, California',
          skills: ['JS', 'Python'],
          active: true,
          id: 1,
        },
        {
          name: 'Bill',
          surname: 'Jonson',
          age: 36,
          adress: 'USA, California',
          skills: ['JS', 'PHP'],
          active: true,
          id: 5,
        },
      ],
    };
  }

  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            {this.state.headings.map((heading, index) => {
              return <th key={index}>{heading}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {this.state.users.map((user) => {
            return (
              <tr key={user.id}>
                {this.state.headings.map((heading, index) => {
                  return heading === 'Actions' ? (
                    <ActionsCell key={index} />
                  ) : (
                    <td key={index}>
                      {Array.isArray(user[heading.toLowerCase()])
                        ? user[heading.toLowerCase()].join(', ')
                        : user[heading.toLowerCase()]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default CrudTable;
