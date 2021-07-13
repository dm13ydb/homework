import React, { createContext, useState } from 'react';

export const FormContext = createContext();

export function FormProvider({ children }) {
  const [formDisabled, setFormDisabled] = useState(true);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [submitHidden, setSubmitHidden] = useState(true);
  const [inputsDisabled, setInputsDisabled] = useState(true);
  const [initialFormData, setInitialFormData] = useState();
  const [formData, setFormData] = useState();
  const formStatus = {
    formDisabled,
    submitDisabled,
    submitHidden,
    inputsDisabled,
    initialFormData,
    formData,
    setFormDisabled,
    setSubmitDisabled,
    setSubmitHidden,
    setInputsDisabled,
    setInitialFormData,
    setFormData,
  };

  return (
    <FormContext.Provider value={formStatus}>{children}</FormContext.Provider>
  );
}
