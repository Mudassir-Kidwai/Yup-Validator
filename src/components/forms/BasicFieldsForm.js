import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { basicFieldsSchema } from "../../validations";
import { useValidationToggle } from "../../hooks/useValidationToggle";
import { BasicFieldsSection } from "../form-sections/BasicFieldsSection";
import { FormLayout } from "./FormLayout";

export const BasicFieldsForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(basicFieldsSchema),
  });

  const { validationEnabled, setValidationEnabled, createSubmitHandler } =
    useValidationToggle(clearErrors);

  const onSubmit = (data) => {
    console.log("Basic fields:", data);
  };

  return (
    <FormLayout
      title="Basic Fields"
      description="String, email, and number validation with Yup."
      validationEnabled={validationEnabled}
      onValidationToggle={setValidationEnabled}
      onSubmit={createSubmitHandler(handleSubmit, getValues, onSubmit)}
    >
      <BasicFieldsSection register={register} errors={errors} />
    </FormLayout>
  );
};
