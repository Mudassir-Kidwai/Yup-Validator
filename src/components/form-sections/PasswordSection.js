import { FormField } from "./FormField";

export const PasswordSection = ({ register, errors }) => (
  <>
    <FormField
      register={register}
      errors={errors}
      name="password"
      type="password"
      label="Password"
    />
    <FormField
      register={register}
      errors={errors}
      name="confirm_password"
      type="password"
      label="Confirm Password"
    />
  </>
);
