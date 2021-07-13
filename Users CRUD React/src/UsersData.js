import React, { createContext, useState } from 'react';

const users = [
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
];

export const UsersDataContext = createContext();

export function UsersDataProvider({ children }) {
  const [usersData, setUsersData] = useState(users);

  return (
    <UsersDataContext.Provider value={{ usersData, setUsersData }}>
      {children}
    </UsersDataContext.Provider>
  );
}
