import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordSchema } from "../../validations";
import { useValidationToggle } from "../../hooks/useValidationToggle";
import { PasswordSection } from "../form-sections/PasswordSection";
import { FormLayout } from "./FormLayout";

export const PasswordForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const { validationEnabled, setValidationEnabled, createSubmitHandler } =
    useValidationToggle(clearErrors);

  const onSubmit = (data) => {
    console.log("Password:", data);
  };

  return (
    <FormLayout
      title="Password Validation"
      description="Regex rules for strong passwords and confirm-password matching."
      validationEnabled={validationEnabled}
      onValidationToggle={setValidationEnabled}
      onSubmit={createSubmitHandler(handleSubmit, getValues, onSubmit)}
    >
      <PasswordSection register={register} errors={errors} />
    </FormLayout>
  );
};
