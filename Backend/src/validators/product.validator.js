import {body, validationResult} from 'express-validator';

const validation= (req, res, next)=> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const err = new Error("Product validation failed");
        err.statusCode = 422;
        err.errors = errors.array().map(e => {
            return {
                field: e.path,
                message: e.msg
            }
        })
        throw err;
    }
    next();
}

export const createProductValidation = [
  body("title")
    .trim()
    .notEmpty().withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be 3-100 characters"),

  body("description")
    .trim()
    .notEmpty().withMessage("Description is required")
    .isLength({ min: 10, max: 1000 })
    .withMessage("Description must be 10-1000 characters"),

  body("price")
    .notEmpty().withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a number greater than 0"),

  body("images")
    .custom((value, { req }) => {
      if (!req.files || req.files.length === 0) {
        throw new Error("At least one image is required");
      }
      return true;
    }),

  validation
];


