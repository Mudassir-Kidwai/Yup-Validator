const Joi = require("joi");
const pick = require("../utils/pick");

const formatValidationErrors = (error) => {
  const errors = {};

  error.details.forEach((detail) => {
    const path = [...detail.path];
    if (["body", "query", "params"].includes(path[0])) {
      path.shift();
    }

    const field = path.join(".");
    if (field && !errors[field]) {
      errors[field] = detail.message;
    }
  });

  return errors;
};

/**
 * Express middleware — validates req sections using Joi schemas.
 * Pattern from F3 Real Estate backend validate.js reference.
 */
const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));

  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Backend Joi validation failed",
      source: "joi",
      errors: formatValidationErrors(error),
    });
  }

  Object.assign(req, value);
  return next();
};

module.exports = validate;
