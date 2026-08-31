import { FormField } from "./FormField";

export const CustomValidationSection = ({ register, errors }) => (
  <FormField
    register={register}
    errors={errors}
    name="amount"
    label="Amount"
    placeholder="e.g. 99.99"
  />
);
