import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordSchema } from "../../validations";
import { useValidationToggle } from "../../hooks/useValidationToggle";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import { PasswordSection } from "../form-sections/PasswordSection";
import { FormLayout } from "./FormLayout";

export const PasswordForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const { validationEnabled, setValidationEnabled } =
    useValidationToggle(clearErrors);

  const { createSubmitHandler, backendStatus, backendMessage } = useFormSubmit({
    formType: "password",
    validationEnabled,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
  });

  return (
    <FormLayout
      title="Password Validation"
      description="Regex rules validated by Yup (frontend) and Joi (backend)."
      validationEnabled={validationEnabled}
      onValidationToggle={setValidationEnabled}
      backendStatus={backendStatus}
      backendMessage={backendMessage}
      onSubmit={createSubmitHandler}
    >
      <PasswordSection register={register} errors={errors} />
    </FormLayout>
  );
};
