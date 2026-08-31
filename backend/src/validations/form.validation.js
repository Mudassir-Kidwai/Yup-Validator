const Joi = require("joi");
const { password, maxTwoDecimalPlaces } = require("./custom.validation");

const combinedForm = {
  body: Joi.object().keys({
    full_name: Joi.string().required().messages({
      "any.required": "Full Name is Required!",
      "string.empty": "Full Name is Required!",
    }),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "any.required": "Email is Required!",
        "string.email": "Email is Required!",
      }),
    age: Joi.number().integer().positive().min(18).max(60).required().messages({
      "any.required": "Age is Required!",
      "number.base": "Age must not be empty",
      "number.min": "Too young!",
      "number.max": "Old!",
    }),
    password: Joi.string()
      .min(4)
      .max(20)
      .required()
      .custom(password)
      .messages({
        "any.required": "Password is Required!",
        "password.invalid": "Password does not match the requirements",
      }),
    confirm_password: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.required": "Confirm Password is Required!",
        "any.only": "Passwords Don't Match",
      }),
    car_id: Joi.string()
      .valid("1", "2", "3", "4")
      .required()
      .messages({
        "any.required": "Please select a car to continue",
      }),
    first_field: Joi.when("car_id", {
      is: "1",
      then: Joi.string().required().messages({
        "any.required":
          "First field is required when Volvo (ID: 1) is selected",
      }),
      otherwise: Joi.string().allow("", null),
    }),
    second_field: Joi.when("car_id", {
      is: "2",
      then: Joi.string().required().messages({
        "any.required":
          "Second field is required when Audi (ID: 2) is selected",
      }),
      otherwise: Joi.string().allow("", null),
    }),
    third_field: Joi.when("car_id", {
      is: "3",
      then: Joi.string().required().messages({
        "any.required":
          "Third field is required when Toyota (ID: 3) is selected",
      }),
      otherwise: Joi.string().allow("", null),
    }),
    fourth_field: Joi.when("car_id", {
      is: "4",
      then: Joi.string().required().messages({
        "any.required":
          "Fourth field is required when Ferrari (ID: 4) is selected",
      }),
      otherwise: Joi.string().allow("", null),
    }),
    amount: Joi.number()
      .min(0)
      .required()
      .custom(maxTwoDecimalPlaces)
      .messages({
        "any.required": "Amount field is required",
        "number.base": "Only numbers are allowed",
        "number.min": "Amount field must be greater than zero.",
        "amount.decimal": "Maximum two digits after decimal",
      }),
  }),
};

module.exports = combinedForm;
