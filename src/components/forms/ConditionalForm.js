import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { conditionalSchema } from "../../validations";
import { useValidationToggle } from "../../hooks/useValidationToggle";
import { ConditionalSection } from "../form-sections/ConditionalSection";
import { FormLayout } from "./FormLayout";

export const ConditionalForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    clearErrors,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(conditionalSchema),
  });

  const { validationEnabled, setValidationEnabled, createSubmitHandler } =
    useValidationToggle(clearErrors);

  const onSubmit = (data) => {
    console.log("Conditional:", data);
  };

  return (
    <FormLayout
      title="Conditional Validation"
      description="Pick a car ID to see which field Yup marks as required using .when('car_id')."
      validationEnabled={validationEnabled}
      onValidationToggle={setValidationEnabled}
      onSubmit={createSubmitHandler(handleSubmit, getValues, onSubmit)}
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
