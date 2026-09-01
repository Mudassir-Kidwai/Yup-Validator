import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSchema } from "../../validations";
import { useValidationToggle } from "../../hooks/useValidationToggle";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import { BasicFieldsSection } from "../form-sections/BasicFieldsSection";
import { PasswordSection } from "../form-sections/PasswordSection";
import { ConditionalSection } from "../form-sections/ConditionalSection";
import { CustomValidationSection } from "../form-sections/CustomValidationSection";
import { FormLayout } from "./FormLayout";

export const CombinedForm = () => {
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
    resolver: yupResolver(FormSchema),
  });

  const { validationEnabled, setValidationEnabled } =
    useValidationToggle(clearErrors);

  const { createSubmitHandler, backendStatus, backendMessage } = useFormSubmit({
    formType: "combined",
    validationEnabled,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
  });

  return (
    <FormLayout
      title="All Validations Combined"
      description="All demo rules validated by Yup (optional) and Joi (backend)."
      validationEnabled={validationEnabled}
      onValidationToggle={setValidationEnabled}
      backendStatus={backendStatus}
      backendMessage={backendMessage}
      onSubmit={createSubmitHandler}
    >
      <BasicFieldsSection register={register} errors={errors} />
      <hr className="my-4" />
      <PasswordSection register={register} errors={errors} />
      <hr className="my-4" />
      <ConditionalSection
        register={register}
        errors={errors}
        setValue={setValue}
        watch={watch}
        clearErrors={clearErrors}
      />
      <hr className="my-4" />
      <CustomValidationSection register={register} errors={errors} />
    </FormLayout>
  );
};
