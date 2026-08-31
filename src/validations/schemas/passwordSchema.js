import * as Yup from "yup";

/** Password regex and confirm-password match validations */
const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .min(4)
    .max(20)
    .required("Password is Required!")
    .matches(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
      "Password does not match the requirements"
    ),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords Don't Match")
    .required("Confirm Password is Required!"),
});

export default passwordSchema;
