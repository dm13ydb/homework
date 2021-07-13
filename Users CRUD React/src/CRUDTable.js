import React, { useContext } from 'react';
import { UsersDataContext } from './UsersData';
import Table from 'react-bootstrap/Table';
import ActionsButtons from './ActionsButtons';

const tableHeadings = [
  'ID',
  'Name',
  'Surname',
  'Age',
  'Adress',
  'Skills',
  'Actions',
];

export default function CRUDTable() {
  const users = useContext(UsersDataContext).usersData;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {tableHeadings.map((heading, index) => (
            <th key={index}>{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            {tableHeadings.map((heading, index) => (
              <td key={index}>
                {heading === 'Actions' ? (
                  <ActionsButtons userID={user.id} />
                ) : heading === 'Skills' ? (
                  user[heading.toLowerCase()].sort().join(', ')
                ) : (
                  user[heading.toLowerCase()]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
