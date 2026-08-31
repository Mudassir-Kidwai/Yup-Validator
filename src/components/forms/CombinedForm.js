import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSchema } from "../../validations";
import { useValidationToggle } from "../../hooks/useValidationToggle";
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
    clearErrors,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormSchema),
  });

  const { validationEnabled, setValidationEnabled, createSubmitHandler } =
    useValidationToggle(clearErrors);

  const onSubmit = (data) => {
    console.log("Combined form:", data);
  };

  return (
    <FormLayout
      title="All Validations Combined"
      description="Every Yup validation example in one form."
      validationEnabled={validationEnabled}
      onValidationToggle={setValidationEnabled}
      onSubmit={createSubmitHandler(handleSubmit, getValues, onSubmit)}
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
      />
      <hr className="my-4" />
      <CustomValidationSection register={register} errors={errors} />
    </FormLayout>
  );
};
