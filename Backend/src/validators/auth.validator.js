import {body, validationResult} from 'express-validator';

const validation= (req, res, next)=> {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const err = new Error("Validation failed");
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

export const registerValidation = [
  body("fullName")
    .trim()
    .notEmpty().withMessage("Full name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be 3-50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name should only contain letters"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format")
    .normalizeEmail()
    .isLength({ max: 100 })
    .withMessage("Email too long"),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8, max: 30 })
    .withMessage("Password must be 8-30 characters")
    .matches(/[a-z]/).withMessage("Must contain lowercase letter")
    .matches(/[A-Z]/).withMessage("Must contain uppercase letter")
    .matches(/[0-9]/).withMessage("Must contain a number")
    .matches(/[@$!%*?&]/).withMessage("Must contain a special character"),

  body("contact")
    .notEmpty().withMessage("Contact is required")
    .matches(/^\+?[0-9]{10,15}$/)
    .withMessage("Invalid phone number format"),

  validation
];

export const loginValidation = [
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),

  body("password")
    .notEmpty().withMessage("Password is required"),

    validation
];

