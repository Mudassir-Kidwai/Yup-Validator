import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { conditionalSchema } from "../../validations";
import { useValidationToggle } from "../../hooks/useValidationToggle";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import { ConditionalSection } from "../form-sections/ConditionalSection";
import { FormLayout } from "./FormLayout";

export const ConditionalForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(conditionalSchema),
  });

  const { validationEnabled, setValidationEnabled } =
    useValidationToggle(clearErrors);

  const { createSubmitHandler, backendStatus, backendMessage } = useFormSubmit({
    formType: "conditional",
    validationEnabled,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
  });

  return (
    <FormLayout
      title="Conditional Validation"
      description="Car ID conditional rules run in Yup and Joi on submit."
      validationEnabled={validationEnabled}
      onValidationToggle={setValidationEnabled}
      backendStatus={backendStatus}
      backendMessage={backendMessage}
      onSubmit={createSubmitHandler}
    >
      <ConditionalSection
        register={register}
        errors={errors}
        setValue={setValue}
        watch={watch}
      />
    </FormLayout>
  );
};
