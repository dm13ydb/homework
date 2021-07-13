import React, { useContext } from 'react';
import { FormContext } from './FormContext';
import { UsersDataContext } from './UsersData';
import Button from 'react-bootstrap/Button';

export default function ActionsButtons({ userID }) {
  const setFormDisabled = useContext(FormContext).setFormDisabled;
  const setSubmitHidden = useContext(FormContext).setSubmitHidden;
  const inputsDisabled = useContext(FormContext).setInputsDisabled;
  const setSubmitDisabled = useContext(FormContext).setSubmitDisabled;
  const setInitialFormData = useContext(FormContext).setInitialFormData;
  const setFormData = useContext(FormContext).setFormData;
  const usersData = useContext(UsersDataContext).usersData;
  const setUsersData = useContext(UsersDataContext).setUsersData;
  const formData = useContext(FormContext).formData;
  const currentUser = usersData.find((user) => user.id === userID);

  const viewButtonHandler = () => {
    setFormData(currentUser);
    setSubmitHidden(true);
    inputsDisabled(true);
    setFormDisabled(false);
  };

  const editButtonHandler = () => {
    setInitialFormData(currentUser);
    setFormData(currentUser);
    setSubmitDisabled(true);
    setSubmitHidden(false);
    inputsDisabled(false);
    setFormDisabled(false);
  };

  const deleteButtonHandler = () => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsersData(usersData.filter((user) => user !== currentUser));
      if (currentUser === formData) {
        setFormDisabled(true);
      }
    }
  };

  return (
    <>
      <Button variant="info" className="btn-action" onClick={viewButtonHandler}>
        View
      </Button>
      <Button
        variant="primary"
        className="btn-action"
        onClick={editButtonHandler}
      >
        Edit
      </Button>
      <Button
        variant="danger"
        className="btn-action"
        onClick={deleteButtonHandler}
      >
        Delete
      </Button>
    </>
  );
}
