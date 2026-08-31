const Joi = require("joi");

/**
 * Joi conditional validation — each car_id requires one mapped field.
 * Mirrors frontend Yup .when("car_id", ...) rules.
 */
const conditionalFields = {
  body: Joi.object().keys({
    car_id: Joi.string()
      .valid("1", "2", "3", "4")
      .required()
      .messages({
        "any.required": "Please select a car to continue",
        "any.only": "Please select a car to continue",
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
  }),
};

module.exports = conditionalFields;
