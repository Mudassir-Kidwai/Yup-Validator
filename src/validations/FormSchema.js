import * as Yup from "yup";

const FormSchema = Yup.object().shape({
  /* ******************************************************************** */
  /* Typical Regex Example */
  full_name: Yup.string().required("Full Name is Required!"),
  email: Yup.string().email().required("Email is Required!"),
  age: Yup.number()
    .positive()
    .integer()
    .min(18, "Too young!")
    .max(60, "Old!")
    .required("Age is Required!")
    .typeError("Age must not be empty"),

  /* ******************************************************************** */
  /* Typical Regex Example */
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

  /* ******************************************************************** */
  /* Conditional Validation */
  car_id: Yup.string().required("Car is required"),
  first_field: Yup.string().when("car_id", {
    is: "1",
    then: (schema) =>
      schema.required("Kindly add the first field as it is required"),
    otherwise: (schema) => schema.optional(),
  }),
  second_field: Yup.string().when("car_id", {
    is: "2",
    then: (schema) =>
      schema.required("Kindly add the second field as it is required"),
    otherwise: (schema) => schema,
  }),
  third_field: Yup.string().when("car_id", {
    is: "2",
    then: (schema) =>
      schema.required("Kindly add the third field as it is required"),
    otherwise: (schema) => schema.optional(),
  }),
  fourth_field: Yup.string().when("car_id", {
    is: "3",
    then: (schema) =>
      schema.required("Kindly add the fourth field as it is required"),
    otherwise: (schema) => schema.optional(),
  }),

  /* ******************************************************************** */
  /* Custom Validation */
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

export default FormSchema;

/**
 * 

  full_name: Yup.string().nullable(true),
  a === "avalue" && b === "bvalue";
  var schema = {
    a: Joi.string(),
    b: Joi.string(),
    c: Joi.string().when("a", {
      is: "avalue",
      then: Joi.when("b", {
        is: "bvalue",
        then: Joi.string().required(),
      }),
    }),
  };

  export const saveDeviceCommandsSchema = {
    devices: [
      Joi.array().items(Joi.string().required()).required(),
      Joi.string().valid('all').required().lowercase()
    ],
    info: Joi.array()
  };

  // typical password regex
  var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  PHONE_REGEX_ALT: /^(?:(?:(?:|\+)([1-4]\d|[1-9]\d+)?)[-]?)?((?:\d{1,}?)+)(?:[-]?(\d+))?$/,

    home_phone: Yup.lazy((value) =>
      value === '' || value === null
        ? Yup.string().nullable(true)
        : Yup.string()
            .test(
              'validNumber',
              intl.formatMessage({id: 'GLOBAL.CREATE.FORM.CONTACTPHONE.FORMAT'}),
              (home_phone) => (home_phone + '').match(PHONE_REGEX_ALT)
            )
            .min('7', intl.formatMessage({id: 'GLOBAL.CREATE.FORM.CONTACTPHONE.MIN.LENGTH'}))
    ),

    password: Yup.string()
    .required(GLOBALCONTANTS.PASSWORD_REQUIRED)
    .min(8, GLOBALCONTANTS.PASSWORD_MIN_CHARACTERS)
    .matches(
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
      GLOBALCONTANTS.PASSWORD_MATCH_MESSAGE
    ),
  confirmPassword: Yup.string()
    .required(GLOBALCONTANTS.PASSWORD_CONFIRM)
    .when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], GLOBALCONTANTS.PASSWORD_NOT_CONFIRMED),
    }),


  const schema = Joi.object({
    type: Joi.number().required().valid(1, 2, 3),
    firstname: Joi.alternatives().conditional('type', { is: 1, then: Joi.string().required() }),
    lastname: Joi.alternatives().conditional('type', { is: 1, then: Joi.string().required() }),
    salary: Joi.alternatives().conditional('type', { is: 2, then: Joi.number().required() }),
    pension: Joi.alternatives().conditional('type', { is: 2, then: Joi.number().required() }),
    credit: Joi.alternatives().conditional('type', { is: 3, then: Joi.number().required() }),
    debit: Joi.alternatives().conditional('type', { is: 3, then: Joi.number().required() }),
  }));
 */
