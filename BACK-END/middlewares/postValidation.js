const { body, validationResult } = require("express-validator");

const postBodyParams = [
  body("category").notEmpty().isString().withMessage("category not found"),

  body("title")
    .notEmpty()
    .isString()
    .isLength({ min: 8 })
    .withMessage(" title is required and must be grater than 8 characters"),

  body("cover")
    .notEmpty()
    .isString()
    .isURL()
    .withMessage("Cover is not img correct"),

  body("readTime.value")
    .notEmpty()
    .isInt()
    .withMessage(" readTime value is not defined"),

  body("readTime.unit")
    .notEmpty()
    .isString()
    .withMessage(" readTime unit is not defined"),

  body("author").isString().withMessage("erros in the author!"),

  body("content")
    .notEmpty()
    .isString()
    .isLength({ min: 15 })
    .withMessage(" content is required and must be grater than 15 characters"),
];

const validatePostBody = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { postBodyParams, validatePostBody };
