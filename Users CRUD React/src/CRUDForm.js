import React, { useContext } from 'react';
import { UsersDataContext } from './UsersData';
import { FormContext } from './FormContext';
import { Row, Col, Form, Button } from 'react-bootstrap';

export default function CRUDForm() {
  const isFormDisabled = useContext(FormContext).formDisabled;
  const setFormDisabled = useContext(FormContext).setFormDisabled;
  const isSubmitDisabled = useContext(FormContext).submitDisabled;
  const setSubmitDisabled = useContext(FormContext).setSubmitDisabled;
  const isSubmitHidden = useContext(FormContext).submitHidden;
  const isInputsDisabled = useContext(FormContext).inputsDisabled;
  const initialFormData = useContext(FormContext).initialFormData;
  const formData = useContext(FormContext).formData;
  const setFormData = useContext(FormContext).setFormData;
  const usersData = useContext(UsersDataContext).usersData;
  const setUsersData = useContext(UsersDataContext).setUsersData;

  function isObject(data) {
    return data !== null && typeof data === 'object';
  }

  function checkObjectsEquality(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
      const val1 = obj1[key];
      const val2 = obj2[key];
      const areObjects = isObject(val1) && isObject(val2);

      if (
        (areObjects && !checkObjectsEquality(val1, val2)) ||
        (!areObjects && val1 !== val2)
      )
        return false;
    }

    return true;
  }

  let sumbitButton = null;

  if (isFormDisabled) {
    return null;
  }

  const submitButtonHandler = (event) => {
    event.preventDefault();
    if (confirm('Are you sure you want to make changes?')) {
      formData.id
        ? (function () {
            usersData[
              usersData.indexOf(
                usersData.find((user) => user.id === formData.id)
              )
            ] = formData;
            setUsersData(usersData);
            setFormDisabled(true);
          })()
        : (function () {
            let newId = 1;
            while (usersData.find((user) => user.id === newId)) newId++;
            formData.id = newId;
            setUsersData([...usersData, formData]);
            setFormDisabled(true);
          })();
    }
  };

  if (!isSubmitHidden) {
    sumbitButton = (
      <Button
        variant="primary"
        type="submit"
        disabled={isSubmitDisabled}
        onClick={submitButtonHandler}
      >
        Submit
      </Button>
    );
  }

  const onChangeHandler = (event) => {
    const data = JSON.parse(JSON.stringify(formData));

    event.target.type !== 'checkbox'
      ? (data[event.target.name] = event.target.value)
      : data[event.target.name].includes(event.target.value)
      ? (data[event.target.name] = data[event.target.name].filter(
          (value) => value !== event.target.value
        ))
      : data[event.target.name].push(event.target.value);
    setFormData(data);

    setSubmitDisabled(checkObjectsEquality(data, initialFormData));
  };

  return (
    <Row>
      <Col xs={5}>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter user name"
              value={formData.name}
              onChange={onChangeHandler}
              disabled={isInputsDisabled}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="formSurname">
            <Form.Label>Surname</Form.Label>
            <Form.Control
              type="text"
              name="surname"
              placeholder="Enter user surname"
              value={formData.surname}
              onChange={onChangeHandler}
              disabled={isInputsDisabled}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="formAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              placeholder="Enter user age"
              max="125"
              min="1"
              value={formData.age}
              onChange={onChangeHandler}
              disabled={isInputsDisabled}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="formAdress">
            <Form.Label>Adress</Form.Label>
            <Form.Control
              as="textarea"
              name="adress"
              placeholder="Enter user adress"
              rows={3}
              value={formData.adress}
              onChange={onChangeHandler}
              disabled={isInputsDisabled}
            ></Form.Control>
          </Form.Group>
          <div>
            <Form.Check
              inline
              type="checkbox"
              name="skills"
              label="JS"
              value="JS"
              id="checkbox-js"
              checked={formData.skills.includes('JS')}
              onChange={onChangeHandler}
              disabled={isInputsDisabled}
            />
            <Form.Check
              inline
              type="checkbox"
              name="skills"
              label="Python"
              value="Python"
              id="checkbox-python"
              checked={formData.skills.includes('Python')}
              onChange={onChangeHandler}
              disabled={isInputsDisabled}
            />
            <Form.Check
              inline
              type="checkbox"
              name="skills"
              label="PHP"
              value="PHP"
              id="checkbox-php"
              checked={formData.skills.includes('PHP')}
              onChange={onChangeHandler}
              disabled={isInputsDisabled}
            />
          </div>
          {sumbitButton}
        </Form>
      </Col>
    </Row>
  );
}
