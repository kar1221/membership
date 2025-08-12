import { check } from 'express-validator';

import type { ValidationChain } from 'express-validator';

const signUpValidationRule: ValidationChain[] = [
  check('firstName')
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage('First name must be between 2 and 30 characters')
    .matches(/^[A-Za-zÀ-ÿ\s'-]+$/)
    .withMessage(
      'First name can only contain letters, spaces, hyphens, and apostrophes.'
    ),
  check('lastName')
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage('First name must be between 2 and 30 characters')
    .matches(/^[A-Za-zÀ-ÿ\s'-]+$/)
    .withMessage(
      'First name can only contain letters, spaces, hyphens, and apostrophes.'
    ),
  check('username')
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters')
    .matches(/^[a-zA-Z0-9_.-]+$/)
    .withMessage(
      'Username can only contain letters, numbers, underscores, periods, and hyphens'
    ),
  check('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password should be longer than 6 characters'),
  check('confirmPassword')
    .trim()
    .notEmpty()
    .custom((confirmPassword, { req }) => {
      if (confirmPassword === req.body.password)
        throw new Error("Password doesn't match");

      return true;
    })
    .withMessage('Password does not match.')
];

export default signUpValidationRule;
