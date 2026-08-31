import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { customValidationSchema } from "../../validations";
import { useValidationToggle } from "../../hooks/useValidationToggle";
import { CustomValidationSection } from "../form-sections/CustomValidationSection";
import { FormLayout } from "./FormLayout";

export const CustomValidationForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(customValidationSchema),
  });

  const { validationEnabled, setValidationEnabled, createSubmitHandler } =
    useValidationToggle(clearErrors);

  const onSubmit = (data) => {
    console.log("Custom validation:", data);
  };

  return (
    <FormLayout
      title="Custom Validation"
      description="Custom Yup test for amount with up to two decimal places."
      validationEnabled={validationEnabled}
      onValidationToggle={setValidationEnabled}
      onSubmit={createSubmitHandler(handleSubmit, getValues, onSubmit)}
    >
      <CustomValidationSection register={register} errors={errors} />
    </FormLayout>
  );
};
