const Joi = require("joi");
const { maxTwoDecimalPlaces } = require("./custom.validation");

const customValidationFields = {
  body: Joi.object().keys({
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

module.exports = customValidationFields;
