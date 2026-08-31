import * as Yup from "yup";

/** Custom .test() validation example for decimal amounts */
const customValidationSchema = Yup.object().shape({
  amount: Yup.number()
    .required("Amount field is required")
    .typeError("Only numbers are allowed")
    .min(0, "Amount field must be greater than zero.")
    .test(
      "maxDigitsAfterDecimal",
      "Maximum two digits after decimal",
      (amount) => /^\d+(\.\d{1,2})?$/.test(amount)
    ),
});

export default customValidationSchema;
