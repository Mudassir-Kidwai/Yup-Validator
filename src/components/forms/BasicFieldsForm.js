import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { basicFieldsSchema } from "../../validations";
import { useValidationToggle } from "../../hooks/useValidationToggle";
import { useFormSubmit } from "../../hooks/useFormSubmit";
import { BasicFieldsSection } from "../form-sections/BasicFieldsSection";
import { FormLayout } from "./FormLayout";

export const BasicFieldsForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(basicFieldsSchema),
  });

  const { validationEnabled, setValidationEnabled } =
    useValidationToggle(clearErrors);

  const { createSubmitHandler, backendStatus, backendMessage } = useFormSubmit({
    formType: "basic",
    validationEnabled,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
  });

  return (
    <FormLayout
      title="Basic Fields"
      description="Yup validates on the client. Joi validates again on backend submit."
      validationEnabled={validationEnabled}
      onValidationToggle={setValidationEnabled}
      backendStatus={backendStatus}
      backendMessage={backendMessage}
      onSubmit={createSubmitHandler}
    >
      <BasicFieldsSection register={register} errors={errors} />
    </FormLayout>
  );
};
