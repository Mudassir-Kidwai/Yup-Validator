import { useEffect, useState } from "react";

export const useValidationToggle = (clearErrors) => {
  const [validationEnabled, setValidationEnabled] = useState(true);

  useEffect(() => {
    if (!validationEnabled) {
      clearErrors();
    }
  }, [validationEnabled, clearErrors]);

  const createSubmitHandler = (handleSubmit, getValues, onSubmit) => (event) => {
    if (validationEnabled) {
      return handleSubmit(onSubmit)(event);
    }

    event.preventDefault();
    onSubmit(getValues());
  };

  return {
    validationEnabled,
    setValidationEnabled,
    createSubmitHandler,
  };
};
