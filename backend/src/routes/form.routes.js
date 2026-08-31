const express = require("express");
const validate = require("../middlewares/validate");
const {
  basicFieldsValidation,
  passwordValidation,
  conditionalValidation,
  customValidation,
  formValidation,
} = require("../validations");

const router = express.Router();

const successResponse = (req, res, label) =>
  res.status(200).json({
    success: true,
    message: `${label} passed backend Joi validation`,
    source: "joi",
    data: req.body,
  });

router.post("/basic", validate(basicFieldsValidation), (req, res) =>
  successResponse(req, res, "Basic fields")
);

router.post("/password", validate(passwordValidation), (req, res) =>
  successResponse(req, res, "Password fields")
);

router.post("/conditional", validate(conditionalValidation), (req, res) =>
  successResponse(req, res, "Conditional fields")
);

router.post("/custom", validate(customValidation), (req, res) =>
  successResponse(req, res, "Custom validation fields")
);

router.post("/combined", validate(formValidation), (req, res) =>
  successResponse(req, res, "Combined form")
);

module.exports = router;
