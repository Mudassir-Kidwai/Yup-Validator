const Joi = require("joi");
const { password } = require("./custom.validation");

const passwordFields = {
  body: Joi.object().keys({
    password: Joi.string()
      .min(4)
      .max(20)
      .required()
      .custom(password)
      .messages({
        "any.required": "Password is Required!",
        "string.min": "Password does not match the requirements",
        "string.max": "Password does not match the requirements",
        "password.invalid": "Password does not match the requirements",
      }),
    confirm_password: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.required": "Confirm Password is Required!",
        "any.only": "Passwords Don't Match",
      }),
  }),
};

module.exports = passwordFields;
