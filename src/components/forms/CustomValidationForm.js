import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { customValidationSchema } from "../../validations";
import { useValidationToggle } from "../../hooks/useValidationToggle";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import { CustomValidationSection } from "../form-sections/CustomValidationSection";
import { FormLayout } from "./FormLayout";

export const CustomValidationForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(customValidationSchema),
  });

  const { validationEnabled, setValidationEnabled } =
    useValidationToggle(clearErrors);

  const { createSubmitHandler, backendStatus, backendMessage } = useFormSubmit({
    formType: "custom",
    validationEnabled,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
  });

  return (
    <FormLayout
      title="Custom Validation"
      description="Custom amount rules validated by Yup and Joi."
      validationEnabled={validationEnabled}
      onValidationToggle={setValidationEnabled}
      backendStatus={backendStatus}
      backendMessage={backendMessage}
      onSubmit={createSubmitHandler}
    >
      <CustomValidationSection register={register} errors={errors} />
    </FormLayout>
  );
};
