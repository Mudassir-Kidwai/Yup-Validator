const Joi = require("joi");

const basicFields = {
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
        "string.empty": "Email is Required!",
      }),
    age: Joi.number()
      .integer()
      .positive()
      .min(18)
      .max(60)
      .required()
      .messages({
        "any.required": "Age is Required!",
        "number.base": "Age must not be empty",
        "number.min": "Too young!",
        "number.max": "Old!",
        "number.positive": "Age must not be empty",
      }),
  }),
};

module.exports = basicFields;
