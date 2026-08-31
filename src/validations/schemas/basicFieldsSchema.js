import * as Yup from "yup";

/** String, email, and number field validations */
const basicFieldsSchema = Yup.object().shape({
  full_name: Yup.string().required("Full Name is Required!"),
  email: Yup.string().email().required("Email is Required!"),
  age: Yup.number()
    .positive()
    .integer()
    .min(18, "Too young!")
    .max(60, "Old!")
    .required("Age is Required!")
    .typeError("Age must not be empty"),
});

export default basicFieldsSchema;
