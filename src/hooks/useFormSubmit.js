import { useCallback, useState } from "react";
import { submitFormToBackend } from "../services/formApi";

export const useFormSubmit = ({
  formType,
  validationEnabled,
  handleSubmit,
  getValues,
  setError,
  clearErrors,
}) => {
  const [backendStatus, setBackendStatus] = useState(null);
  const [backendMessage, setBackendMessage] = useState("");

  const submitToBackend = useCallback(
    async (data) => {
      setBackendStatus(null);
      setBackendMessage("");
      clearErrors();

      try {
        const response = await submitFormToBackend(formType, data);
        setBackendStatus("success");
        setBackendMessage(response.message);
        console.log(`${formType} backend success:`, response.data);
      } catch (error) {
        setBackendStatus("error");
        setBackendMessage(error.message);

        Object.entries(error.fieldErrors || {}).forEach(([field, message]) => {
          setError(field, { type: "backend", message });
        });

        console.log(`${formType} backend errors:`, error.fieldErrors);
      }
    },
    [clearErrors, formType, setError]
  );

  const createSubmitHandler = useCallback(
    (event) => {
      if (validationEnabled) {
        return handleSubmit(submitToBackend)(event);
      }

      event.preventDefault();
      submitToBackend(getValues());
    },
    [getValues, handleSubmit, submitToBackend, validationEnabled]
  );

  return {
    createSubmitHandler,
    backendStatus,
    backendMessage,
  };
};
