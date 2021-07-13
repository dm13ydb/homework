import React from 'react';
import ReactDOM from 'react-dom';
import { FormProvider } from './FormContext';
import { UsersDataProvider } from './UsersData';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <UsersDataProvider>
    <FormProvider>
      <App />
    </FormProvider>
  </UsersDataProvider>,
  document.getElementById('root')
);
