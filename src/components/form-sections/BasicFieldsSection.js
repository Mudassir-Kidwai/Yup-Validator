import { FormField } from "./FormField";

export const BasicFieldsSection = ({ register, errors }) => (
  <>
    <FormField
      register={register}
      errors={errors}
      name="full_name"
      label="Full Name"
    />
    <FormField register={register} errors={errors} name="email" label="Email" />
    <FormField
      register={register}
      errors={errors}
      name="age"
      type="number"
      label="Age"
    />
  </>
);
