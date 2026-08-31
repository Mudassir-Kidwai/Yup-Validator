const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;

const AMOUNT_DECIMAL_REGEX = /^\d+(\.\d{1,2})?$/;

/**
 * Custom Joi validators (mirrors F3 backend custom.validation.js patterns).
 */
const password = (value, helpers) => {
  if (typeof value !== "string" || !PASSWORD_REGEX.test(value)) {
    return helpers.error("password.invalid");
  }

  return value;
};

const maxTwoDecimalPlaces = (value, helpers) => {
  if (value === null || value === undefined || value === "") {
    return value;
  }

  if (!AMOUNT_DECIMAL_REGEX.test(String(value))) {
    return helpers.error("amount.decimal");
  }

  return value;
};

module.exports = {
  password,
  maxTwoDecimalPlaces,
  PASSWORD_REGEX,
};
